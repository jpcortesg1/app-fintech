# Import dependencies
# Personal
from app import db


# Class model User

class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String, nullable=False)
    balance = db.Column(db.Float, nullable=False)
    number = db.Column(db.String, nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())
    deleted_at = db.Column(db.DateTime, nullable=True)

    # Relationships explicit
    user = db.relationship('User', backref=db.backref('accounts', lazy=True))

    # Implicit relationships
    transactions_origin = db.relationship(
        'Transaction', foreign_keys='Transaction.id_account_origin')
    transactions_destination = db.relationship(
        'Transaction', foreign_keys='Transaction.id_account_destination')
