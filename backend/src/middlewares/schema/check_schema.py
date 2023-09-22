# Import dependencies
# External
from functools import wraps
from flask import request, jsonify
from marshmallow import ValidationError


def check_schema(schema):
    def _check_schema(f):
        @wraps(f)
        def __check_schema(*args, **kwargs):
            if not request.is_json:
                return jsonify({'error': 'Invalid request, dont have json', 'status': 400})

            data = request.get_json()
            if not data:
                return jsonify({'error': 'Invalid json, dont have data', 'status': 400})
            try:
                result = schema.load(data)

            except ValidationError as err:
                return jsonify({'error': err.messages, 'status': 400}), 400
            except Exception as err:
                raise ValidationError('Invalid request', 'invalid')

            return f(*args, **kwargs)
        return __check_schema
    return _check_schema
