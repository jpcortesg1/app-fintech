# Import dependencies
# External
from flask import jsonify
from flask_jwt_extended import get_jwt

# Personal
# Services
from services.account.account_service import account_service, Account


def delete(id):
    try:
        id_user = get_jwt()['id']
        account = account_service.set_id(int(id)).get_by_id()

        if account is None or len(account) == 0:
            return jsonify({'message': 'Account not found!', 'status': 404}), 404

        account = account[0]
        if account['id_user'] != id_user:
            return jsonify({'message': 'Account not found!', 'status': 404}), 404

        account_service.delete([
            Account.id == int(id)
        ])

        return jsonify({'message': 'delete success', 'status': 200}), 200
    except Exception as e:
        return jsonify({'message': str(e), 'status': 500}), 500
