from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.dependencies import get_current_user
from database import get_db
from models.user_model import User
from repositories.izvjestaj_repository import IzvjestajRepository
from schemas.izvjestaj_schemas import ReportResponse, SaveReportRequest
from services.izvjestaj_service import IzvjestajService

router = APIRouter(prefix="/api/reports", tags=["reports"])


def get_report_service(db: Session = Depends(get_db)) -> IzvjestajService:
    return IzvjestajService(IzvjestajRepository(db))


@router.get("", response_model=List[ReportResponse])
def get_reports(
    current_user: User = Depends(get_current_user),
    service: IzvjestajService = Depends(get_report_service),
):
    return service.get_reports_for_user(current_user.id)


@router.post("")
def create_report(
    payload: SaveReportRequest,
    current_user: User = Depends(get_current_user),
    service: IzvjestajService = Depends(get_report_service),
):
    return service.create_izvjestaj(current_user.id, payload)