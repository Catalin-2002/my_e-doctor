import uuid

class SnellenTestInstance:
    def __init__(self, user_id):
        self.test_id = uuid.uuid4()
        self.user_id = user_id
        self.current_level = -1
        self.number_of_correct = 0
        self.has_previously_failed = False
        self.last_camera_frame_update = None
        self.last_camera_frame_distance = None
        self.final_score = -1

    def get_test_id(self):
        return self.test_id

    def get_current_level(self):
        return self.current_level
    
    def get_number_of_correct(self):
        return self.number_of_correct
    
    def get_has_previously_failed(self):
        return self.has_previously_failed
    
    def get_last_camera_frame_update(self):
        return self.last_camera_frame_update
    
    def get_last_camera_frame_distance(self):
        return self.last_camera_frame_distance
    
    def get_final_score(self):
        return self.final_score
    
    def set_test_id(self, test_id):
        self.test_id = test_id
    
    def set_current_level(self, current_level):
        self.current_level = current_level

    def set_number_of_correct(self, number_of_correct):
        self.number_of_correct = number_of_correct

    def set_has_previously_failed(self, has_previously_failed):
        self.has_previously_failed = has_previously_failed

    def set_last_camera_frame_update(self, last_camera_frame_update):
        self.last_camera_frame_update = last_camera_frame_update

    def set_last_camera_frame_distance(self, last_camera_frame_distance):
        self.last_camera_frame_distance = last_camera_frame_distance

    def set_final_score(self, final_score):
        self.final_score = final_score