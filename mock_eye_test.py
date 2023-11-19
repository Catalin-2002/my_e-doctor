import threading
import requests
from PIL import Image
import time
import base64

import cv2

# Constants
BASE_URL = "http://127.0.0.1:5000"  # Replace with your default IP

class ImageAndAPIScript:
    def __init__(self):
        self.base_url = BASE_URL
        self.userId = 3
        self.cap = cv2.VideoCapture(1)

        if not self.cap.isOpened():
            print(f"Error: Camera at index 1 could not be opened.")
            exit(1)


    def handle_command(self, command):
        if command == 'CT':
            self.create_test()
        elif command == 'NEXT':
            self.get_next_level_characters()
        else: 
            self.send_next_level_characters(command)

    
    def create_test(self):
        response = requests.post(f"{self.base_url}/snellen_test/start-test", json={'userId': self.userId})
        if response.status_code == 200:
            test_id = response.json().get('testId')
            self.test_id = test_id
            print(f"Test created with Id {test_id}")
            self.start_send_image_thread()
        else:
            print("Error creating test")

    def start_send_image_thread(self):
        send_image_thread = threading.Thread(target=self.send_image)
        send_image_thread.start()

    def send_image(self):
        ret, frame = self.cap.read()
        if not ret:
            print("Error: Could not read frame from camera.")
            return

        # Convert the image to a JPEG format in memory
        _, buffer = cv2.imencode('.jpg', frame)

        # Encode this image data to base64
        image_as_base64 = base64.b64encode(buffer)

        # Decode the base64 data to a string
        image_as_base64_string = image_as_base64.decode('utf-8')

        # Send the base64 string in the JSON payload
        response = requests.post(f"{self.base_url}/snellen_test/update-camera-frame", 
                                 json={'testId': self.test_id, 'cameraFrame': image_as_base64_string})

        # Wait for 0.2 seconds before the next image
        time.sleep(0.2)
        #self.send_image()

    def get_next_level_characters(self):
        response = requests.get(f"{self.base_url}/snellen_test/get-next-level-characters", json={'testId': self.test_id})
        if response.status_code == 200:
            characters = response.json()
            print("Next level characters:", characters)
        else:
            print("Error getting next level characters")

    def send_next_level_characters(self, predicted_characters):
        predicted_characters = list(predicted_characters)
        response = requests.post(f"{self.base_url}/snellen_test/send-current-level-results", json={'testId': self.test_id, 'currentLevelResults': predicted_characters})
        if response.status_code == 200:
            result = response.json()
            print('Response from server', result) 
        else:
            print('Error receiving next level characters')

# Main execution in a separate thread
def main():
    script = ImageAndAPIScript()
    while True:
        command = input("Enter command: ")
        script.handle_command(command)

def start_main_thread():
    main_thread = threading.Thread(target=main)
    main_thread.start()

if __name__ == "__main__":
    start_main_thread()
    # You can perform other tasks here, or just wait for the main thread
