# Import dependencies
# External
from cryptography.fernet import Fernet
import base64
import os

# Personal
# Services
from services.user._user_service import _UserService

# Models
from models.user_model import User

# Utils
from utils.hash.hash_aes_str import hash_aes_str

# Class to represent custo service of user


class UserService(_UserService):
    user: User = User
    email = None
    includes = []
    data_new_user: dict = {
        'name': '',
        'email': '',
        'password': '',
        'key': '',
    }

    def create_key(self):
        # Generate a random encryption key
        key = Fernet.generate_key()
        key_str = base64.urlsafe_b64encode(key).decode()
        return key_str

    def get_by_email(self):
        where = [
            User.email == self.email,
            User.deleted_at == None
        ]
        return self.get(where, self.includes)

    def set_email(self, email: str):
        self.email = email
        return self

    def get_data_new_user(self):
        return self.data_new_user

    def set_key_data_new_user(self):
        self.data_new_user['key'] = self.create_key()
        return self

    def set_data_new_user(self, data_new_user: dict):
        if 'key' in data_new_user:
            del data_new_user['key']
        self.data_new_user.update(data_new_user)

        key = os.environ.get('ENCRYPT_KEY')
        self.data_new_user['password'] = hash_aes_str(
            self.data_new_user['password'], key)
        return self


# Create instance of class
user_service = UserService()
