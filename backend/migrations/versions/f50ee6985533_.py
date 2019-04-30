"""empty message

Revision ID: f50ee6985533
Revises: e908552befdb
Create Date: 2019-03-19 15:23:39.368921

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "f50ee6985533"
down_revision = "e908552befdb"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "activity", sa.Column("designation", sa.String(length=255), nullable=True)
    )
    op.add_column(
        "activity", sa.Column("image_1", sa.String(length=1000), nullable=True)
    )
    op.add_column(
        "activity", sa.Column("image_2", sa.String(length=1000), nullable=True)
    )
    op.add_column(
        "activity", sa.Column("image_3", sa.String(length=1000), nullable=True)
    )
    op.add_column(
        "activity", sa.Column("image_4", sa.String(length=1000), nullable=True)
    )
    op.drop_column("activity", "image3")
    op.drop_column("activity", "desgination")
    op.drop_column("activity", "image4")
    op.drop_column("activity", "image1")
    op.drop_column("activity", "image2")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "activity",
        sa.Column(
            "image2", sa.VARCHAR(length=1000), autoincrement=False, nullable=True
        ),
    )
    op.add_column(
        "activity",
        sa.Column(
            "image1", sa.VARCHAR(length=1000), autoincrement=False, nullable=True
        ),
    )
    op.add_column(
        "activity",
        sa.Column(
            "image4", sa.VARCHAR(length=1000), autoincrement=False, nullable=True
        ),
    )
    op.add_column(
        "activity",
        sa.Column(
            "desgination", sa.VARCHAR(length=255), autoincrement=False, nullable=True
        ),
    )
    op.add_column(
        "activity",
        sa.Column(
            "image3", sa.VARCHAR(length=1000), autoincrement=False, nullable=True
        ),
    )
    op.drop_column("activity", "image_4")
    op.drop_column("activity", "image_3")
    op.drop_column("activity", "image_2")
    op.drop_column("activity", "image_1")
    op.drop_column("activity", "designation")
    # ### end Alembic commands ###
