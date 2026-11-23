import json

with open(r'J:\Brothers_Tiles_data_set\Master tiles dataset\rak_catalog_export\products_master.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

by_cat = {}
for p in products:
    role = p['specs'].get('tileRole', '')
    series = p['specs'].get('series', '')
    title = p['title']
    img = p['image']
    
    key = 'other'
    if 'stone art' in series.lower():
        key = 'marble'
    elif 'highlighter' in role.lower() or 'decor' in role.lower():
        key = 'decorative'
    elif 'bathroom' in [a.lower() for a in p.get('recommendedApplications', [])] and ('aston' in series.lower() or 'vivid' in series.lower() or '25x40' in series):
        key = 'bathroom'
    elif 'premija' in series.lower() or 'paris' in series.lower() or 'berlin' in series.lower():
        key = 'wall'
    elif 'victoria' in series.lower() or 'dallas' in series.lower():
        key = 'floor'
    else:
        key = 'wall'
        
    by_cat.setdefault(key, []).append((title, series, role, img))

for k, v in by_cat.items():
    print(f"=== Category: {k} (Total: {len(v)}) ===")
    for title, series, role, img in v[:5]:
        print(f"  - {title} | {series} | {role} -> {img}")
