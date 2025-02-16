from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from .models import AuthTable,teacher

class EmailPhoneAuthBackend(BaseBackend):
    def authenticate(self, request, address=None, phone_number=None):
        try:
           # user = User.objects.get(email=email)
            auth_table = AuthTable.objects.get(address=address, phone_number=phone_number)
            return auth_table.user  # Authentication successful
        except (User.DoesNotExist, AuthTable.DoesNotExist):
            return None  # Authentication failed

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
# class matriculemailAuthBackend(BaseBackend):
#     def authenticate(self, request, matricul=None, secret_number=None):
#         try:
#            # user = User.objects.get(email=email)
#             teacher = teacher.objects.get(matricul=matricul, secret_number=secret_number)
#             return teacher.user  # Authentication successful
#         except (User.DoesNotExist, teacher.DoesNotExist):
#             return None  # Authentication failed
        
#     def get_user(self, user_id):
#         try:
#             return User.objects.get(pk=user_id)
#         except User.DoesNotExist:
#             return None
