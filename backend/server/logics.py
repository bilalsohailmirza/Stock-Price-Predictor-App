import matplotlib.pyplot as plt
from django_pandas.io import read_frame
from .models import Stocks

def generate_graphs(companies: list[str]):
    for company in companies:
        stocks = Stocks.objects.filter(name=company)
        df = read_frame(stocks)
        print(df.info())
        return df