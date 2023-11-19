import base64
from PIL import Image
from io import BytesIO
import numpy as np

class SnellenTestUtils:
    @staticmethod
    def decode_base64_image(base64_string):
        # Remove the base64 header if present
        if ',' in base64_string:
            base64_string = base64_string.split(',')[1]

        # Decode the base64 string
        image_data = base64.b64decode(base64_string)

        # Convert the binary data to an image
        image = Image.open(BytesIO(image_data))

        # Convert the PIL Image to a NumPy array (OpenCV format)
        open_cv_image = np.array(image) 

        # Convert RGB to BGR (OpenCV uses BGR color format)
        open_cv_image = open_cv_image[:, :, ::-1].copy() 

        return open_cv_image