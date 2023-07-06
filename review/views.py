from django.http import JsonResponse
from django.shortcuts import render
from edit.models import Changes

def review_page(request):    
    return render(request, "review.html")

def get_changes(request):
    if request.method == "GET":
        data = list(Changes.objects.all().values())
        return JsonResponse(data, safe=False)
