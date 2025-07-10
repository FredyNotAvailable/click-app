from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import ClickPredictor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://click-app-ai.onrender.com"],  # Cambia "*" por ["https://tu-frontend.com"] cuando estés en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

predictor = ClickPredictor()

class PredictRequest(BaseModel):
    days_ahead: int

@app.post("/predict")
def predict_clicks(data: PredictRequest):
    prediction = predictor.predict(data.days_ahead)
    return {"predicted_clicks": prediction}
