import os
import shutil
from PIL import Image
import pillow_heif

pillow_heif.register_heif_opener()

# 1. Process Logo to Transparent PNG
def make_logo_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        r, g, b, a = item
        # Calculate brightness/luminance
        luminance = 0.299 * r + 0.587 * g + 0.114 * b
        
        # If very close to black, make transparent
        if luminance < 20:
            new_data.append((r, g, b, 0))
        elif luminance < 55:
            # Smooth feathered alpha edge
            alpha = int(((luminance - 20) / 35.0) * 255)
            new_data.append((r, g, b, alpha))
        else:
            new_data.append((r, g, b, 255))

    img.putdata(new_data)
    # Save optimized transparent PNG
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG")
    print(f"Saved transparent logo to {output_path}")

make_logo_transparent("assets/logo.jpeg", "public/assets/logo.png")
make_logo_transparent("assets/logo.jpeg", "assets/logo.png")

# 2. Process Photos
categories = {
    "baby": "public/photos/baby",
    "Marriage": "public/photos/marriage",
    "maternity": "public/photos/maternity",
    "Model": "public/photos/model"
}

for src_folder, dest_folder in categories.items():
    src_path = os.path.join("Photos", src_folder)
    os.makedirs(dest_folder, exist_ok=True)
    if not os.path.exists(src_path):
        continue
    
    files = sorted(os.listdir(src_path))
    idx = 1
    for f in files:
        file_path = os.path.join(src_path, f)
        if not os.path.isfile(file_path):
            continue
        
        ext = os.path.splitext(f)[1].lower()
        target_name = f"{src_folder.lower()}-{idx:02d}.jpg"
        target_path = os.path.join(dest_folder, target_name)

        try:
            with Image.open(file_path) as img:
                # Convert to RGB (in case of RGBA or HEIF color spaces)
                rgb_img = img.convert("RGB")
                rgb_img.save(target_path, "JPEG", quality=92)
                print(f"Processed: {src_folder}/{f} -> {target_path}")
                idx += 1
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

print("Asset processing completed successfully!")
