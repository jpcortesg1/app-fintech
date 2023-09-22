# Import dependencies
# External
from flask import Blueprint
from flask import jsonify
from flask_jwt_extended import jwt_required

# Personal
# Middlewares
from middlewares.schema.schema_middleware import check_schema

# Schemas
from schemas.account.account_schemas import Create

# Utils
from utils.request.decorator import decorator

# Controllers
from controllers.account.account_controllers import create, by_user, delete

# Create route
account_router = Blueprint('account', __name__, url_prefix='/account')


@account_router.get('/')
def prove_account():
    return jsonify({'message': 'account route is working!', 'status': 200}), 200


@account_router.post('/')
@jwt_required()
@check_schema(Create())
@decorator(create)
def post_create_account():
    pass


@account_router.get('/by-user')
@jwt_required()
@decorator(by_user)
def get_by_user():
    pass


@account_router.delete('/<id>')
@jwt_required()
@decorator(delete, id)
def delete_account():
    pass
