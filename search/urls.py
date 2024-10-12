from django.urls import path

from . import views

urlpatterns = [
    path('', views.search_page, name='Search-Page'),
    path('Editor/', views.search_page_editor, name='Search-Page'),
    path('Save-Case/', views.save_case),
]