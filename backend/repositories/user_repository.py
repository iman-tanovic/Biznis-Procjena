from sqlalchemy.orm import Session
from models.user_model import User, UserUloga


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def verify_user(self, user):
        user.verifikovan = True
        self.db.commit()
        self.db.refresh(user)
        return user

    def get_by_email(self, email: str):
        return self.db.query(User).filter(User.email == email).first()

    def create_user(self, ime_prezime: str, email: str, password_hash: str, uloga: UserUloga = UserUloga.USER):
        user = User(
            ime_prezime = ime_prezime,
            email=email,
            password_hash=password_hash,
            uloga=uloga,
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user