import uuid
from datetime import datetime
from decimal import Decimal
from typing import Optional

from sqlalchemy import DateTime, Index, Numeric, String, func, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Multiplikatori(Base):
    __tablename__ = "multiplikatori"

    __table_args__ = (
        Index("idx_multiplikatori", "ime_industrije"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )

    ime_industrije: Mapped[str] = mapped_column(String(255), nullable=False)

    pbv: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 4))
    ev_ebitda: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 4))
    ev_ebit: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 4))
    ev_ebit_1_t: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 4))
    ev_sales: Mapped[Optional[Decimal]] = mapped_column(Numeric(12, 4))


    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.current_timestamp(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.current_timestamp(),
        nullable=False,
    )


    