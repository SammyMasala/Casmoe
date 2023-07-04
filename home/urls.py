from django.urls import path

from . import views

urlpatterns = [
    path('', views.frontpage, name='FrontPage'),
    path('Save-Case/', views.save_case),
]