from django.urls import path
from .views import *

urlpatterns = [
    path('', PassViewSet.as_view()),
    path('<int:pk>/', SinglePassView.as_view()),
    path('create/', AddPass.as_view()),
    path('delete/', DeletePass.as_view()),
    path('edit/', EditPass.as_view())
]
