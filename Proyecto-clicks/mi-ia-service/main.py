from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import ClickPredictor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://click-app-frontend.onrender.com"],  # Cambiar en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

predictor = ClickPredictor()

class PredictRequest(BaseModel):
    days_ahead: int
    current_clicks: int

@app.post("/predict")
def predict_clicks(data: PredictRequest):
    print(f"Recibido en /predict: days_ahead={data.days_ahead}, current_clicks={data.current_clicks}")
    days_ahead = data.days_ahead
    current_clicks = data.current_clicks
    prediction = predictor.predict(days_ahead, current_clicks)
    return {"predicted_clicks": prediction}
