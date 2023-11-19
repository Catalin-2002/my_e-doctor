from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin

from investigations.investigations_service import InvestigationsService

investigations_blueprint = Blueprint('investigations', __name__)
investigations_service = InvestigationsService()

CORS(investigations_blueprint)
SOURCE_BASE_URL = "https://www.reginamaria.ro"

@investigations_blueprint.route('/', methods=['POST'])
@cross_origin()
def create_investigation():
    investigation = request.json

    # try:
    response_text, response_source = investigations_service.add_investigation(investigation)
    return jsonify({'responseText': response_text, 'responseSource': f"{SOURCE_BASE_URL}{response_source}"}), 200
    # except Exception as e:
    #     return jsonify({'error': 'An error occurred when trying to make investigation. Please try again.'}), 400
