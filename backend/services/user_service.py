from fastapi import HTTPException, status

from auth.security import hash_password, verify_password, create_access_token
from models.user_model import UserUloga
from repositories.user_repository import UserRepository


class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    def register_user(self, ime_prezime: str, email: str, password: str):
        existing_user = self.repo.get_by_email(email)
        if existing_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Već postoji korisnik sa tim emailom.")
        
        print(repr(password), len(password), len(password.encode("utf-8")))
        user = self.repo.create_user(
            ime_prezime=ime_prezime,
            email=email,
            password_hash=hash_password(password),
            uloga=UserUloga.USER,
        )

        token = create_access_token({
            "sub": str(user.id),
            "role": user.uloga.value,
        })

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": user,
        }

    def login_user(self, email: str, password: str):
        user = self.repo.get_by_email(email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Neispravni podaci"
            )

        if not verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Neispravni podaci"
            )

        token = create_access_token({
            "sub": str(user.id),
            "role": user.uloga.value,
        })

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": user,
        }