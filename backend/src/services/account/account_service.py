from services.account._account_service import _AccountService

from models.account_model import Account


class AccountService(_AccountService):
    number = None
    id_user = None
    id = None
    includes = []
    data_new_account: dict = {
        'type': '',
        'balance': 0,
        'number': '',
        'id_user': 0,
    }

    def add_transactions_destination_include(self):
        self.includes.append({
            'include': Account.transactions_destination
        })
        return self

    def add_transactions_origin_include(self):
        self.includes.append({
            'include': Account.transactions_origin
        })
        return self

    def get_by_id(self):
        where = [
            Account.id == self.id,
            Account.deleted_at == None
        ]
        return self.get(where=where, includes=self.includes)

    def set_id(self, id: int):
        self.id = id
        return self

    def get_by_id_user(self):
        where = [
            Account.id_user == self.id_user,
            Account.deleted_at == None
        ]
        return self.get(where=where, includes=self.includes)

    def set_id_user(self, id_user: int):
        self.id_user = id_user
        return self

    def get_by_number(self):
        where = [
            Account.number == self.number,
            Account.deleted_at == None
        ]
        return self.get(where=where)

    def set_number(self, number: str):
        self.number = number
        return self

    def set_data_new_account(self, data_new_account: dict):
        self.data_new_account.update(data_new_account)
        return self

    def set_id_user_data(self, id_user: int):
        self.data_new_account['id_user'] = id_user
        return self

    def get_data_new_account_data(self):
        return self.data_new_account


account_service = AccountService()
