from django.urls import path

from . import views

urlpatterns = [
    path('', views.case_page, name='Case-View'),
    path('Get-Case/', views.get_case),
]