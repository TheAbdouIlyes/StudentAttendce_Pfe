from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Student, Exam, Attendance

admin.site.register(Student)
admin.site.register(Exam)
admin.site.register(Attendance)
