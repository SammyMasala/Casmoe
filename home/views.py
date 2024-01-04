from django.shortcuts import render
from django.template import loader
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie 
def home_page(request):    
    context = {}
    return render(request, "home.html", context)

def home_page_editor(request):    
    return render(request, "home_EDITOR.html")