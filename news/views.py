from django.shortcuts import render
from django.http import HttpResponse
def newshome(request):
    return render(request, 'news.html')