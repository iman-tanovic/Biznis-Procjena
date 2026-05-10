from fastapi import APIRouter, Depends, Response
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database import get_db
from schemas.user_schemas import LoginRequest, RegisterRequest, AuthResponse
from repositories.user_repository import UserRepository
from services.auth_service import AuthService

router = APIRouter(prefix="/api/auth", tags=["auth"])


def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    return AuthService(UserRepository(db))


@router.post("/login")
def login(
    payload: LoginRequest,
    service: AuthService = Depends(get_auth_service),
):
    result = service.login(payload.email, payload.password)

    response = JSONResponse(
        content={
            "message": "Login uspješan",
            "user": {
                "id": str(result["user"].id),
                "email": result["user"].email,
                "uloga": result["user"].uloga.value,
            },
        }
    )

    response.set_cookie(
        key="access_token",
        value=result["access_token"],
        httponly=True,
        secure=False,
        samesite="lax",
        path="/",
    )

    return response


##@router.post("/register", response_model=AuthResponse)
##def register(
##    payload: RegisterRequest,
##    service: AuthService = Depends(get_auth_service),
##):
##    return service.register(
##        ime_prezime=payload.ime_prezime,
##        email=payload.email,
##        password=payload.password,
##    )


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        path="/",
        httponly=True,
        samesite="lax",
        secure=False,
    )
    return {"message": "Uspješno ste odjavljeni."}