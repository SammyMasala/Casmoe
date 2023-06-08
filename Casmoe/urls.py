"""
URL configuration for Casmoe project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

from search import views as search_views
from edit import views as edit_views

urlpatterns = [
    path('', search_views.frontpage),
    path('save-case/', search_views.save_case, name="save-case"),
    path('case.html/', edit_views.view_case, name="view-case"),
    path('view-case/', search_views.view_case),
    path('admin/', admin.site.urls),
]
