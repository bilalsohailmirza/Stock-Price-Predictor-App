from django.urls import path
from . import views

urlpatterns = [
    path('myView/', views.myView),
    path('data/', views.returnData),
    path('test/<slug:company>/', views.test_logic),
    path('', views.graph),
]