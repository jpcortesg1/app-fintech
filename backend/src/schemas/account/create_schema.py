from marshmallow import Schema, fields


class Create(Schema):
    type = fields.Str(required=True)
    balance = fields.Float(required=True)
    number = fields.Str(required=True)
