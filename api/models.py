from django.db import models

# Create your models here.

class Task(models.Model):
  title = models.CharField(max_length=200)
  #date = models.DateTimeField(null= True,blank=True)
  label = models.CharField(max_length=200,default=None, blank=True, null=True)
  completed = models.BooleanField(default=False, blank=True, null=True)
      
  def __str__(self):
    return self.title