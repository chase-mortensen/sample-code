from django.urls import path

from . import views

urlpatterns = [
        path('get/', views.getData, name='getData'),
        path('', views.init, name='init'),
]

