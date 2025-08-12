"""Remove Item model and drop item table

Revision ID: f6a1b2c3d4e5
Revises: 1a31ce608336
Create Date: 2025-08-11 00:00:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "f6a1b2c3d4e5"
down_revision = "1a31ce608336"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Drop the item table if it exists
    op.drop_table("item")


def downgrade() -> None:
    # Recreate the item table with the latest known schema
    op.create_table(
        "item",
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("description", sa.String(length=255), nullable=True),
        sa.Column("id", sa.dialects.postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("owner_id", sa.dialects.postgresql.UUID(as_uuid=True), nullable=False),
        sa.ForeignKeyConstraint(["owner_id"], ["user.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )

