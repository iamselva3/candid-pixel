from PIL import Image
import os

def make_logo_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        r, g, b, a = item
        # Calculate luminance
        luminance = 0.299 * r + 0.587 * g + 0.114 * b
        
        # Black background threshold
        if luminance < 25:
            new_data.append((r, g, b, 0))
        elif luminance < 60:
            alpha = int(((luminance - 25) / 35.0) * 255)
            new_data.append((r, g, b, alpha))
        else:
            new_data.append((r, g, b, 255))

    img.putdata(new_data)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG")
    print(f"Successfully converted {input_path} to transparent {output_path}")

make_logo_transparent("assets/logo.jpeg", "public/assets/logo.png")
make_logo_transparent("assets/logo.jpeg", "assets/logo.png")
