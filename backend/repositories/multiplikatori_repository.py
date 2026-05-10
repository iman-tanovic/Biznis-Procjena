from sqlalchemy.orm import Session

from models.multiplikator_model import Multiplikatori


class MultiplikatoriRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_industry(self, ime_industrije: str) -> Multiplikatori | None:
        return (
            self.db.query(Multiplikatori)
            .filter(Multiplikatori.ime_industrije.ilike(ime_industrije))
            .first()
        )

    def get_all_industries(self) -> list[str]:
        industries = (
            self.db.query(Multiplikatori.ime_industrije)
            .distinct()
            .order_by(Multiplikatori.ime_industrije.asc())
            .all()
        )
        return [industry[0] for industry in industries]