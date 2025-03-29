from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from .models import teacher,Student


class matriculsecretAuthBackend(BaseBackend):
    def authenticate(self, request, matricul=None, secret_number=None):
        try:
           # user = User.objects.get(email=email)
            Teacher =teacher.objects.get(matricul=matricul, secret_number=secret_number)
            return Teacher.user  # Authentication successful
        except (User.DoesNotExist, teacher.DoesNotExist):
            return None  # Authentication failed
        
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
        

from .models import Student

class matriculsecretAuthBackendetud(BaseBackend):
    def authenticate(self, request, matricul=None, roll_number=None):
        try:
           Student1 =Student.objects.get(matricul=matricul, roll_number=roll_number)
           return Student1.Name # Authentication successful
        except (User.DoesNotExist, Student.DoesNotExist):
            return None  # Authentication failed
        
    def get_user(self, Name_id):
        try:
            return User.objects.get(pk=Name_id)
        except User.DoesNotExist:
            return None
