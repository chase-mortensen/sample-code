from django.http import HttpResponse
from time import strftime

def index(request):
    return HttpResponse('Hello World!' + strftime('%c'))



# Create your views here.
