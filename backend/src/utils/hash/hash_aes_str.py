import base64
from cryptography.fernet import Fernet


def hash_aes_str(data: str, key: str) -> str:
    """
    Hash a string using AES algorithm

    :param data: string to be hashed
    :param key: key to hash
    :return: hashed string
    """
    key_from_str = base64.urlsafe_b64decode(key)
    cipher_suite = Fernet(key_from_str)

    data_bytes = str(data).encode('utf-8')
    encrypt_data = cipher_suite.encrypt(data_bytes)

    encrypt_data_str = encrypt_data.decode('utf-8')
    return encrypt_data_str
