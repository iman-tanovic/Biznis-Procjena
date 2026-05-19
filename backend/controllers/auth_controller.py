from fastapi import APIRouter, Depends, Response, status, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from services.auth_service import AuthService
from services.user_service import UserService
from core.dependencies import get_current_user
from models.user_model import User
from repositories.user_repository import UserRepository
from schemas.auth_schemas import RegisterRequest, LoginRequest, MessageResponse, UserResponse

from src.mail import mail, create_message
from schemas.auth_schemas import EmailModel, RegisterRequest
from core.config import settings
from auth.utils import create_url_safe_token, decode_url_safe_token



router = APIRouter(prefix="/api/auth", tags=["auth"])

COOKIE_NAME = "access_token"
COOKIE_MAX_AGE = 60 * 60 * 24


def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    user_repo = UserRepository(db)
    return AuthService(user_repo)

def set_auth_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        secure=False,      # stavi True na production HTTPS
        samesite="lax",
        max_age=COOKIE_MAX_AGE,
        expires=COOKIE_MAX_AGE,
        path="/",
    )

def clear_auth_cookie(response: Response) -> None:
    response.delete_cookie(
        key=COOKIE_NAME,
        path="/",
        samesite="lax",
        secure=False,      # stavi True na production HTTPS
        httponly=True,
    )



@router.post("/login", response_model=UserResponse)
def login(
    payload: LoginRequest,
    response: Response,
    service: AuthService = Depends(get_auth_service),
):
    result = service.login(
        email=payload.email,
        password=payload.password,
    )

    set_auth_cookie(response, result["access_token"])
    return result["user"]

@router.post("/logout", response_model=MessageResponse)
def logout(response: Response):
    clear_auth_cookie(response)
    return {"message": "Uspješno ste odjavljeni."}

@router.get("/me", response_model=UserResponse)
def me(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/send_mail")
async def send_mail(emails: EmailModel):
    emails = emails.addresses

    html = "<h1>Welcome to the app</h1>"
    subject = "Welcome to our app"

    message = create_message(recipients=emails, subject=subject, body=html)
    await mail.send_message(message)

    return {"message": "Email sent successfully"}

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user_account(
    user_data: RegisterRequest,
    db: Session = Depends(get_db),
):
    user_repo = UserRepository(db)
    user_service = UserService(user_repo)

    if user_service.existing_user(user_data.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Korisnik sa ovim emailom već postoji."
        )

    new_user = user_service.register_user(
        ime_prezime=user_data.ime_prezime,
        email=user_data.email,
        password=user_data.password,
    )

    token = create_url_safe_token({"email": user_data.email})
    link = f"http://{settings.DOMAIN}/verify/{token}"

    html_message = f"""
    <h1>Verify your Email</h1>
    <p>Please click this <a href="{link}">link</a> to verify your email</p>
    """

    message = create_message(
        recipients=[user_data.email],
        subject="Verify your email",
        body=html_message,
    )

    await mail.send_message(message)

    return {
        "message": "Account created! Check email to verify your account.",
        "user": new_user,
    }

@router.get("/verify/{token}", status_code=status.HTTP_200_OK)
def verify_user_account(
    token: str,
    db: Session = Depends(get_db),
):
    user_repo = UserRepository(db)
    user_service = UserService(user_repo)

    token_data = decode_url_safe_token(token)

    if not token_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Nevažeći ili istekli verifikacijski token."
        )

    user_email = token_data.get("email")
    if not user_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Token ne sadrži email."
        )

    user_service.verify_user(user_email)

    return {"message": "Račun je uspješno verifikovan."}
