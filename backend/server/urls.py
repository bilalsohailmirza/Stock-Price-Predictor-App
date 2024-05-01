from django.urls import path
from . import views

urlpatterns = [
    path('myView/', views.myView),
    path('', views.graph),
]