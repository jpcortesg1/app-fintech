# Import dependencies
# External
from sqlalchemy.orm import load_only

# Personal
from models.transaction_model import Transaction
from utils.ORM.build_options import build_options
from utils.ORM.object_to_dict import obj_to_dict

# Class to represent service of transaction to comunication with dadabase


class _TransactionService:
    transaction: Transaction = Transaction

    def get(self, where=[], includes=[], entitites=[], limit=None):
        try:
            # Create options for query, like relationships
            options = []
            if (len(includes) > 0):
                options = build_options(includes)

            # Add entities to query if exists
            if len(entitites) > 0:
                options.append(load_only(*entitites))

            # Get transactions, execute query
            query = self.transaction.query\
                .options(
                    *options
                )\
                .filter(*where)\
                .populate_existing()

            if limit:
                query = query.limit(limit)

            transactions = query.all()

            transactions_dict = []
            for transaction in transactions:
                transaction_dict = obj_to_dict(transaction)
                transactions_dict.append(transaction_dict)

            return transactions_dict
        except Exception as e:
            raise Exception(e)

    def create(self, data={}):
        try:
            new_transaction = self.transaction(**data)
            # Create transaction locker
            self.transaction.query.session.add(new_transaction)
            self.transaction.query.session.commit()

            # For some reason if this line is not there, it does not return the new object
            print(new_transaction.id)

            return obj_to_dict(new_transaction)
        except Exception as e:
            raise Exception(e)

    def update(self, where=[], data={}):
        try:
            # Update transaction
            self.transaction.query\
                .filter(*where)\
                .update(data)

            # Commit changes
            self.transaction.query.session.commit()

            return True
        except Exception as e:
            raise Exception(e)

    def delete(self, where=[]):
        try:
            # Delete transaction
            self.transaction.query\
                .filter(*where)\
                .delete()

            # Commit changes
            self.transaction.query.session.commit()

            return True
        except Exception as e:
            raise Exception(e)
