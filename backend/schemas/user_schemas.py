from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, EmailStr
from models.user_model import UserUloga


class RegisterRequest(BaseModel):
    ime_prezime: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: UUID
    ime_prezime: str
    email: EmailStr
    uloga: UserUloga
    aktivan: bool
    created_at: datetime

    class Config:
        from_attributes = True


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse