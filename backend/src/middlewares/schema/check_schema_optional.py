# Import dependencies
# External
from functools import wraps
from flask import request, jsonify
from marshmallow import ValidationError


def check_schema_all_optional(schema):
    def _check_schema_all_optional(f):
        @wraps(f)
        def __check_schema_all_optional(*args, **kwargs):
            if not request.is_json:
                return f(*args, **kwargs)

            data = request.get_json()

            try:
                result = schema.load(data)

            except ValidationError as err:
                return jsonify({'error': err.messages, 'status': 400}), 400
            except Exception as err:
                raise ValidationError('Invalid request', 'invalid')

            return f(*args, **kwargs)
        return __check_schema_all_optional
    return _check_schema_all_optional
