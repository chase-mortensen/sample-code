from django.http import HttpResponse
from time import strftime

from django.template import loader

def bio(request):
    template = loader.get_template('Blog/bio.html')
    context = {
        'time': strftime('%c')
    }  
    return HttpResponse(template.render(context, request))

def main(request):
    template = loader.get_template('Blog/index.html')
    context = {
        'time': strftime('%c')
    }  
    return HttpResponse(template.render(context, request))

def tech(request):
    template = loader.get_template('Blog/tech.html')
    context = {
        'time': strftime('%c')
    }  
    return HttpResponse(template.render(context, request))

# Create your views here.
