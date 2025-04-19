from django.shortcuts import render
from django.http import HttpResponse
def finhome(request):
    return render(request, 'finance.html')

