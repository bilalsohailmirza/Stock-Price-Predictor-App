import matplotlib.pyplot as plt
import numpy as np
from django_pandas.io import read_frame
from django.http import JsonResponse
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
        df = read_frame(stocks)
        print(df.info())
        return df

def predict(company: str):
    companies = ["AAPL", "AMZN", "CSCO", "GE", "IBM", "GOOG", "MSFT"]

    if company not in companies:
        return JsonResponse({"message": "Invalid company name."})
    index = companies.index(company)

    regressor = Sequential()
    checkpoint_path = os.path.join(os.path.dirname(__file__), "checkpoint")
    with open(os.path.join(checkpoint_path, "checkpoint.pkl"), "rb") as f:
        regressor: Sequential = pickle.load(f)
    scaler = load_scaler()
    index = 0

    # stocks = Stocks.objects.all().order_by("date")
    stocks = Stocks.objects.filter(name=company).order_by("date")
    closing = [stock.close for stock in stocks]
    closing_true = np.array(closing[-60:])
    closing_test = scaler[companies[index]].fit_transform(closing_true.reshape(-1, 1))
    closing_test = np.array(closing_test).reshape(-1, 60, 1)

    print(closing_test.shape)
    print(closing_test)
    predicted_values = []

    for i in range(30):
        y_pred = scaler[companies[index]].inverse_transform(regressor.predict(closing_test))
        predicted_values.append(y_pred[0][0])
        scaled_predicted_value = scaler[companies[index]].transform(y_pred.reshape(1,-1))
        print(y_pred, scaled_predicted_value)

        new_array = list(closing_test.flatten())[1:]
        new_array.append(scaled_predicted_value[0][0])
        closing_test = np.array(new_array).reshape(1, -1, 1)

    # print(y_true[:10])
    # print(len(y_pred))
    # print(y_pred)
    print(len(predicted_values))
    print(predicted_values)

    i = 0
    while i < len(stocks):
        if stocks[i].date.year == 2015:
            break
        i += 1
    assert i < len(stocks), "How the hell did we even get here? Stock mein hai hi nhi kya 2015?"
    real_values = closing[i:]

    real_values = [str(value) for value in real_values]
    predicted_values = [str(value) for value in predicted_values]
    return JsonResponse({"real": real_values, "predicted": predicted_values})
    # return JsonResponse({"real": 0, "predicted": 0})


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