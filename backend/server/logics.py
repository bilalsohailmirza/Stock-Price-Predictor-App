import matplotlib.pyplot as plt
import numpy as np
from rest_framework import serializers
from django_pandas.io import read_frame
from django.http import JsonResponse
from .models import Stocks
from sklearn.preprocessing import MinMaxScaler
from keras.layers import Dense, LSTM, Dropout, GRU, Bidirectional
from keras.optimizers import SGD
from keras.models import Sequential
import pickle
import os
import datetime

def generate_graphs(companies: list[str]):
    for company in companies:
        stocks = Stocks.objects.filter(name=company)
        df = read_frame(stocks)
        print(df.info())
        return df
    
def getStockData(company: str):
    companies = ["AAPL", "AMZN", "CSCO", "GE", "IBM", "GOOG", "MSFT"]
    if company not in companies:
        return JsonResponse({"message": "Invalid company name."})
    index = companies.index(company)

    stocks = Stocks.objects.filter(name=company)
    json_data = []
    for stock in stocks[:1000]:
        d = {}
        d["id"] = stock.id
        d["name"] = stock.name
        d["date"] = str(stock.date)
        d["open"] = stock.open
        d["high"] = stock.high
        d["low"] = stock.low
        d["close"] = stock.close
        d["adj_close"] = stock.adj_close
        d["volume"] = stock.volume
        # d.append(stock.id)
        # d.append(stock.name)
        # d.append(str(stock.date))
        # d.append(stock.open)
        # d.append(stock.high)
        # d.append(stock.low)
        # d.append(stock.close)
        # d.append(stock.adj_close)
        # d.append(stock.volume)
        json_data.append(d)

    print(json_data)    
    return JsonResponse(json_data, safe=False)
    
def load_model():
    global regressor
    regressor = Sequential()
    checkpoint_path = os.path.join(os.path.dirname(__file__), "checkpoint")
    with open(os.path.join(checkpoint_path, "checkpoint.pkl"), "rb") as f:
        regressor = pickle.load(f)

def load_scaler():
    global scaler
    companies = ["AAPL", "AMZN", "CSCO", "GE", "IBM", "GOOG", "MSFT"]

    filepath = os.path.join(os.path.dirname(__file__), "scalers")
    files = os.listdir(filepath)
    scaler = {}

    for i in range(len(files)):
        with open(os.path.join(filepath, files[i]), "rb") as f:
            scaler[companies[i]] = pickle.load(f)
    # return scaler

def predict(company: str):
    companies = ["AAPL", "AMZN", "CSCO", "GE", "IBM", "GOOG", "MSFT"]

    if company not in companies:
        return JsonResponse({"message": "Invalid company name."})
    index = companies.index(company)

    # regressor = Sequential()
    # checkpoint_path = os.path.join(os.path.dirname(__file__), "checkpoint")
    # with open(os.path.join(checkpoint_path, "checkpoint.pkl"), "rb") as f:
    #     regressor: Sequential = pickle.load(f)
    # scaler = load_scaler()
    global regressor
    global scaler
    index = 0

    # stocks = Stocks.objects.all().order_by("date")
    stocks = Stocks.objects.filter(name=company).order_by("date")
    closing = [stock.close for stock in stocks]
    # closing_dates = [(stock.close, stock.date) for stock in stocks]
    dates = stocks.values_list('date', flat=True).distinct()

    print("Dates size = ", len(dates))
    closing_true = np.array(closing[-60:])
    closing_test = scaler[companies[index]].fit_transform(closing_true.reshape(-1, 1))
    closing_test = np.array(closing_test).reshape(-1, 60, 1)

    print(closing_test.shape)
    print(closing_test)
    predicted_values = []

    final_date = stocks[len(stocks) - 1].date

    for i in range(0, 100):
        y_pred = scaler[companies[index]].inverse_transform(regressor.predict(closing_test))
        new_date = final_date + datetime.timedelta(days=i)
        predicted_values.append({"time": str(new_date), "value": str(y_pred[0][0])})
        scaled_predicted_value = scaler[companies[index]].transform(y_pred.reshape(1,-1))
        print(y_pred, scaled_predicted_value)

        new_array = list(closing_test.flatten())[1:]
        new_array.append(scaled_predicted_value[0][0])
        closing_test = np.array(new_array).reshape(1, -1, 1)

    print(closing[-20:])

    print(len(predicted_values))
    print(predicted_values)

    # i = 0
    # while i < len(dates):
    #     if dates[i].year == 2015:
    #         break
    #     i += 1
    # assert i < len(stocks), "How the hell did we even get here? Stock mein hai hi nhi kya 2015?"
    # real_values = closing[i:]
    values = 3000
    real_values = []
    # for k in range(i, min(len(dates), len(closing)) - 1):
    #     if (i + k >= min(len(dates), len(closing))):
    #         break
    #     real_values.append({"time": str(dates[i+k]), "value": str(closing[i+k])})
    for i in range(values):
        real_values.append({"time": str(dates[len(dates) - values + i]), "value": str(closing[len(closing) - values + i])})
    

    print("10 values")
    print()
    print(real_values)
    # print(predicted_values[:10])

    # real_values = [str(value) for value in real_values]
    # predicted_values = [str(value) for value in predicted_values]
    # print(JsonResponse({"real": real_values, "predicted": predicted_values}))
    
    return JsonResponse({"real": real_values, "predicted": predicted_values})