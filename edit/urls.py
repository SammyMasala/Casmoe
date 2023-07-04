from django.urls import path

from . import views

urlpatterns = [
    path('', views.edit_page, name='Edit-View'),
    path('Get-Case/', views.get_case),
    path('Submit-Changes/', views.save_change),
]