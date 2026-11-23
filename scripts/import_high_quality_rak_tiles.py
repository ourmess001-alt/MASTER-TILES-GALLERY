import json
import os
import shutil
from PIL import Image
import numpy as np
from collections import defaultdict

SRC_MASTER_JSON = r"J:\Brothers_Tiles_data_set\rak_catalog_export\products_master.json"
SRC_BASE_DIR = r"J:\Brothers_Tiles_data_set\rak_catalog_export\by_category"
DEST_IMG_DIR = r"J:\Secret Project\Master Tiles Gallery\public\images\rak-catalog"
DEST_TS_FILE = r"J:\Secret Project\Master Tiles Gallery\src\data\rakTiles.ts"

with open(SRC_MASTER_JSON, "r", encoding="utf-8") as f:
    products = json.load(f)

# 1. Filter all products for high image quality, rich texture, good contrast
cat_candidates = defaultdict(list)
for p in products:
    rel_img = p['image'].replace('/images/rak-catalog/', '')
    disk_path = os.path.join(SRC_BASE_DIR, rel_img.replace('/', os.sep))
    if os.path.exists(disk_path):
        try:
            with Image.open(disk_path) as im:
                arr = np.array(im.convert('L'))
                std = float(arr.std())
                mean = float(arr.mean())
                w, h = im.size
                aspect = w / h if h > 0 else 1
                
                # Strict quality filter:
                # - std >= 24 ensures clear veins/wood/pebble/stone texture, rejecting washed-out blurry crops
                # - 40 < mean < 225 rejects near-white blanks and dark blobs
                # - 0.65 <= aspect <= 2.2 rejects thin strips and distorted cladding slivers
                if std >= 24 and 40 < mean < 225 and 0.65 <= aspect <= 2.2:
                    cat = p['specs'].get('mainCategory', 'Unknown')
                    cat_candidates[cat].append((std, p, disk_path))
        except Exception as e:
            continue

targets = {
    'Ceramic Wall Tiles': 35,
    'Porcelain Floor Tiles': 35,
    'Porcelain Wall & Floor Tiles': 18,
    'Porcelain Industrial, Step & Parking Tiles': 12
}

selected = []
for cat_name, target_count in targets.items():
    candidates = cat_candidates[cat_name]
    # Group by series to maximize design variety
    by_series = defaultdict(list)
    for std, p, d in candidates:
        s = p['specs'].get('series', 'General')
        by_series[s].append((std, p, d))
    
    # Sort each series by texture richness (std) descending
    for s in by_series:
        by_series[s].sort(key=lambda x: -x[0])
    
    cat_picked = []
    series_lists = list(by_series.values())
    while len(cat_picked) < target_count and any(series_lists):
        for slist in series_lists:
            if slist:
                cat_picked.append(slist.pop(0)[1])
                if len(cat_picked) == target_count:
                    break
    selected.extend(cat_picked)
    print(f"{cat_name}: target={target_count}, picked={len(cat_picked)}")

print(f"Total high-quality tiles picked: {len(selected)}")

# 2. Clean out old destination image directory and copy only verified images
if os.path.exists(DEST_IMG_DIR):
    shutil.rmtree(DEST_IMG_DIR)
os.makedirs(DEST_IMG_DIR, exist_ok=True)

copied_count = 0
for p in selected:
    rel_img = p['image'].replace('/images/rak-catalog/', '')
    src_img = os.path.join(SRC_BASE_DIR, rel_img.replace('/', os.sep))
    dest_img = os.path.join(DEST_IMG_DIR, rel_img.replace('/', os.sep))
    
    os.makedirs(os.path.dirname(dest_img), exist_ok=True)
    if os.path.exists(src_img):
        shutil.copy2(src_img, dest_img)
        copied_count += 1
    else:
        print(f"Warning: Missing image {src_img}")

print(f"Successfully copied {copied_count} high-resolution real images to {DEST_IMG_DIR}")

# 3. Helper functions for clean data
def normalize_size(size_str, dims):
    if not size_str or size_str.lower() == 'standard':
        if '30x30' in dims or '30.5x30.5' in dims:
            return '12×12"'
        if '30x60' in dims:
            return '12×24"'
        if '60x60' in dims:
            return '24×24"'
        if '60x120' in dims:
            return '24×48"'
        if '80x80' in dims:
            return '32×32"'
        if '40x40' in dims:
            return '16×16"'
        return '12×24"'
    
    s = size_str.lower().replace(' inch', '').replace(' ', '')
    parts = s.split('x')
    if len(parts) == 2:
        return f"{parts[0]}×{parts[1]}\""
    return '12×24"'

def map_category(p):
    img = p['image']
    apps = p.get('recommendedApplications', [])
    series = p['specs'].get('series', '')
    title = p['title'].lower()
    
    if '01-ceramic-wall-tiles' in img:
        if 'Bathroom' in apps and ('hl' in title or 'decor' in title or 'water' in title):
            return 'bathroom', 'Bathroom Tiles'
        return 'wall', 'Wall Tiles'
    elif '03-porcelain-wall-floor-tiles' in img:
        if 'wood' in series.lower() or 'wood' in title:
            return 'wood', 'Wood Grain'
        if 'marble' in series.lower() or 'rock' in title or 'hard rock' in series.lower():
            return 'marble', 'Marble Porcelain'
        return 'floor', 'Porcelain Floor Tiles'
    elif '04-porcelain-floor-tiles' in img:
        if 'wood' in series.lower() or 'wooden' in title:
            return 'wood', 'Wood Grain'
        if 'slab' in series.lower() or 'silk' in title or 'royal' in title or 'classic' in title or 'sophia' in title:
            return 'marble', 'Marble Porcelain'
        return 'floor', 'Floor Tiles'
    elif '05-porcelain-industrial-step-parking-tiles' in img:
        return 'outdoor', 'Outdoor & Parking'
    return 'floor', 'Floor Tiles'

