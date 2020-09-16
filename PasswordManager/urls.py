from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_jwt.views import obtain_jwt_token
from django.conf.urls import url
from django.views.generic import TemplateView
from django.views.generic import RedirectView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-token-auth/', obtain_jwt_token),
    path('account/', include('account.urls')),
    path('pass/', include('pass.urls')),
    #path('notes/', include('notes.urls')),
    #path('cards/', include('cards.urls')),
    #path('location/', include('location.urls')),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
    url('favicon.ico', RedirectView.as_view(url='/static/favicon.ico'), name='favicon')
]
