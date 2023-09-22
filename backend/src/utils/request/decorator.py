# Import dependencies
# External
from functools import wraps


def decorator(*args, **kwargs):
    function_param = args[0]

    def _decorator(f):
        @wraps(f)
        def __decorator(id=None):
            if id is None:
                return function_param()
            return function_param(id)
        return __decorator
    return _decorator
