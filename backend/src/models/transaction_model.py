# Import dependencies
# Personal
from app import db


# Class model User

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_account_origin = db.Column(
        db.Integer, db.ForeignKey('account.id'), nullable=True)
    id_account_destination = db.Column(
        db.Integer, db.ForeignKey('account.id'), nullable=True)
    amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())
    deleted_at = db.Column(db.DateTime, nullable=True)

    # Relationships explicit
    account_origin = db.relationship(
        'Account', foreign_keys=[id_account_origin])
    account_destination = db.relationship(
        'Account', foreign_keys=[id_account_destination])
