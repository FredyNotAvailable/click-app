import numpy as np
from sklearn.linear_model import LinearRegression

class ClickPredictor:
    def __init__(self):
        # Ejemplo: X tiene dos variables, días adelante y clicks actuales
        X = np.array([[1, 10], [2, 20], [3, 30], [4, 40], [5, 50]])
        y = np.array([10, 20, 30, 40, 50])
        self.model = LinearRegression().fit(X, y)

    def predict(self, days_ahead: int, current_clicks: int):
        X_pred = np.array([[days_ahead, current_clicks]])
        return self.model.predict(X_pred)[0]
