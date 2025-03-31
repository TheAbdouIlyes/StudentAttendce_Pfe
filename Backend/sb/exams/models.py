

# Create your models here.
from django.db import models



from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone






level_CHOICES=[
    ('l1','L1'),
    ('l2','L2'),
    ('l3','L3'),
    ('m1','M1'),
    ('m2','M2')
]
speciality_choices=[('info','info'),
                    ('physic','physic'),
                    ('gestion','gestion'),
                    ('biology','biology'),
                    ('pharmacy','pharmacy'),
                    ('medcine','medcine')
                    ]
semester_choices=[
    ('s1','S1'),
    ('s2','S2')
]
class subject(models.Model):
    name=  models.CharField(max_length=100,unique=True, null=True)
    level= models.CharField(max_length=20, choices=level_CHOICES,default="l1")
    speciality= models.CharField(max_length=100,choices=speciality_choices, default="info")
    semester= models.CharField(max_length=100,choices=semester_choices, default="s1")
   




class Exam(models.Model):
    subject= models.ForeignKey(subject, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    time= models.TimeField(default=timezone.now)
    amphi=models.CharField(max_length=15,default="ben ba3toch")
   





class teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,default=1) 
    
    matricul= models.CharField(max_length=15,unique=True, null=True)
    secret_number= models.CharField(max_length=15,unique=True, null=True)




class teach(models.Model):
    subject= models.ForeignKey(subject, on_delete=models.CASCADE)
    teacher= models.ForeignKey(teacher, on_delete=models.CASCADE)
    


class Student(models.Model):
    Name = models.OneToOneField(User, on_delete=models.CASCADE)
    matricul= models.CharField(max_length=15,unique=True, null=True)
    roll_number = models.CharField(max_length=20, unique=True)
    level= models.CharField(max_length=20, choices=level_CHOICES,default="l1")
    speciality= models.CharField(max_length=100,choices=speciality_choices, default="info")
    
   

class surveillance(models.Model):
    teacher = models.ForeignKey(teacher, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    
   
   


class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
   

   


