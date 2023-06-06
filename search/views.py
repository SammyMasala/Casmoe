from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render

from .models import ExtractedCase

def frontpage(request):
    return render(request, 'index.html')

def extract_case(request):
    if request.method == "POST" and 'data' in request.POST:
        data = request.POST('data')
        ExtractedCase.objects.create(data=data)
        ExtractedCase.save()
        return JsonResponse({"message":"Case Selected"})
    else:
        return JsonResponse({"message":"Invalid Response"}, status=400)
    
def view_case(request):
    case = ExtractedCase.objects.all()
    output = case
    return HttpResponse(output)

