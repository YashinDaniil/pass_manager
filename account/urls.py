from django.urls import path, include
from knox import views as knox_views
from .views import *

urlpatterns = [
  path('/', include('knox.urls')),
  path('register/', RegisterAPI.as_view()),
  path('login/', LoginAPI.as_view()),
  path('user/', UserAPI.as_view()),
  path('check_master_pass/', CheckMasterPass.as_view()),
  path('settings/', UpdateSettings.as_view()),
  path('logout/', knox_views.LogoutView.as_view(), name='knox_logout')
]
