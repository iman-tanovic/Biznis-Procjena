from repositories.user_repository import UserRepository
from services.user_service import UserService


class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_service = UserService(user_repo)

    def login(self, email: str, password: str):
        return self.user_service.login_user(email, password)

    def register(self, ime_prezime: str, email: str, password: str):
        return self.user_service.register_user(
            ime_prezime=ime_prezime,
            email=email,
            password=password,
        )