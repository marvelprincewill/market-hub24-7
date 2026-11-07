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
