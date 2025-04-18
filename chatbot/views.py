from django.shortcuts import render, redirect
from django.http import HttpResponse
def chathome(request):
    return render(request, 'chatbot.html')

