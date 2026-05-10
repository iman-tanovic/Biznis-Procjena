from decimal import Decimal
from numpy import count_nonzero
from fastapi import HTTPException

from repositories.multiplikatori_repository import MultiplikatoriRepository
from schemas.valuation_schemas import MultiplesRequest, MultiplesResponse


class ValuationService:
    def __init__(self, repo: MultiplikatoriRepository):
        self.repo = repo

    def get_industries(self):
        return self.repo.get_all_industries()

    def calculate_multiples(self, payload: MultiplesRequest) -> MultiplesResponse:
        row = self.repo.get_by_industry(payload.kategorija)

        if row is None:
            raise HTTPException(status_code=404, detail="Industrija nije pronađena")

        ev_pbv = row.pbv
        ev_ebitda = row.ev_ebitda
        ev_ebit = row.ev_ebit
        ev_sales = row.ev_sales

        pbv_mul = Decimal(str(payload.PBV)) * ev_pbv
        ebitda_mul = Decimal(str(payload.EBITDA)) * ev_ebitda
        ebit_mul = Decimal(str(payload.EBIT)) * ev_ebit
        sales_mul = Decimal(str(payload.prodaja)) * ev_sales

        br_unesenih = count_nonzero([pbv_mul, ebit_mul, ebitda_mul, sales_mul])

        vrijednost_firme = (
            pbv_mul + ebitda_mul + ebit_mul + sales_mul
        ) / br_unesenih

        vrijednost_kapitala = vrijednost_firme + Decimal(
            str(payload.gotovina - payload.dug)
        )

        if payload.broj_dionica != 0:
            vrijednost_pd = vrijednost_kapitala / Decimal(str(payload.broj_dionica))
        else:
            vrijednost_pd = 0

        zakljucak = f"""Za {payload.ime_firme}, vrijednost firme iznosi {vrijednost_firme:,.2f}.
Nakon prilagodbe za gotovinu i dug, vrijednost kapitala iznosi {vrijednost_kapitala:,.2f}.
EV na osnovu:
PBV: {pbv_mul:,.2f} (multiplikator {ev_pbv:,.2f})
EBITDA: {ebitda_mul:,.2f} (multiplikator {ev_ebitda:,.2f})
EBIT: {ebit_mul:,.2f} (multiplikator {ev_ebit:,.2f})
SALES: {sales_mul:,.2f} (multiplikator {ev_sales:,.2f})
"""

        return MultiplesResponse(
            ime_firme=payload.ime_firme,
            kategorija=payload.kategorija,
            PBV=payload.PBV,
            EBITDA=payload.EBITDA,
            EBIT=payload.EBIT,
            prodaja=payload.prodaja,
            dug=payload.dug,
            gotovina=payload.gotovina,
            vrijednost_firme=vrijednost_firme,
            vrijednost_kapitala=vrijednost_kapitala,
            zakljucak=zakljucak,
            cijena_pd=vrijednost_pd,
        )