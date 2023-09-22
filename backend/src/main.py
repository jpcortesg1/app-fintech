# Import dependencies
import os
from app import app
from models.main_models import *
from routes.main_routes import *

port = os.environ.get("PORT", 5000)

# Run app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=port)
