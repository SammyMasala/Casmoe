from django.urls import path

from . import views

urlpatterns = [
    path('', views.home_page, name='Home'),
    path('Home/Editor/', views.home_page_editor, name='Home-Editor'),
]