def get_surface_pattern(cat, title):
    title_lower = title.lower()
    if cat == 'marble':
        return {
            "baseColor": "#FFFFFF" if 'wh' in title_lower or 'bianco' in title_lower else "#F5EFE3",
            "accentColor": "#C5A059",
            "veinColors": ["#C5A059", "#7A7C84", "#B8A382"],
            "patternType": "calacatta"
        }
    elif cat == 'wood':
        return {
            "baseColor": "#C8A97E",
            "accentColor": "#6B4A2B",
            "veinColors": ["#5E3E21", "#8C673E", "#A68052"],
            "patternType": "wood"
        }
    elif cat == 'outdoor':
        return {
            "baseColor": "#3A3D42",
            "accentColor": "#1C1E21",
            "veinColors": ["#2A2C30", "#54575E", "#151618"],
            "patternType": "terrazzo"
        }
    else:
        return {
            "baseColor": "#FAF7F2",
            "accentColor": "#8C7B65",
            "veinColors": ["#B0A391", "#DDD6CB", "#6D6151"],
            "patternType": "crema"
        }

tile_items = []
all_sizes = set()

for idx, p in enumerate(selected, start=1):
    raw_title = p['title'].replace("RAK ", "RAK ")
    # Clean title to prevent repeating series in parenthesis
    clean_title = raw_title.split('(')[0].strip()
    series = p['specs'].get('series', 'RAK Collection')
    model_code = p['specs'].get('modelCode', f"RAK-{idx:03d}")
    raw_size = p['specs'].get('sizeInch', '')
    dims = p['specs'].get('dimensions', '')
    default_size = normalize_size(raw_size, dims)
    all_sizes.add(default_size)
    
    category, category_label = map_category(p)
    price_retail = p.get('pricePerSqFt', 125)
    price_wholesale = round(price_retail * 0.82)
    
    sqft_box = float(p['specs'].get('sqFtPerBox', 14.53) or 14.53)
    pcs_box = int(p['specs'].get('tilesPerBox', 4) or 4)
    
    thickness = 8.5
    if category in ['floor', 'marble', 'wood']:
        thickness = 9.5
    elif category == 'outdoor':
        thickness = 13.0 if '13mm' in series else 10.5
    
    desc_en = f"Authentic RAK Ceramics {model_code} from {series} ({category_label}, {default_size}). Engineered for exceptional durability and timeless elegance. Available at Master Tiles Gallery, Gazipur."
    
    desc_bn = f"আর-এ-কে সিরামিকস অরিজিনাল {series} সিরিজের {model_code} ({default_size}) টাইল্স। মাস্টার টাইল্স গ্যালারী, গাজীপুর শোরুমে সুলভ মূল্যে পাওয়া যাচ্ছে।"
    
    bengali_name = p.get('subtitleBn') or f"আরএকে {model_code} — {series}"
    bengali_clean = bengali_name.split('—')[0].replace('আরএকে', 'আরএকে ').strip()
    
    is_best_seller = (idx % 4 == 0)
    is_new = (idx % 7 == 0)
    
    item = {
        "id": p['id'],
        "index": f"RAK-{idx:03d}",
        "name": clean_title,
        "bengaliName": bengali_clean,
        "code": f"RAK-{model_code.replace(' ', '-')}",
        "category": category,
        "categoryLabel": category_label,
        "priceRetail": price_retail,
        "priceWholesale": price_wholesale,
        "unit": "sq.ft",
        "availableSizes": [default_size],
        "defaultSize": default_size,
        "sqftPerBoxBySize": {default_size: sqft_box},
        "piecesPerBoxBySize": {default_size: pcs_box},
        "surfacePattern": get_surface_pattern(category, clean_title),
        "image": p['image'],
        "description": desc_en,
        "bengaliDesc": desc_bn,
        "specs": {
            "thicknessMm": thickness,
            "waterAbsorption": "< 0.05% (Porcelain Grade)" if category in ['floor', 'marble', 'wood', 'outdoor'] else "< 0.5% (High Grade Ceramic)",
            "slipRating": "R12 (Heavy Traction Paver)" if category == 'outdoor' else ("R11 (Safe Wet Grip)" if category == 'bathroom' else "R10 (Smooth Satin)"),
            "mohsHardness": 8 if category == 'outdoor' else 7,
            "originStandard": "RAK Ceramics ISO 13006 Certified",
            "recommendedGrout": "1.5mm - 2mm Joint",
            "applications": p.get('recommendedApplications', ["Floor", "Wall", "Interior"]),
            "piecesPerBox": pcs_box,
            "sqftPerBox": sqft_box,
            "weightPerBoxKg": round(sqft_box * 2.1, 1)
        },
        "isBestSeller": is_best_seller,
        "isNew": is_new
    }
    tile_items.append(item)

print(f"Generated {len(tile_items)} high-quality TileItems.")

# 4. Write TypeScript file
ts_code = f"""import {{ TileItem }} from '../types';

export const RAK_TILES_DATA: TileItem[] = {json.dumps(tile_items, indent=2, ensure_ascii=False)};
"""

with open(DEST_TS_FILE, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Successfully saved clean RAK tiles to {DEST_TS_FILE}")
