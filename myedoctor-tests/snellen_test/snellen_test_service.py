from snellen_test.snellen_test_manager import SnellenTestManager
from datetime import datetime
from snellen_test.utils import SnellenTestUtils
from snellen_test.snellen_test_distance_estimator import SnellenDistanceEstimator
from snellen_test.snellen_test_character_generator import SnellenCharacterGenerator

class SnellenTestService: 
    def __init__(self):
        self.snellen_test_manager = SnellenTestManager()
        self.snellen_distance_estimator = SnellenDistanceEstimator(65, 600, 100)
        self.snellen_character_generator = SnellenCharacterGenerator(self.snellen_test_manager)

    def start_test(self, user_id):
        generated_test_id = self.snellen_test_manager.add_test(user_id)
        return generated_test_id
        

    def update_camera_frame(self, test_id, camera_frame):
        # Get server current timestamps
        server_timestamp = datetime.now()
        test_instance = self.snellen_test_manager.get_test(test_id)

        test_instance.set_last_camera_frame_update(server_timestamp)

        # Decode the base64 image and create a proper frame
        camera_frame = str(camera_frame)
        camera_frame_image = SnellenTestUtils.decode_base64_image(camera_frame)
        print(camera_frame_image.shape)

        distance = self.snellen_distance_estimator.estimate_user_device_distance(camera_frame_image)
        print('Distance:', distance)
        test_instance.set_last_camera_distance_update(distance)

        # Update test instance
        self.snellen_test_manager.update_test(test_id, test_instance)

    def send_current_level_results(self, user_id, current_level_results):
        pass

    def get_next_level_characters(self, test_id):
        print('Got here 1.0')
        characters = self.snellen_character_generator.generate_characters(test_id)
        return characters

    def get_test_results(self, test_id):
        pass