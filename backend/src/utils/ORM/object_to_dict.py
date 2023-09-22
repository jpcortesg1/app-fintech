def obj_to_dict(obj):
    if isinstance(obj, dict):
        return {k: obj_to_dict(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [obj_to_dict(item) for item in obj]
    elif hasattr(obj, '__dict__'):
        attrs = {}
        for key, value in obj.__dict__.items():
            if not key.startswith('_'):
                attrs[key] = obj_to_dict(value)
        return attrs
    else:
        return obj
