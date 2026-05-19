import enum
import uuid
from datetime import datetime

from sqlalchemy import String, DateTime, Boolean, Enum, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from uuid import uuid4


from database import Base


class UserUloga(str, enum.Enum):
    USER = "USER"
    ADMIN = "ADMIN"


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
    UUID(as_uuid=True),
    primary_key=True,
    default=uuid4
)
    ime_prezime: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    uloga: Mapped[UserUloga] = mapped_column(Enum(UserUloga, name="user_uloga_enum"), nullable=False, default=UserUloga.USER)
    aktivan: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    verifikovan: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)