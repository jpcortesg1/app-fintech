# Import dependencies
# External
from flask import Blueprint
from flask import jsonify

# Personal
# Middlewares
from middlewares.schema.schema_middleware import check_schema

# Schemas
from schemas.auth.auth_schemas import Login, Register

# Utils
from utils.request.decorator import decorator

# Controllers
from controllers.auth.auth_controllers import login, register

# Create route
auth_router = Blueprint('auth', __name__, url_prefix='/auth')


@auth_router.get('/')
def prove_auth():
    return jsonify({'message': 'Auth route is working!', 'status': 200}), 200


@auth_router.post('/')
@check_schema(Login())
@decorator(login)
def post_auth():
    pass


@auth_router.post('/register')
@check_schema(Register())
@decorator(register)
def post_register():
    pass
