from django.urls import path

from . import views

urlpatterns = [
    path('', views.summary_page_editor, name='Editor-View'),
    path('Summary/', views.summary_page, name='Over-View'),
    path('Line/', views.case_page, name='Case-View'),
    path('Graph/', views.graph_page, name='Graph-View'),
    path('Get-Case/', views.get_case),
    path('Submit-Changes/', views.save_change),
]