from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.frontpage, name='FrontPage'),
    path('Save-Case/', views.save_case),
]