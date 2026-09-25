from PIL import Image
import os

img_path = r"c:\Users\John_PC\Desktop\github2\MUSEO-MONJAS-2\MUSEO-MONJAS-2\models\HDR\HDR.jpg"
try:
    with Image.open(img_path) as img:
        width, height = img.size
        print(f"Dimensions: {width}x{height}")
        print(f"Format: {img.format}")
        print(f"Mode: {img.mode}")
except Exception as e:
    print(f"Error: {e}")
