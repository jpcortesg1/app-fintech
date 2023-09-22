# Import dependencies
# External
from flask import jsonify
from flask_jwt_extended import get_jwt

# Personal
# Services
from services.account.account_service import account_service


def by_user():
    try:
        id_user = get_jwt()['id']
        accounts = account_service.set_id_user(id_user).add_transactions_destination_include(
        ).add_transactions_origin_include().get_by_id_user()
        all_transactions = []
        all_transactions_origin = []
        all_transactions_destination = []
        account_transactions_origin = {}
        account_with_more_transactions_origin = {}
        account_transactions_destination = {}
        account_with_more_transactions_destination = {}

        last_transactions = []

        for account in accounts:
            account_transactions_origin[account['id']] = {
                'account': account['number'], 'transactions': len(account['transactions_origin'])
            }
            account_transactions_destination[account['id']] = {
                'account': account['number'], 'transactions': len(account['transactions_destination'])
            }
            all_transactions_origin += account['transactions_origin']
            all_transactions_destination += account['transactions_destination']
            all_transactions += account['transactions_origin']
            all_transactions += account['transactions_destination']

        if len(account_transactions_origin) > 0:
            # Get keu with more transactions
            key = 0
            for k, v in account_transactions_origin.items():
                if v['transactions'] > key:
                    key = k
            account_with_more_transactions_origin = account_transactions_origin[key]
            account_with_more_transactions_origin.update({'id': key})

        if len(account_transactions_destination) > 0:
            # Get keu with more transactions
            key = 0
            for k, v in account_transactions_destination.items():
                if v['transactions'] > key:
                    key = k
            account_with_more_transactions_destination = account_transactions_destination[
                key]
            account_with_more_transactions_destination.update({'id': key})

        all_transactions_origin.sort(
            key=lambda x: x['created_at'], reverse=True)
        if len(all_transactions) > 10:
            last_transactions = all_transactions[:10]
        else:
            last_transactions = all_transactions

        return jsonify({
            'message': 'by user route is working!',
            'status': 200,
            'data': {
                'all_transactions_origin': all_transactions_origin,
                'all_transactions_destination': all_transactions_destination,
                'account_with_more_transactions_origin': account_with_more_transactions_origin,
                'account_with_more_transactions_destination': account_with_more_transactions_destination,
                'last_transactions': last_transactions,
            }
        })
    except Exception as e:
        return jsonify({
            'message': str(e),
            'status': 500
        }), 500
