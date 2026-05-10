import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY is required")
ALGORITHM = "HS256"

CORS_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]