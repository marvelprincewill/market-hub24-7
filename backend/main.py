from fastapi import FastAPI

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
