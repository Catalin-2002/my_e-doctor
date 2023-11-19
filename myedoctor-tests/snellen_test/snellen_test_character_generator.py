import random

class SnellenCharacterGenerator: 
    def __init__(self, snellen_test_manager):
        self.level_map = {
            1:  1,
            2:  1,
            3:  2,
            4:  3,
            5:  3,
            6:  3,
            7:  4,
            8:  4,
            9:  5,
            10: 6,
            11: 6
        }
        self.snellen_test_manager = snellen_test_manager


    def generate_random_characters(self, num_characters):
        characters = [chr(random.randint(65, 90)) for _ in range(num_characters)]
        return ''.join(characters)
    
    def generate_characters(self, test_id):
        current_test_instance = self.snellen_test_manager.get_test(test_id)
        current_test_instance.set_current_level(current_test_instance.get_current_level() + 1)
        number_of_characters = self.level_map[current_test_instance.get_current_level()]
        characters = self.generate_random_characters(number_of_characters)
        current_test_instance.set_current_level_characters(characters)

        self.snellen_test_manager.update_test(test_id, current_test_instance)
        print(characters)

        return characters