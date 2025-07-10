import numpy as np
from sklearn.linear_model import LinearRegression

class ClickPredictor:
    def __init__(self):
        X = np.array([[1], [2], [3], [4], [5]])
        y = np.array([10, 20, 30, 40, 50])
        self.model = LinearRegression().fit(X, y)

    def predict(self, days_ahead: int):
        X_pred = np.array([[days_ahead]])
        return self.model.predict(X_pred)[0]
