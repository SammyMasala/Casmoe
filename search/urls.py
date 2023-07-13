from django.urls import path

from . import views

urlpatterns = [
    path('', views.searchpage, name='Search-Page'),
    path('Save-Case/', views.save_case),
]