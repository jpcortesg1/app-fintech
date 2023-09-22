from marshmallow import Schema, fields


class Create(Schema):
    id_account_origin = fields.Integer(required=True)
    account_destination = fields.Str(required=True)
    amount = fields.Float(required=True)
