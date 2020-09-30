from django.urls import path
from .views import *

urlpatterns = [
    path('', CardViewSet.as_view()),
    path('<int:pk>/', SingleCardView.as_view()),
    path('create/', AddCard.as_view()),
    path('delete/', DeleteCard.as_view()),
    path('edit/', EditCard.as_view())
]
