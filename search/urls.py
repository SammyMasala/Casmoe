from django.urls import path

from . import views

urlpatterns = [
    path('', views.search_page, name='Search-Page'),
    path('Save-Case/', views.save_case),
    path('save/', views.save),
    path('list/', views.list_cases)
]