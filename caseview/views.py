from django.http import JsonResponse
from django.shortcuts import render
from search.models import CaseLine

def summary_page(request):    
    return render(request, "summary.html")

def graph_page(request):    
    return render(request, "graph.html")

def case_page(request):    
    return render(request, "line.html")

def get_case(request):
    data = list(CaseLine.objects.all().values())
    return JsonResponse(data, safe=False)
