from repositories.izvjestaj_repository import IzvjestajRepository
from schemas.izvjestaj_schemas import ReportResponse, SaveReportRequest


class IzvjestajService:
    def __init__(self, repo: IzvjestajRepository):
        self.repo = repo

    def get_reports_for_user(self, user_id):
        reports = self.repo.get_by_user_id(user_id)

        result = []
        for report in reports:
            result.append(
                ReportResponse(
                    id=str(report.id),
                    ime_firme=str(report.ime_firme),
                    pbv=str(report.pbv),
                    ebitda=str(report.ebitda),
                    ebit=str(report.ebit),
                    prodaja=str(report.prodaja),
                    dug=str(report.dug),
                    gotovina=str(report.gotovina),
                    vrijednost_firme=str(report.vrijednost_firme),
                    vrijednost_kapitala=str(report.vrijednost_kapitala),
                    datum=report.created_at.isoformat() if report.created_at else None,
                )
            )
        return result

    def create_izvjestaj(self, user_id, payload: SaveReportRequest):
        return self.repo.create_izvjestaj(user_id, payload)