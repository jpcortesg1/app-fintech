"""empty message

Revision ID: 50130139e35d
Revises: 5abf4c9be4cd
Create Date: 2023-09-21 23:15:52.193470

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '50130139e35d'
down_revision = '5abf4c9be4cd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('account', schema=None) as batch_op:
        batch_op.add_column(sa.Column('card_number', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('card_cvv', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('card_expiration_date', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('card_holder_name', sa.String(), nullable=False))
        batch_op.alter_column('number',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('account', schema=None) as batch_op:
        batch_op.alter_column('number',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.drop_column('card_holder_name')
        batch_op.drop_column('card_expiration_date')
        batch_op.drop_column('card_cvv')
        batch_op.drop_column('card_number')

    # ### end Alembic commands ###
