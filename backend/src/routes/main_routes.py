# Import dependencies
# External
from flask import Blueprint

# Personal
from routes.auth_router import auth_router
from routes.account_router import account_router
from routes.transaction_router import transaction_router

# Personal
from app import app

# Create router
main_router = Blueprint('main_router', __name__, url_prefix='/api/v1')

# Register routes
main_router.register_blueprint(auth_router)
main_router.register_blueprint(account_router)
main_router.register_blueprint(transaction_router)

# Register blueprint
app.register_blueprint(main_router)
