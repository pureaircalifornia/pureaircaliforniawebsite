import os
from PIL import Image

def optimize_image(filepath, max_width=None, quality=80):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    try:
        with Image.open(filepath) as img:
            needs_resize = max_width and img.width > max_width

            if needs_resize:
                # Calculate new height
                ratio = max_width / float(img.width)
                new_height = int((float(img.height) * float(ratio)))
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                print(f"Resized {filepath} to {max_width}x{new_height}")

            # Save in place with optimization
            file_ext = os.path.splitext(filepath)[1].lower()
            if file_ext in ['.jpg', '.jpeg']:
                img.save(filepath, "JPEG", optimize=True, quality=quality)
                print(f"Optimized JPEG: {filepath}")
            elif file_ext == '.png':
                img.save(filepath, "PNG", optimize=True)
                print(f"Optimized PNG: {filepath}")
    except Exception as e:
        print(f"Error optimizing {filepath}: {e}")

if __name__ == "__main__":
    base_dir = "frontend/public"
    
    # 1. Optimize Hero Backgrounds (Max 1920px wide, 70% quality for massive savings)
    optimize_image(f"{base_dir}/images/hero/hvac-technicians.jpg", max_width=1920, quality=70)
    optimize_image(f"{base_dir}/images/hero/hvac-3d-render.jpg", max_width=1920, quality=70)

    # 2. Optimize Logos (Max 400px wide for pure logo, 200px for partner logos)
    optimize_image(f"{base_dir}/logo/ymca.png", max_width=200)
    optimize_image(f"{base_dir}/logo/pac-logo.png", max_width=400)
