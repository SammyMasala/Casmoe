from django.shortcuts import render
from django.template import loader

def home_page(request):    
    context = {}
    return render(request, "home.html", context)

def home_page_editor(request):    
    return render(request, "home_EDITOR.html")