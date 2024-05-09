from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from .models import Stocks
from .logics import generate_graphs, predict, getStockData

# Create your views here.
def myView(request):
    stocks = Stocks.objects.all()
    for stock in stocks:
        pass
    data = [stock.volume for stock in stocks]
    return HttpResponse(f"Test view. {str(data[:10])}")

def graph(request):
    companies = ["AAPL"]
    df = generate_graphs(companies)
    return JsonResponse(df.iloc[1:].head().to_json(), safe=False)
    # return HttpResponse("None")

def returnData(request):
    stocks = Stocks.objects.all()
    closing = [stock.close for stock in stocks]
    print(closing)
    return JsonResponse({"closing": str(closing)})

def test_logic(request, company):
    return predict(company)

def getStocks(request, company):
    return getStockData(company)