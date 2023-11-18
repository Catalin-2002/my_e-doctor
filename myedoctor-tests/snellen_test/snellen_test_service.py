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
        test_instance.set_last_camera_frame_distance(distance)

        # Update test instance
        self.snellen_test_manager.update_test(test_id, test_instance)

    def send_current_level_results(self, test_id, current_level_results):
        print('Current level result got: ', current_level_results)
        test_instance = self.snellen_test_manager.get_test(test_id)
        desired_characters = test_instance.get_current_level_characters()
        print('Desired characters: ', desired_characters)

        # Compare the desired characters with the current level results
        # and update the test instance

        # Check how many instances are the same
        correct_characters = 0
        for i in range(len(desired_characters)):
            if desired_characters[i] == current_level_results[i]:
                correct_characters += 1

        print ('Correct characters: ', correct_characters, ' out of ', len(desired_characters))

        # Have a threshold of 80% to pass the level
        if correct_characters < 0.6 * len(desired_characters) or (correct_characters < 0.85 * len(desired_characters) and test_instance.get_has_previously_failed() == True):
            return False
        
        if correct_characters < 0.85 * len(desired_characters) :
            desired_characters = desired_characters[:len(desired_characters) - 1]
            test_instance.set_current_level(self.snellen_test_manager.get_test(test_id).get_current_level() - 1)
            test_instance.set_has_previously_failed(True)
            # Update the test instance 
            self.snellen_test_manager.update_test(test_id, test_instance)
            return None
        
        print ('Correct characters 2.0: ', correct_characters, ' out of ', len(desired_characters))
        return True
        

    def get_next_level_characters(self, test_id):
        characters = self.snellen_character_generator.generate_characters(test_id)
        desired_distance = self.snellen_test_manager.get_test(test_id).get_last_camera_frame_distance()
        return characters, desired_distance

    def get_test_results(self, test_id):
        pass