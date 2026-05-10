from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import CORS_ORIGINS
from controllers.auth_controller import router as auth_router
from controllers.user_controller import router as user_router
from controllers.izvjestaj_controller import router as report_router
from controllers.valuation_controller import router as valuation_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(report_router)
app.include_router(valuation_router)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}