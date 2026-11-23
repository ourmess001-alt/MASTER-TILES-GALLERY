#!/usr/bin/env python3
import os
from PIL import Image, ImageEnhance, ImageOps

target_w, target_h = 1200, 825  # 16:11 aspect ratio

categories = {
    'wall-tiles.jpg': 'public/images/rak-catalog/01-ceramic-wall-tiles/premija-collection/001-7002-lwd/image.jpg',
    'decorative-tiles.jpg': 'public/images/rak-catalog/01-ceramic-wall-tiles/premija-collection/002-7002-hl-wd/image.jpg',
    'bathroom-tiles.jpg': 'public/images/rak-catalog/01-ceramic-wall-tiles/premium-collection-aston-series/073-aston-water-lily/image.jpg',
    'floor-tiles.jpg': 'public/images/rak-catalog/01-ceramic-wall-tiles/premium-collection-stone-art/172-amber-stone-1/image.jpg',
    'outdoor-tiles.jpg': 'public/images/rak-catalog/01-ceramic-wall-tiles/premium-collection-stone-art/174-amber-stone-3/image.jpg',
}

out_dir = 'public/images/categories'
os.makedirs(out_dir, exist_ok=True)

for out_name, src_path in categories.items():
    if not os.path.exists(src_path):
        print(f"Error: {src_path} not found!")
        continue
    
    im = Image.open(src_path).convert('RGB')
    orig_w, orig_h = im.size
    
    # Target aspect ratio is target_w / target_h = 1200 / 825 ~ 1.4545
    target_aspect = target_w / target_h
    orig_aspect = orig_w / orig_h
    
    if orig_aspect > target_aspect:
        # Source is wider than target: crop left & right
        new_w = int(orig_h * target_aspect)
        left = (orig_w - new_w) // 2
        im_cropped = im.crop((left, 0, left + new_w, orig_h))
    else:
        # Source is taller than target: crop top & bottom
        new_h = int(orig_w / target_aspect)
        top = (orig_h - new_h) // 2
        im_cropped = im.crop((0, top, orig_w, top + new_h))
        
    im_resized = im_cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Slight contrast and sharpness enhancement for rich ceramic look
    enhancer = ImageEnhance.Sharpness(im_resized)
    im_final = enhancer.enhance(1.15)
    
    out_path = os.path.join(out_dir, out_name)
    im_final.save(out_path, quality=92, optimize=True)
    print(f"Saved {out_path} from {src_path} ({target_w}x{target_h})")

print("All 5 category images generated successfully!")
