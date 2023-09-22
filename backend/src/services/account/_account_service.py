# Import dependencies
# External
from sqlalchemy.orm import load_only

# Personal
from models.account_model import Account
from utils.ORM.build_options import build_options
from utils.ORM.object_to_dict import obj_to_dict

# Class to represent service of account to comunication with dadabase


class _AccountService:
    account: Account = Account

    def get(self, where=[], includes=[], entitites=[], limit=None):
        try:
            # Create options for query, like relationships
            options = []
            if (len(includes) > 0):
                options = build_options(includes)

            # Add entities to query if exists
            if len(entitites) > 0:
                options.append(load_only(*entitites))

            # Get accounts, execute query
            query = self.account.query\
                .options(
                    *options
                )\
                .filter(*where)\
                .populate_existing()

            if limit:
                query = query.limit(limit)

            accounts = query.all()

            accounts_dict = []
            for account in accounts:
                account_dict = obj_to_dict(account)
                accounts_dict.append(account_dict)

            return accounts_dict
        except Exception as e:
            raise Exception(e)

    def create(self, data={}):
        try:
            new_account = self.account(**data)
            # Create account locker
            self.account.query.session.add(new_account)
            self.account.query.session.commit()

            # For some reason if this line is not there, it does not return the new object
            print(new_account.id)

            return obj_to_dict(new_account)
        except Exception as e:
            raise Exception(e)

    def update(self, where=[], data={}):
        try:
            # Update account
            self.account.query\
                .filter(*where)\
                .update(data)

            # Commit changes
            self.account.query.session.commit()

            return True
        except Exception as e:
            raise Exception(e)

    def delete(self, where=[]):
        try:
            # Delete account
            self.account.query\
                .filter(*where)\
                .delete()

            # Commit changes
            self.account.query.session.commit()

            return True
        except Exception as e:
            raise Exception(e)
