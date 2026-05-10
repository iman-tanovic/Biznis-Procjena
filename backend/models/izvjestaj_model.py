import uuid
from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, Index, Numeric, String, func, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Izvjestaj(Base):
    __tablename__ = "izvjestaji"

    __table_args__ = (
        Index("idx_izvjestaji_user_id", "user_id"),
        Index("idx_izvjestaji_created_at", "created_at"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        nullable=False,
    )

    ime_firme: Mapped[str] = mapped_column(String(255), nullable=False)
    kategorija: Mapped[str] = mapped_column(String(255), nullable=False)

    pbv: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False)
    ebitda: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False)
    ebit: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False)
    prodaja: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False)
    dug: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False, server_default=text("0"))
    gotovina: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False, server_default=text("0"))

    vrijednost_firme: Mapped[Decimal] = mapped_column(Numeric(18, 2), nullable=False)
    vrijednost_kapitala: Mapped[Decimal] = mapped_column(Numeric(18, 2), nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.current_timestamp(),
        nullable=False,
    )

    