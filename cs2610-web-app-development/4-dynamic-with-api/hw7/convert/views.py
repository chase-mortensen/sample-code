from django.http import HttpResponse
from convert.models import Convert
import json

def getData(request):
    value = request.GET.get('value')
    f = request.GET.get('from')
    to = request.GET.get('to')
    conv = Convert.objects.get(unit=f)
    total = conv.value * float(value)
    
    data = {}
    data['unit'] = to
    data['value'] = total
    jdata = json.dumps(data)
    return HttpResponse(jdata)

def init(request):
    Convert.objects.all().delete()
    this = Convert(unit="lbs", value=14.5833)
    this.save()
    return HttpResponse('init')
    
