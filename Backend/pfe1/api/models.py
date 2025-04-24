from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

import datetime




class etudiant(models.Model):  
    matricul = models.IntegerField(unique=True)  # Ensure uniqueness if required  
    password = models.CharField(max_length=100)  # Removed unique=True  
    name = models.CharField(max_length=100)  

    def __str__(self):  
        return self.name  # Corrected __str__ method

class prof(models.Model):
    profition= models.CharField(max_length=100)
    user= models.ForeignKey(User, on_delete=models.CASCADE, related_name="prof")
    
    

class exam(models.Model):
    date=models.DateTimeField()
    time = models.TimeField(default=datetime.time(12, 0))
    module=models.CharField(max_length=100)
     


class presence(models.Model):
    etudiant=models.ForeignKey(etudiant, on_delete=models.CASCADE, related_name="etudiant",null=True)
    exam=models.ForeignKey(exam, on_delete=models.CASCADE, related_name="exam",null=True)
    is_present=models.BooleanField(default=False)


    