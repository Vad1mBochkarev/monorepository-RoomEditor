from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

# DATABASE_URL = "postgresql://postgres:StrongPassword01@db:5432/RoomEditor"
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:StrongPassword01@localhost:5434/RoomEditor")

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()