# Import dependencies
# External
from flask import jsonify
from flask_jwt_extended import get_jwt

# Personal
# Services
from services.account.account_service import account_service


def by_account(id):
    try:
        id_user = get_jwt()['id']
        id_account = int(id)

        account = account_service.set_id(
            id_account).add_transactions_origin_include().add_transactions_destination_include().get_by_id()
        if not account or len(account) == 0:
            return jsonify({
                'message': 'Account not found!',
                'status': 404
            }), 404

        account = account[0]
        if account['id_user'] != id_user:
            return jsonify({
                'message': 'Account not found!',
                'status': 404
            }), 404

        transaction = account['transactions_origin'] + \
            account['transactions_destination']

        return jsonify({
            'message': 'by account route is working!',
            'status': 200,
            'data': transaction
        }), 200
    except Exception as e:
        return jsonify({
            'message': str(e),
            'status': 500
        }), 500
