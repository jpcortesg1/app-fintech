# Import dependencies
# External
from flask import jsonify, request
from flask_jwt_extended import get_jwt

# Personal
# Services
from services.account.account_service import account_service


def by_user():
    try:
        # Get user id
        user_id = get_jwt()['id']

        # Verify number of account exist
        accounts = account_service.set_id_user(user_id).get_by_id_user()

        return jsonify({'message': 'create route is working!', 'status': 200, 'data': accounts}), 200
    except Exception as e:
        return jsonify({'message': str(e), 'status': 500}), 500
