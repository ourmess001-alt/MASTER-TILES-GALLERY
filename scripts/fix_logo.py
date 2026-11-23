import cv2
import numpy as np

src_path = r'C:/Users/tsour/.gemini/antigravity/brain/434134fa-333b-4e4c-bd70-29c43d7ea3bb/.user_uploaded/media_1795408044786_41be6c88.jpg'
img = cv2.imread(src_path)
h, w = img.shape[:2]

# Let's inspect the background around the edges
# The background is a very light warm cream/off-white color
bg_sample = img[0:15, 960:1024]
bg_color = np.median(bg_sample.reshape(-1, 3), axis=0)
print(f"Background BGR color near right edge: {bg_color}")

# The logo content has:
# Left edge at x ~ 38 (tile icon)
# Right edge at x ~ 956 ('s' in Tiles and the line under Gallery)
# Top edge at y ~ 43 (top of M in Master)
# Bottom edge at y ~ 310 (bottom of loop in Gallery)

# Let's crop with ample margin:
# x: 20 to 985 (leaves 29px padding to the right of 's' at 956)
# y: 25 to 325 (leaves 18px top, 15px bottom)
crop = img[25:325, 20:985]
ch, cw = crop.shape[:2]
print(f"Crop shape: {cw}x{ch}")

# To make it truly transparent and pristine on ANY background:
# We need an alpha channel that preserves:
# 1. The 3D marble tile emblem on the left (which has white marble + silver border + dark shadows)
# 2. The chrome/gradient text "Master Tiles Gallery" (gray to dark chrome)
# 3. Clean transparent background everywhere else

# Let's convert crop to float
crop_float = crop.astype(np.float32)
# Difference from background color
diff_from_bg = np.linalg.norm(crop_float - bg_color, axis=2)

print(f"Diff from background in background areas: min={diff_from_bg[:10,:10].min()}, max={diff_from_bg[:10,:10].max()}")
print(f"Diff from background at 's' area: {diff_from_bg[40:120, 910:960].max()}")

# Save a lossless test crop
cv2.imwrite('crop_clean_test.png', crop)
