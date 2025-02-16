from django.contrib.auth.models import User
from rest_framework import serializers
from .models import etudiant,exam,presence


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name","last_name","email","password"]
        extra_kwargs = {"password": {"write_only": True}}

class etudiantSerializer(serializers.ModelSerializer):
    class Meta:
        model = etudiant
        fields = ["id", "password","name","matricul"]
     
class examSerializer(serializers.ModelSerializer):
    class Meta:
        model = exam
        fields = '__all__'
     

class presenceSerializer(serializers.ModelSerializer):
       class Meta:
        model = presence
        fields = '__all__'
     
