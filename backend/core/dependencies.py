from fastapi import Cookie, Depends, HTTPException, status
from jose import JWTError, ExpiredSignatureError
from sqlalchemy.orm import Session

from database import get_db
from auth.security import decode_access_token
from models.user_model import User

COOKIE_NAME = "access_token"

def get_current_user(
    access_token: str | None = Cookie(default=None, alias=COOKIE_NAME),
    db: Session = Depends(get_db),
):
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Niste prijavljeni."
        )

    try:
        payload = decode_access_token(access_token)
        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Neispravan token: nema sub."
            )

    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token je istekao."
        )

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Neispravan token."
        )

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Korisnik nije pronađen."
        )

    return user