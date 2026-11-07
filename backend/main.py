from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import get_db

app = FastAPI(
    title="Market-HuB API",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Market-HuB Backend",
        "status": "online"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
    @app.get("/db-test")
def db_test(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {
            "database": "connected",
            "status": "healthy"
        }
    except Exception:
        raise HTTPException(
            status_code=503,
            detail="Database connection failed"
        )
