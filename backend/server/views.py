from django.shortcuts import render, HttpResponse

# Create your views here.
def myView(request):
    return HttpResponse("Test view")