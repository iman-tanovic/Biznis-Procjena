from itsdangerous import (
    URLSafeTimedSerializer,
    BadSignature,
    BadTimeSignature,
    SignatureExpired,
)
from fastapi import HTTPException, status

from core.config import settings


serializer = URLSafeTimedSerializer(
    secret_key=settings.SECRET_KEY,
    salt=settings.EMAIL_VERIFICATION_SALT,
)


def create_url_safe_token(data: dict):
    return serializer.dumps(data)


def decode_url_safe_token(token: str):
    try:
        token_data = serializer.loads(
            token,
            max_age=settings.EMAIL_VERIFICATION_EXPIRE_SECONDS,
        )
        return token_data

    except SignatureExpired:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Verifikacijski link je istekao."
        )

    except (BadSignature, BadTimeSignature):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Nevažeći verifikacijski link."
        )