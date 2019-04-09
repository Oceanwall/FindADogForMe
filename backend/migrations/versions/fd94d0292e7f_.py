"""empty message

Revision ID: fd94d0292e7f
Revises: 2fb5e9ff604e
Create Date: 2019-04-08 22:03:21.559686

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fd94d0292e7f'
down_revision = '2fb5e9ff604e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('activity', sa.Column('is_free_string', sa.String(length=1000), nullable=True))
    op.add_column('dog', sa.Column('shelter_name', sa.Unicode(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('dog', 'shelter_name')
    op.drop_column('activity', 'is_free_string')
    # ### end Alembic commands ###