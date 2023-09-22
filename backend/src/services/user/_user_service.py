# Import dependencies
# External
from sqlalchemy.orm import load_only

# Personal
from models.user_model import User
from utils.ORM.build_options import build_options
from utils.ORM.object_to_dict import obj_to_dict

# Class to represent service of user to comunication with dadabase


class _UserService:
    user: User = User

    def get(self, where=[], includes=[], entitites=[], limit=None):
        try:
            # Create options for query, like relationships
            options = []
            if (len(includes) > 0):
                options = build_options(includes)

            # Add entities to query if exists
            if len(entitites) > 0:
                options.append(load_only(*entitites))

            # Get users, execute query
            query = self.user.query\
                .options(
                    *options
                )\
                .filter(*where)\
                .populate_existing()

            if limit:
                query = query.limit(limit)

            users = query.all()

            users_dict = []
            for user in users:
                user_dict = obj_to_dict(user)
                users_dict.append(user_dict)

            return users_dict
        except Exception as e:
            raise Exception(e)

    def create(self, data={}):
        try:
            new_user = self.user(**data)
            # Create user locker
            self.user.query.session.add(new_user)
            self.user.query.session.commit()

            # For some reason if this line is not there, it does not return the new object
            print(new_user.id)

            return obj_to_dict(new_user)
        except Exception as e:
            print(e)
            return None

    def update(self, where=[], data={}):
        try:
            # Update user locker
            self.user.query.filter(*where).update(data)
            self.user.query.session.commit()

            # Get user locker
            user = self.user.query.filter(*where).first()

            return obj_to_dict(user)
        except Exception as e:
            print(e)
            return None

    def delete(self, where=[]):
        try:
            # Delete user locker
            self.user.query.filter(*where).delete()
            self.user.query.session.commit()

            return True
        except Exception as e:
            print(e)
            return None
