from django.db import models

# Create your models here.
class Convert(models.Model):
    unit = models.CharField(max_length=200); #14.5833S
    value = models.FloatField();
    
def __str__(self):
    return '%s, %f' % (self.unit, self.value)