from flask import Blueprint, jsonify, request

from investigations.investigations_service import InvestigationsService

investigations_blueprint = Blueprint('investigations', __name__)
investigations_service = InvestigationsService()

@investigations_blueprint.route('/', methods=['POST'])
def create_investigation():
    investigation = request.json

    # try:
    investigation_id = investigations_service.add_investigation(investigation)
    return jsonify({'investigationId': investigation_id}), 200
    # except Exception as e:
    #     return jsonify({'error': 'An error occurred when trying to make investigation. Please try again.'}), 400