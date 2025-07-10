from fastapi import FastAPI
from pydantic import BaseModel
from model import ClickPredictor

app = FastAPI()
predictor = ClickPredictor()

class PredictRequest(BaseModel):
    days_ahead: int

@app.post("/predict")
def predict_clicks(data: PredictRequest):
    prediction = predictor.predict(data.days_ahead)
    return {"predicted_clicks": prediction}
