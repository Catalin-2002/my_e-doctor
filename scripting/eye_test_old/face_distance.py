import cv2
import dlib
import time
import math

# Try different indices if 0 doesn't work. For example, try 1, 2, etc.
camera_index = 1
cap = cv2.VideoCapture(camera_index)

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
AVERAGE_EYE_DISTANCE_MM = 65

# Calibration: Assume at a certain distance, the eye distance in pixels (this needs real-world measurement)
# For example, at 60 cm, the eye distance might be 100 pixels
CALIBRATION_DISTANCE_MM = 600
CALIBRATION_EYE_DISTANCE_PIXELS = 100

FOCAL_LENGTH = (CALIBRATION_EYE_DISTANCE_PIXELS * CALIBRATION_DISTANCE_MM) / AVERAGE_EYE_DISTANCE_MM

def estimate_distance(eye_distance_pixels):
    # Using the formula: distance = (focal length * real eye distance) / eye distance in image
    distance_mm = (FOCAL_LENGTH * AVERAGE_EYE_DISTANCE_MM) / eye_distance_pixels
    return distance_mm

# Check if the camera opened successfully
if not cap.isOpened():
    print(f"Error: Camera at index {camera_index} could not be opened.")
    exit(1)

# Load the dlib's face detector and facial landmark predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# [Rest of your existing variables and functions]

while True:
    ret, frame = cap.read()

    # Check if frame is read correctly
    if not ret:
        print("Failed to grab frame")
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = detector(gray)
    for face in faces:
        landmarks = predictor(gray, face)
        
        # Calculate inter-eye distance in pixels
        eye_distance_pixels = math.sqrt((landmarks.part(42).x - landmarks.part(39).x)**2 + 
                                        (landmarks.part(42).y - landmarks.part(39).y)**2)

        # Estimate distance
        if eye_distance_pixels != 0:
            distance_mm = estimate_distance(eye_distance_pixels)
            print(f"Estimated Distance: {distance_mm/10:.2f} cm")

    cv2.imshow('Camera Feed', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()