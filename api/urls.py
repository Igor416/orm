from django.urls import path
from . import views

urlpatterns = [
    path('user/', views.UserView.as_view()),
    path('choices/', views.ChoicesView.as_view()),
    path('sale/', views.CreateSaleView.as_view()),
    path('sales/', views.ListSalesView.as_view()),
    path('sale/<pk>/', views.RetrieveSaleView.as_view())
]
