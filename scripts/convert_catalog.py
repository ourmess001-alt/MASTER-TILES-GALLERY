#!/usr/bin/env python3
import json
import os
import re

input_path = r'J:\Brothers_Tiles_data_set\Master tiles dataset\rak_catalog_export\products_master.json'
output_rak_path = r'src\data\rakTiles.ts'

with open(input_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

print(f"Loaded {len(products)} products from master JSON.")

size_map = {
    '12x36 inch': '12×36"',
    '12x24 inch': '12×24"',
    '12x20 inch': '12×20"',
    '10x28 inch': '10×28"',
    '10x16 inch': '10×16"',
    '8x12 inch': '8×12"',
}

tile_items = []
seen_series = set()

for i, p in enumerate(products):
    item_num = p.get('itemNumber', i + 1)
    specs = p.get('specs', {})
    model_code = specs.get('modelCode', f"RAK-{item_num:03d}").strip()
    series = specs.get('series', 'RAK Collection').strip()
    role = specs.get('tileRole', 'Wall Tile').strip()
    size_inch = specs.get('sizeInch', '12x24 inch').strip()
    size_cm = specs.get('sizeCm', '30 cm x 60 cm').strip()
    apps = p.get('recommendedApplications', ['Wall'])
    
    formatted_size = size_map.get(size_inch, '12×24"')
    sqft_box = specs.get('sqFtPerBox', 15.5)
    tiles_box = specs.get('tilesPerBox', 8)
    
    # Category Assignment
    role_lower = role.lower()
    series_lower = series.lower()
    title_lower = p.get('title', '').lower()
    
    if 'stone art' in series_lower or 'marble' in title_lower or 'onyx' in title_lower:
        category = 'marble'
        category_label = 'Marble Porcelain'
        pattern_type = 'calacatta'
        base_color = '#FAF8F5'
        accent_color = '#8C7B65'
        vein_colors = ['#C5A059', '#8C7B65', '#D8D0C5']
    elif 'wood' in title_lower or 'timber' in title_lower:
        category = 'wood'
        category_label = 'Wood Grain'
        pattern_type = 'wood'
        base_color = '#E6DACB'
        accent_color = '#8A5A36'
        vein_colors = ['#6E4424', '#B38B6D']
    elif 'highlighter' in role_lower or 'decor' in role_lower or 'border' in role_lower or 'listello' in role_lower:
        category = 'decorative'
        category_label = 'Decorative Tiles'
        pattern_type = 'geometric'
        base_color = '#F9F8F4'
        accent_color = '#C5994E'
        vein_colors = ['#C5994E', '#9E783B']
    elif 'bathroom' in [a.lower() for a in apps] and ('30x50' in series or '25x40' in series or 'aston' in series_lower or 'victoria' in series_lower):
        category = 'bathroom'
        category_label = 'Bathroom Tiles'
        pattern_type = 'crema'
        base_color = '#F6F5F1'
        accent_color = '#9E783B'
        vein_colors = ['#D8CFBE', '#9E783B']
    else:
        category = 'wall'
        category_label = 'Wall Tiles'
        pattern_type = 'crema'
        base_color = '#F7F6F2'
        accent_color = '#8C7A64'
        vein_colors = ['#DDD6CA', '#8C7A64']
        
    price_retail = p.get('pricePerSqFt', 90)
    price_wholesale = max(int(round(price_retail * 0.82)), price_retail - 15)
    
    is_best_seller = (i < 12) or (series not in seen_series and i < 50)
    seen_series.add(series)
    is_new = 'premija' in series_lower or 'vivid' in series_lower or 'aston' in series_lower
    
    item = {
        "id": p.get('id', f"rak-{item_num:03d}"),
        "index": f"RAK-{item_num:03d}",
        "name": p.get('title', f"RAK {model_code}").strip(),
        "bengaliName": p.get('subtitleBn', f"আরএকে {model_code}").strip(),
        "code": model_code,
        "category": category,
        "categoryLabel": category_label,
        "priceRetail": price_retail,
        "priceWholesale": price_wholesale,
        "unit": "sq.ft",
        "availableSizes": [formatted_size],
        "defaultSize": formatted_size,
        "sqftPerBoxBySize": {
            formatted_size: sqft_box
        },
        "piecesPerBoxBySize": {
            formatted_size: tiles_box
        },
        "surfacePattern": {
            "baseColor": base_color,
            "accentColor": accent_color,
            "veinColors": vein_colors,
            "patternType": pattern_type
        },
        "image": p.get('image', ''),
        "description": f"Authentic RAK Ceramics {model_code} from {series} ({formatted_size}). High-grade ceramic wall tile engineered for exceptional durability, moisture resistance, and elegance. Available at Master Tiles Gallery, Gazipur.",
        "bengaliDesc": f"আর-এ-কে সিরামিকস অরিজিনাল {series} সিরিজের {model_code} ({size_cm}) টাইল্স। মাস্টার টাইল্স গ্যালারী, তিন ভাই টাইলস মার্কেট, মোল্লাপাড়া, ভবানীপুর, গাজীপুর শোরুমে সুলভ পাইকারী ও খুচরা মূল্যে পাওয়া যাচ্ছে।",
        "specs": {
            "thicknessMm": 8.5,
            "waterAbsorption": "< 0.5% (High Grade Ceramic)",
            "slipRating": "R9" if "decor" in role_lower or "highlighter" in role_lower else "R10",
            "mohsHardness": 7,
            "originStandard": "RAK Ceramics Official ISO 13006 / BDS",
            "recommendedGrout": "1.5mm - 2mm Joint",
            "applications": apps if apps else ["Wall", "Bathroom"],
            "piecesPerBox": tiles_box,
            "sqftPerBox": sqft_box,
            "weightPerBoxKg": 28.0
        },
        "isBestSeller": is_best_seller,
        "isNew": is_new
    }
    tile_items.append(item)

ts_content = "import { TileItem } from '../types';\n\n"
ts_content += f"// Auto-generated {len(tile_items)} Authentic RAK Ceramics Catalog Products for Master Tiles Gallery\n"
ts_content += "export const RAK_TILES_DATA: TileItem[] = "
ts_content += json.dumps(tile_items, indent=2, ensure_ascii=False)
ts_content += ";\n"

with open(output_rak_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Successfully wrote {len(tile_items)} TileItems to {output_rak_path}.")
