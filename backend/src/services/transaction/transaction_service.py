from services.transaction._transaction_service import _TransactionService
from models.transaction_model import Transaction


class TransactionService(_TransactionService):
    id = None
    id_account_origin = None
    id_account_destination = None
    data_new_transaction: dict = {
        'id_account_origin': '',
        'id_account_destination': '',
        'amount': 0,
    }

    def get_by_id_account_destination(self):
        where = [
            Transaction.id_account_destination == self.id_account_destination,
            Transaction.deleted_at == None
        ]
        return self.get(where=where)

    def get_by_id_account_origin(self):
        where = [
            Transaction.id_account_origin == self.id_account_origin,
            Transaction.deleted_at == None
        ]
        return self.get(where=where)

    def get_by_id(self):
        where = [
            Transaction.id == self.id,
            Transaction.deleted_at == None
        ]
        return self.get(where=where)

    def set_id(self, id: int):
        self.id = id
        return self

    def set_id_account_origin(self, id_account_origin: int):
        self.id_account_origin = id_account_origin
        return self

    def set_id_account_destination(self, id_account_destination: int):
        self.id_account_destination = id_account_destination
        return self

    def set_data_new_transaction(self, data_new_transaction: dict):
        self.data_new_transaction.update(data_new_transaction)
        return self


transaction_service = TransactionService()
