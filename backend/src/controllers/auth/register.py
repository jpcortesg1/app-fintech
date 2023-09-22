# Import dependencies
# External
from flask import jsonify, request

# Personal
from services.user.user_service import user_service


def register():
    try:
        # Get data
        data = request.get_json()
        name, email, password = data['name'], data['email'], data['password']

        # Validate email
        user_with_email = user_service.set_email(email).get_by_email()
        if len(user_with_email) > 0:
            return jsonify({'message': 'Email already exists!', 'status': 400}), 400

        # Create new user
        new_user_data = user_service.set_key_data_new_user().set_data_new_user(
            {'name': name, 'email': email, 'password': password}).get_data_new_user()
        new_user = user_service.create(new_user_data)

        return jsonify({'message': 'Register route is working!', 'status': 200, 'data': new_user}), 200
    except Exception as e:
        return jsonify({'message': str(e), 'status': 500}), 500
