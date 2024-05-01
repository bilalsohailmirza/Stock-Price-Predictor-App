from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from .models import Stocks
from .logics import generate_graphs
import json

# Create your views here.
def myView(request):
    stocks = Stocks.objects.all()
    data = [stock.volume for stock in stocks]
    return HttpResponse(f"Test view. {str(data[:10])}")

def graph(request):
    companies = ["AAPL"]
    df = generate_graphs(companies)
    return JsonResponse(df.iloc[1:].head().to_json(), safe=False)
    # return HttpResponse("None")