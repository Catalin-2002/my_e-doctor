from snellen_test.snellen_test_manager import SnellenTestManager
from datetime import datetime
from snellen_test.utils import Utils

class SnellenTestService: 
    def __init__(self):
        self.snellen_test_manager = SnellenTestManager()
        pass

    def start_test(self, user_id):
        generated_test_id = self.snellen_test_manager.add_test(user_id)
        return generated_test_id
        

    def update_camera_frame(self, user_id, test_id, camera_frame):
        # Get server current timestamps
        server_timestamp = datetime.now()
        test_instance = self.snellen_test_manager.get_test(test_id)
        test_instance.set_last_camera_frame_update(server_timestamp)

        # Decode the base64 image and create a proper frame
        camera_frame_image = Utils.decode_base64_image(camera_frame)
        

        # Update test instance
        self.snellen_test_manager.update_test(test_id, test_instance)
        pass

    def send_current_level_results(self, user_id, current_level_results):
        pass

    def get_next_level_characters(self, user_id):
        pass

    def get_test_results(self, test_id):
        pass