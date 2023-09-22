# Import dependencies
# External
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

# Personal
# Middlewares

from middlewares.schema.schema_middleware import check_schema

# Schemas
from schemas.transaction.transactions_schema import Create

# Utils
from utils.request.decorator import decorator

# Controllers
from controllers.transaction.transactions_controller import create, by_account, by_user

transaction_router = Blueprint(
    'transaction', __name__, url_prefix='/transaction')


@transaction_router.get('/')
def prove_transaction():
    return jsonify({'message': 'transaction route is working!', 'status': 200}), 200


@transaction_router.post('/')
@jwt_required()
@check_schema(Create())
@decorator(create)
def post_create_transaction():
    pass


@transaction_router.get('/by-user')
@jwt_required()
@decorator(by_user)
def get_by_user():
    pass


@transaction_router.get('/by-account/<id>')
@jwt_required()
@decorator(by_account)
def get_by_account():
    pass
