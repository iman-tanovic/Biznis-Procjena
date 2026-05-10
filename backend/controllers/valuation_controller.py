from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from repositories.multiplikatori_repository import MultiplikatoriRepository
from schemas.valuation_schemas import MultiplesRequest, MultiplesResponse
from services.valuation_service import ValuationService

router = APIRouter(prefix="/api", tags=["valuation"])


def get_valuation_service(db: Session = Depends(get_db)) -> ValuationService:
    return ValuationService(MultiplikatoriRepository(db))


@router.get("/industries", response_model=list[str])
def get_industries(
    service: ValuationService = Depends(get_valuation_service),
):
    return service.get_industries()


@router.post("/valuation/multiples", response_model=MultiplesResponse)
def calculate_multiples_valuation(
    payload: MultiplesRequest,
    service: ValuationService = Depends(get_valuation_service),
):
    return service.calculate_multiples(payload)