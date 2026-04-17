from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from app.core.database import engine, get_db
from app.models import Base
from app.api.status import router as api_status
from app.api.users import router as users_router
from app.api.furniture import router as furniture_router
from app.api.projects import router as projects_router
from seed_data import seed_database

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Room Editor API")


# Заполнение базы данных примерами при запуске приложения.
@app.on_event("startup")
async def seed_data_on_startup():
    db = next(get_db())
    seed_database(db)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_status)
app.include_router(users_router)
app.include_router(furniture_router)
app.include_router(projects_router)


