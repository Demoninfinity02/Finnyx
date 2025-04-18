from django.shortcuts import render
from django.http import HttpResponse
def inhome(request):
    return render(request, 'insight.html')
# Create your views here.
