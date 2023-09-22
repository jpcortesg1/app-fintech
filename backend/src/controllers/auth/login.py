# Import dependencies
# External
from flask import jsonify, request
import os
from flask_jwt_extended import create_access_token
from datetime import timedelta

# Personal
from services.user.user_service import user_service

# Utils
from utils.hash.unhash_password_str import unhash_password_str


def login():
    try:
        # Get data
        data = request.get_json()
        email, password = data['email'], data['password']

        # Validate email
        user_with_email = user_service.set_email(email).get_by_email()
        if len(user_with_email) == 0:
            return jsonify({'message': 'Email not found!', 'status': 400}), 400

        # Validate password
        user = user_with_email[0]
        key = os.environ.get('ENCRYPT_KEY')
        is_correct_password = unhash_password_str(
            user['password'], key) == password

        # Wrong password
        if not is_correct_password:
            return jsonify({'message': 'Password is incorrect!', 'status': 400}), 400

        user_data = {
            'id': user['id'],
        }
        jwt = create_access_token(
            identity=user_data, additional_claims=user_data, expires_delta=timedelta(minutes=1))

        return jsonify({'message': 'Auth route is working!', 'status': 200, 'data': {
            'jwt': jwt
        }}), 200
    except Exception as e:
        return jsonify({'message': str(e), 'status': 500}), 500
