import cv2
import dlib
import math
import os

class SnellenDistanceEstimator:
    def __init__(self, average_eye_distance_mm, calibration_distance_mm, calibration_eye_distance_pixels):
        # Initialize constants from constructor arguments
        self.AVERAGE_EYE_DISTANCE_MM = average_eye_distance_mm
        self.CALIBRATION_DISTANCE_MM = calibration_distance_mm
        self.CALIBRATION_EYE_DISTANCE_PIXELS = calibration_eye_distance_pixels
        self.FOCAL_LENGTH = (self.CALIBRATION_EYE_DISTANCE_PIXELS * self.CALIBRATION_DISTANCE_MM) / self.AVERAGE_EYE_DISTANCE_MM
        
        file_path = os.path.join(os.path.dirname(__file__), "shape_predictor_68_face_landmarks.dat")
        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor(file_path)

    def estimate_distance_eye_difference(self, eye_distance_pixels):
        distance_mm = (self.FOCAL_LENGTH * self.AVERAGE_EYE_DISTANCE_MM) / eye_distance_pixels
        return distance_mm

    def estimate_user_device_distance(self, frame):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = self.detector(gray)

        # If no faces are detected, throw an error
        if len(faces) == 0:
            raise Exception("No faces detected")
        
        # If more than one face is detected, throw an error
        if len(faces) > 1:
            raise Exception("More than one face detected")
        
        face = faces[0]

        landmarks = self.predictor(gray, face)
        eye_distance_pixels = math.sqrt((landmarks.part(42).x - landmarks.part(39).x)**2 + 
                                        (landmarks.part(42).y - landmarks.part(39).y)**2)

        if eye_distance_pixels == 0:
            raise Exception("Cannot detect the eyes")
        
        distance_cm = self.estimate_distance_eye_difference(eye_distance_pixels) / 10

        return distance_cm