from fastapi import HTTPException, status

from auth.security import hash_password, verify_password, create_access_token
from models.user_model import UserUloga
from repositories.user_repository import UserRepository


class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    def register(self, ime_prezime: str, email: str, password: str):
        existing_user = self.user_repo.get_by_email(email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Već postoji korisnik sa tim emailom."
            )

        user = self.user_repo.create_user(
            ime_prezime=ime_prezime,
            email=email,
            password_hash=hash_password(password),
            uloga=UserUloga.USER,
            verifikovan = False
        )

        access_token = create_access_token({
            "sub": str(user.id),
            "role": user.uloga.value,
        })

        return {
            "access_token": access_token,
            "user": user,
        }
    
    def create_user(self, ime_prezime: str, email: str, password: str):
        existing_user = self.user_repo.get_by_email(email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Već postoji korisnik sa tim emailom."
            )

        user = self.user_repo.create_user(
            ime_prezime=ime_prezime,
            email=email,
            password_hash=hash_password(password),
            uloga=UserUloga.USER,
            verifikovan = False
        )

        return user

    def login(self, email: str, password: str):
        user = self.user_repo.get_by_email(email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Neispravni podaci."
            )
        
        if not user.verifikovan:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Da biste koristili racun morate verifikovati mail."
            )

        if not verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Neispravni podaci."
            )

        access_token = create_access_token({
            "sub": str(user.id),
            "role": user.uloga.value,
        })

        return {
            "access_token": access_token,
            "user": user,
        }