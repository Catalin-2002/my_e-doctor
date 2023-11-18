from flask import Blueprint, jsonify, request

from snellen_test.snellen_test_service import SnellenTestService

snellen_test_blueprint = Blueprint('snell_test', __name__)
snellen_test_service = SnellenTestService()


@snellen_test_blueprint.route('/start-test', methods=['POST'])
def start_test():
    user_id = request.json.get('userID')

    try:
        test_id = snellen_test_service.start_test(user_id)
        return jsonify({'test_id': test_id}), 200
    except Exception as e:
        return jsonify({'error': 'An error occurred when trying to start the test. Please try again.'}), 400

@snellen_test_blueprint.route('/update-camera-frame', methods=['POST'])
def update_camera_frame():
    user_id = request.json.get('userID')
    test_id = request.json.get('testID')
    camera_frame = request.json.get('cameraFrame')

    try :
        snellen_test_service.update_camera_frame(user_id, test_id, camera_frame)
        return jsonify(), 200
    except Exception as e:
        return jsonify({'Some error occured when trying to update the camera frame. Please restart the test and try again.'}), 400
    

@snellen_test_blueprint.route('/send-current-level-results', methods=['POST'])
def send_current_level_results():
    user_id = request.json.get('userID')
    current_level_results = request.json.get('currentLevelResults')

    try :
        snellen_test_service.send_current_level_results(user_id, current_level_results)
        return jsonify(), 200
    except Exception as e:
        return jsonify({'Some error occured when trying to transmit the current level results. Please restart the test and try again.'}), 400
    
@snellen_test_blueprint.route('/get-next-level-characters', methods=['GET'])
def get_next_level_characters():
    user_id = request.json.get('userID')

    try :
        next_level_characters = snellen_test_service.get_next_level_characters(user_id)
        return jsonify(next_level_characters), 200
    except Exception as e:
        return jsonify({'Some error occured when trying to get the next level characters. Please restart the test and try again.'}), 400
    
@snellen_test_blueprint.route('/get-test-results', methods=['GET'])
def get_test_results():
    user_id = request.json.get('userID')

    try :
        test_results = snellen_test_service.get_test_results(user_id)
        return jsonify(test_results), 200
    except Exception as e:
        return jsonify({'Some error occured when trying to get the test results. Please restart the test and try again.'}), 400