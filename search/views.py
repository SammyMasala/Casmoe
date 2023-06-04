from django.shortcuts import render
from django.http import HttpResponse

def frontpage(request):
    return HttpResponse('This is the main panel')

