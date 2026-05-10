from pydantic import BaseModel, Field


class MultiplesRequest(BaseModel):
    ime_firme: str = Field(min_length=1, max_length=255)
    kategorija: str = Field(min_length=1, max_length=255)
    PBV: float = Field(ge=0)
    EBITDA: float = Field(ge=0)
    EBIT: float = Field(ge=0)
    prodaja: float = Field(ge=0)
    dug: float = Field(ge=0, default=0)
    gotovina: float = Field(ge=0, default=0)
    broj_dionica: float = Field(ge=0, default=0)


class MultiplesResponse(BaseModel):
    ime_firme: str = Field(min_length=1, max_length=255)
    kategorija: str
    PBV: float = Field(ge=0)
    EBITDA: float = Field(ge=0)
    EBIT: float = Field(ge=0)
    prodaja: float = Field(ge=0)
    dug: float = Field(ge=0, default=0)
    gotovina: float = Field(ge=0, default=0)
    vrijednost_firme: float
    vrijednost_kapitala: float
    zakljucak: str
    cijena_pd: float