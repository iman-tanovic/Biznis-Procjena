from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from controllers.auth_controller import router as auth_router
from controllers.user_controller import router as user_router
from controllers.izvjestaj_controller import router as izvjestaj_router
from controllers.valuation_controller import router as valuation_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(valuation_router)
app.include_router(izvjestaj_router)



@app.get("/")
def root():
    return {"message": "API radi."}