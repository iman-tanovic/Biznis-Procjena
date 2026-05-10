import uuid
from sqlalchemy.orm import Session

from models.izvjestaj_model import Izvjestaj
from schemas.izvjestaj_schemas import SaveReportRequest


class IzvjestajRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_user_id(self, user_id: uuid.UUID) -> list[Izvjestaj]:
        return (
            self.db.query(Izvjestaj)
            .filter(Izvjestaj.user_id == user_id)
            .order_by(Izvjestaj.created_at.desc())
            .all()
        )

    def create_izvjestaj(self, user_id: uuid.UUID, payload: SaveReportRequest) -> Izvjestaj:
        report = Izvjestaj(
            user_id=user_id,
            ime_firme=payload.ime_firme,
            kategorija=payload.kategorija,
            pbv=payload.pbv,
            ebitda=payload.ebitda,
            ebit=payload.ebit,
            prodaja=payload.prodaja,
            dug=payload.dug,
            gotovina=payload.gotovina,
            vrijednost_firme=payload.vrijednost_firme,
            vrijednost_kapitala=payload.vrijednost_kapitala,
        )
        self.db.add(report)
        self.db.commit()
        self.db.refresh(report)
        return report