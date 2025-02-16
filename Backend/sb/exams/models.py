from django.db import models

# Create your models here.
from django.db import models



    
class QRCodeData(models.Model):
    data = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.data


from django.contrib.auth.models import User
from django.db import models

class AuthTable(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Links to auth_user
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    address = models.TextField(null=True, blank=True,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.phone_number}"


level_CHOICES=[
    ('l1','L1'),
    ('l2','L2'),
    ('l3','L3'),
    ('m1','M1'),
    ('m2','M2')
]

class subject(models.Model):
    name=  models.CharField(max_length=100,unique=True, null=True)
    level= models.CharField(max_length=20, choices=level_CHOICES,default="l1")



class Exam(models.Model):
    subject= models.ForeignKey(subject, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return self.name





class teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) 
    
    matricul= models.CharField(max_length=15,unique=True, null=True)
    secret_number= models.CharField(max_length=15,unique=True, null=True)




class teach(models.Model):
    subject= models.ForeignKey(subject, on_delete=models.CASCADE)
    teacher= models.ForeignKey(teacher, on_delete=models.CASCADE)

class Student(models.Model):
    name = models.CharField(max_length=100)
    roll_number = models.CharField(max_length=20, unique=True)
    level= models.CharField(max_length=20, choices=level_CHOICES,default="l1")
    def __str__(self):
        return self.name


class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    
    is_present = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student.name} - {self.exam.name}"
