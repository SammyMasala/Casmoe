from django.urls import path

from . import views
from search import views as search_views

urlpatterns = [
    path('', views.summary_page_editor, name='Editor-View'),
    path('Summary/<str:case_id>', views.summary_page, name='Over-View'),
    path('Line/<str:case_id>', views.case_page, name='Case-View'),
    path('Graph/<str:case_id>', views.graph_page, name='Graph-View'),
    path('Get-Case/<str:case_id>', search_views.get_case),
    path('Submit-Changes/', views.save_change),
]