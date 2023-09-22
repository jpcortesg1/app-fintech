# Import dependencies
# External
from flask import jsonify, request
from flask_jwt_extended import get_jwt

# Personal
# Services
from services.account.account_service import account_service


def create():
    try:
        # Get data
        data = request.get_json()

        # Get user id
        user_id = get_jwt()['id']

        # Verify number of account exist
        account_by_number = account_service.set_number(
            data['number']).get_by_number()
        if len(account_by_number) > 0:
            return jsonify({'message': 'Account already exists', 'status': 400}), 400

        # Create account
        new_account_data = account_service.set_data_new_account(
            data).set_id_user_data(user_id).get_data_new_account_data()
        new_account = account_service.create(new_account_data)

        return jsonify({'message': 'create route is working!', 'status': 200, 'data': new_account}), 200
    except Exception as e:
        return jsonify({'message': str(e), 'status': 500}), 500
