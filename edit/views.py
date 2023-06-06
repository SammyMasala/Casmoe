from django.shortcuts import render

def view_case(request):
    return render(request, "case.html")
