from fastapi import APIRouter, Depends

from core.dependencies import get_current_user
from models.user_model import User
from schemas.user_schemas import UserResponse

router = APIRouter(prefix="/api", tags=["users"])


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user