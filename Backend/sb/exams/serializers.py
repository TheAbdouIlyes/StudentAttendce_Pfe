from rest_framework import serializers
from .models import Student, Exam, Attendance,AuthTable

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class AuthTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthTable
        fields = '__all__'
        read_only_fields = ['created_at']