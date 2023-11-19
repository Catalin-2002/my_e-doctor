from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin

from snellen_test.snellen_test_service import SnellenTestService

snellen_test_blueprint = Blueprint('snellen-test', __name__)
snellen_test_service = SnellenTestService()
CORS(snellen_test_blueprint)


@snellen_test_blueprint.route('/start-test', methods=['POST'])
@cross_origin()
def start_test():
    user_id = request.json.get('userId')

    try:
        test_id = snellen_test_service.start_test(user_id)
        return jsonify({'testId': test_id}), 200
    except Exception as e:
        return jsonify({'error': 'An error occurred when trying to start the test. Please try again.'}), 400

@snellen_test_blueprint.route('/camera-frame', methods=['POST'])
@cross_origin()
def update_camera_frame():
    test_id = request.json.get('testId')
    camera_frame = request.json.get('cameraFrame')

    try :
        next_level_size = snellen_test_service.update_camera_frame(test_id, camera_frame)
        return jsonify({'levelSize': next_level_size}), 200
    except Exception as e:
        return jsonify({'Some error occured when trying to update the camera frame. Please restart the test and try again.'}), 400
    

@snellen_test_blueprint.route('/current-level-results', methods=['POST'])
@cross_origin()
def send_current_level_results():
    test_id = request.json.get('testId')
    current_level_results = request.json.get('currentLevelResults')

    try :
        test_results = snellen_test_service.send_current_level_results(test_id, current_level_results)
        return jsonify({'testResults': test_results}), 200
    except Exception as e:
        return jsonify({'Some error occured when trying to transmit the current level results. Please restart the test and try again.'}), 400
    
@snellen_test_blueprint.route('/next-level-characters/<test_id>', methods=['GET'])
@cross_origin()
def get_next_level_characters(test_id):
    try :
        next_level_character, next_level_size = snellen_test_service.get_next_level_characters(test_id)
        return jsonify({'characters': next_level_character, 'testSize': next_level_size}), 200
    except Exception as e:
        return jsonify({'Some error occured when trying to get the next level characters. Please restart the test and try again.'}), 400
