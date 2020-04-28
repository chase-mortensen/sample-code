from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
        path('', views.main, name='main'),
        path('bio/', views.bio, name='bio'),
        path('tech/', views.tech, name='tech'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

