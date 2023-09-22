import base64
from cryptography.fernet import Fernet


def unhash_password_str(hashed: str, key: str) -> str:

    key_from_str = base64.urlsafe_b64decode(key)
    cipher_suite = Fernet(key_from_str)

    hashed_bytes = hashed.encode('utf-8')
    unhashed_bytes = cipher_suite.decrypt(hashed_bytes)

    unhashed_str = unhashed_bytes.decode('utf-8')
    return unhashed_str
