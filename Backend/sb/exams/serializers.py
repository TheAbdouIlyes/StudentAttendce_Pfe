from rest_framework import serializers
from .models import Student, Exam, Attendance,AuthTable,teacher,teach,subject

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

class teacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = teacher
        fields = '__all__'
        read_only_fields = ['created_at']




class subjetSerializer(serializers.ModelSerializer):
    class Meta:
        model = subject
        fields = '__all__'
