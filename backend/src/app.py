# Import dependencies
# External
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

import os

# Personal
from configuration.config import config

# Create app
app = Flask(__name__)

# Config app
flask_env = os.environ.get('FLASK_ENV', 'production')
app.config.from_object(config[flask_env])

# Init cors
url_frontend = os.environ.get('URL_FRONT', 'http://localhost:5173')
CORS(app, resources={
    r"/*": {"origins": url_frontend},
    r"/": {"origins": url_frontend},
    r"": {"origins": url_frontend},
})
# CORS(app)

# Init db
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Init jwt
jwt = JWTManager(app)

# Import models

# Run app
if __name__ == '__main__':
    app.run()
