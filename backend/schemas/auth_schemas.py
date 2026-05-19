from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID


class RegisterRequest(BaseModel):
    ime_prezime: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class MessageResponse(BaseModel):
    message: str


class UserResponse(BaseModel):
    id: UUID
    ime_prezime: str
    email: EmailStr
    uloga: str
    aktivan: bool
    created_at: datetime

    class Config:
        from_attributes = True


class EmailModel(BaseModel):
    addresses : list[str]