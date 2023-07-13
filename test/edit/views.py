from django.http import JsonResponse
from django.shortcuts import render
from search.models import CaseLine

def edit_page(request):
    
    return render(request, "case.html")

def get_case(request):
    data = list(CaseLine.objects.all().values())
    return JsonResponse(data, safe=False)
