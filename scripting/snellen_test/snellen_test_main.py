import cv2
from distance_estimator import DistanceEstimator

class SnellenTest:
    def __init__(self) -> None:
        self.DistanceEstimator = DistanceEstimator(65, 600, 100)

    def get_characters_size(self, frame):

    def generate_snell_test(self, frame): 
        # Return a list of characters with their size






# # I will use the information provided by Wikipedia to calculate the dimensions of each row of letters on the Snellen chart.
# # The chart is designed such that at 6 meters' distance, the letters on the 6/6 line subtend 5 minutes of arc, with individual limbs of the letters subtending 1 minute of arc.
# # The letters on the 6/6 line are 8.73 mm tall, and the topmost (6/60) "E" is 87.3 mm tall.
# # The height of the letters in each row can be calculated based on this information, using the ratio of the visual acuity line (6/x) to the 6/6 line.

# # Constants
# distance_to_chart = 6  # meters
# height_6_6_line = 8.73  # mm, height of letters on the 6/6 line
# height_6_60_line = 87.3  # mm, height of the topmost letter

# # Visual acuity lines on the Snellen chart
# visual_acuity_lines = [60, 36, 24, 18, 12, 9, 6, 5, 4, 3, 2]

# # Calculate the height of the letters in each row
# letter_heights = [height_6_60_line * (6 / line) for line in visual_acuity_lines]

# letter_heights

# # Camera setup
# camera_index = 1
# cap = cv2.VideoCapture(camera_index)

# if not cap.isOpened():
#     print(f"Error: Camera at index {camera_index} could not be opened.")
#     exit(1)

# # Instantiate the DistanceEstimator with constants
# distance_estimator = DistanceEstimator(65, 600, 100)

# while True:
#     ret, frame = cap.read()
#     if not ret:
#         print("Failed to grab frame")
#         break

#     # Process each frame through DistanceEstimator
#     distance = distance_estimator.estimate_user_device_distance(frame)
#     # print("The value returned by the distance estimator is " + str(distance))

#     cv2.imshow('Camera Feed', frame)
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()