from snellen_test.snellen_test_instance import SnellenTestInstance
from uuid import UUID

class SnellenTestManager:
    def __init__(self):
        self.snellen_tests = {}

    def add_test(self, user_id):
        new_test_instance = SnellenTestInstance(user_id)
        self.snellen_tests[new_test_instance.get_test_id()] = new_test_instance
        return new_test_instance.get_test_id()

    def get_test(self, test_id):
        # Convert test_id to UUID object if it's a string
        if isinstance(test_id, str):
            try:
                test_id = UUID(test_id)
            except ValueError:
                print("Invalid test ID format")
                return None

        return self.snellen_tests.get(test_id)

    def update_test(self, test_id, new_test):
        self.snellen_tests[test_id] = new_test
