from django.shortcuts import render

def viewcase(request):
    return render(request, "case.html")
