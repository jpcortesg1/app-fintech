# Import dependencies
# External
from flask import jsonify, request
from flask_jwt_extended import get_jwt

# Personal
# Services
from services.transaction.transaction_service import transaction_service
from services.account.account_service import account_service, Account


def create():
    try:
        # Get data
        data = request.get_json()
        id_account_origin_data = data['id_account_origin']
        account_destination_data = data['account_destination']
        amount = data['amount']

        # Get user id
        user_id = get_jwt()['id']

        # Verify account destination
        account_destination = account_service.set_number(
            account_destination_data).get_by_number()
        if not account_destination or len(account_destination) <= 0:
            return jsonify({'message': 'Account destination does not exist', 'status': 400}), 400

        # Verify account origin
        account_origin = account_service.set_id(
            id_account_origin_data).get_by_id()
        if not account_origin or len(account_origin) <= 0 or account_origin[0]['id_user'] != user_id:
            return jsonify({'message': 'Account origin does not exist', 'status': 400}), 400

        # Verify account origin balance
        account_origin, account_destination = account_origin[0], account_destination[0]
        if account_origin['balance'] < amount:
            return jsonify({'message': 'Insufficient funds', 'status': 400}), 400

        # Create transaction
        data_transaction = transaction_service.set_data_new_transaction(
            {'id_account_origin': account_origin['id'], 'id_account_destination': account_destination['id'], 'amount': amount}).data_new_transaction
        new_transaction = transaction_service.create(data_transaction)

        # Update account origin balance
        account_service.update([Account.id == account_origin['id']], {
                               'balance': account_origin['balance'] - amount})

        # Update account destination balance
        account_service.update([Account.id == account_destination['id']], {
                               'balance': account_destination['balance'] + amount})

        return jsonify({'message': 'Transaction created successfully!', 'status': 200}), 200
    except Exception as e:
        return jsonify({'message': str(e), 'status': 500}), 500
