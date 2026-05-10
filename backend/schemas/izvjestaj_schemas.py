from pydantic import BaseModel, Field


class SaveReportRequest(BaseModel):
    ime_firme: str = Field(min_length=1, max_length=255)
    kategorija: str = Field(min_length=1, max_length=255)
    pbv: float = Field(gt=0)
    ebitda: float = Field(gt=0)
    ebit: float = Field(gt=0)
    prodaja: float = Field(gt=0)
    dug: float = Field(ge=0, default=0)
    gotovina: float = Field(ge=0, default=0)
    vrijednost_firme: float
    vrijednost_kapitala: float


class ReportResponse(BaseModel):
    id: str
    ime_firme: str
    pbv: str
    ebitda: str
    ebit: str
    prodaja: str
    dug: str
    gotovina: str
    vrijednost_firme: str
    vrijednost_kapitala: str
    datum: str | None

    class Config:
        from_attributes = True