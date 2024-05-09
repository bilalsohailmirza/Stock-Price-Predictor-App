import matplotlib.pyplot as plt
import numpy as np
from django_pandas.io import read_frame
from .models import Stocks
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM, Dropout, GRU, Bidirectional
from keras.optimizers import SGD
from keras.models import load_model
from sklearn.metrics import mean_squared_error
from silence_tensorflow import silence_tensorflow
import pickle
import os

def generate_graphs(companies: list[str]):
    for company in companies:
        stocks = Stocks.objects.filter(name=company)
        # df = read_frame(stocks)
        # print(df.info())
        # return df

def predict():
    companies = ["AAPL", "AMZN", "CSCO", "GE", "IBM", "GOOG", "MSFT"]

    regressor = Sequential()
    checkpoint_path = os.path.join(os.path.dirname(__file__), "checkpoint")
    # regressor.load_weights(os.path.join(checkpoint_path, "my_checkpoint"))
    # regressor = load_model(os.path.join(checkpoint_path, "stock_model.keras"))
    with open(os.path.join(checkpoint_path, "checkpoint.pkl"), "rb") as f:
        regressor: Sequential = pickle.load(f)
    stocks = Stocks.objects.all()
    closing = [stock.close for stock in stocks]
    true_closing = np.array(closing)
    closing = np.array(closing[-60:]).reshape(-1, 60, 1)
    print(len(closing))
    print(closing)

    scaler = load_scaler()
    i = 0
    y_true = scaler[companies[i]].inverse_transform(true_closing.reshape(-1, 1))
    y_pred = scaler[companies[i]].inverse_transform(regressor.predict(closing))


    # print(y_true[:10])
    # print(y_pred[:10])
    print(len(y_true))
    print(len(y_pred))

    MSE = sum(abs(i - j) for i, j in zip(y_true, y_pred))
    print(MSE)


def load_scaler():
    companies = ["AAPL", "AMZN", "CSCO", "GE", "IBM", "GOOG", "MSFT"]

    filepath = os.path.join(os.path.dirname(__file__), "scalers")
    files = os.listdir(filepath)
    scaler: dict[int, MinMaxScaler] = {}

    for i in range(len(files)):
        with open(os.path.join(filepath, files[i]), "rb") as f:
            scaler[companies[i]] = pickle.load(f)
    # print(type(scaler))
    return scaler