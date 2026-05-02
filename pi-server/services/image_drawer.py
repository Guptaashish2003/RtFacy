import io
from PIL import Image, ImageDraw
from core.interfaces import IImageDrawer
from core.domain import ROI

class PillowImageDrawer(IImageDrawer):
    def draw_roi(self, image_bytes: bytes, roi: ROI) -> bytes:
        try:
            # Load image
            image = Image.open(io.BytesIO(image_bytes))
            
            # Initialize ImageDraw
            draw = ImageDraw.Draw(image)
            
            # Calculate coordinates
            x_min = roi.x_min
            y_min = roi.y_min
            x_max = x_min + roi.width
            y_max = y_min + roi.height
            
            # Draw rectangle (bounding box)
            draw.rectangle([x_min, y_min, x_max, y_max], outline="red", width=3)
            
            # Save image to bytes
            output = io.BytesIO()
            image.save(output, format=image.format or 'JPEG')
            return output.getvalue()
        except Exception as e:
            print(f"Error drawing ROI: {e}")
            return image_bytes  # Return original if error occurs
