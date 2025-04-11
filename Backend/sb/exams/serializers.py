from rest_framework import serializers
from .models import Student, Exam, Attendance,teacher,teach,subject,surveillance

class StudentSerializer(serializers.ModelSerializer):

    first_name = serializers.CharField(source="Name.first_name", read_only=True)
    last_name = serializers.CharField(source="Name.last_name", read_only=True)
    email = serializers.EmailField(source="Name.email", read_only=True)
    is_present=serializers.BooleanField(read_only=True)
    class Meta:
        model = Student
        fields = ["id", "first_name", "last_name", "email", "roll_number", "matricul", "level", "speciality","is_present"]

class ExamSerializer(serializers.ModelSerializer):

    subject_name = serializers.CharField(source='subject.name', read_only=True)
    time = serializers.TimeField(format="%H:%M")

    class Meta:
        model = Exam
        fields =['id', 'subject_name','date','time','amphi']

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class teacherSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = teacher
        fields = ["id", "first_name", "last_name", "email", "secret_number", "matricul"]
        read_only_fields = ['created_at']

class teachSerializer(serializers.ModelSerializer):
    class Meta:
        model= teach
        fields = '__all__'





class subjetSerializer(serializers.ModelSerializer):
    class Meta:
        model = subject
        fields = '__all__'



class surveillanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = surveillance
        fields = '__all__'



