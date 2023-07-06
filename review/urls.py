from django.urls import path

from . import views

urlpatterns = [
    path('', views.review_page, name='Review'),
    path('Get-Changes/', views.get_changes),
]