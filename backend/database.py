import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv("DATABASE_URL")

engine = (
    create_engine(DATABASE_URL)
    if DATABASE_URL else None
)

SessionLocal = (
    sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine
    )
    if engine else None
)

Base = declarative_base()


def get_db():
    if SessionLocal is None:
        raise RuntimeError("Database is not configured")

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
