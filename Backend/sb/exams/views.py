from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Student, Exam, Attendance,AuthTable,subject,surveillance
from .serializers import StudentSerializer, ExamSerializer, AttendanceSerializer,subjetSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics


class ExamUpdate(generics.UpdateAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = [IsAuthenticated]

# ✅ Delete View (DELETE)
class ExamDelete(generics.DestroyAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = [IsAuthenticated]

class is_presente(generics.UpdateAPIView):
       serializer_class = AttendanceSerializer
       permission_classes = [IsAuthenticated]
       def get_object(self):
        id = self.kwargs['pk']
        id1 = self.kwargs['pk1']
        
        try:
            # Attempt to retrieve the presence object
            pre = Attendance.objects.get(student=id, exam=id1)
            return pre
        except Attendance.DoesNotExist:
            # Handle the case where the object does not exist
            return None
       def put(self, request, *args, **kwargs):
        # Get the object using the overridden get_object method
        presence_instance = self.get_object()
        
        if presence_instance is None:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        # Update the is_present field
        presence_instance.is_present = True
        presence_instance.save()

        # Optionally, serialize the updated object to return it in the response
        serializer = self.get_serializer(presence_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
class subjectCreate(generics.ListCreateAPIView):
    queryset = subject.objects.all()
    serializer_class = subjetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Méthode appelée lors de la création d'un sujet.
        Elle sauvegarde le sujet, crée un examen associé et ajoute les enseignants.
        """
        # 1️⃣ Sauvegarde le nouveau sujet
        subject_instance = serializer.save()  

        # 2️⃣ Créer un examen pour ce sujet avec les valeurs par défaut
        exam_instance = Exam.objects.create(subject=subject_instance)
        etudiants = Student.objects.all()  # Récupère tous les étudiants

        # Créer une présence pour chaque étudiant
        presences = [Attendance(student=etu, exam=exam_instance) for etu in etudiants]
        Attendance.objects.bulk_create(presences)  

        # 3️⃣ Ajouter les enseignants liés au sujet dans la table teach
        teachers = teacher.objects.all()  
        presences = [teach(teacher=etu, subject=subject_instance) for etu in teachers]
        teach.objects.bulk_create(presences)  

        return subject_instance  # ✅ Retourne le sujet avec l'examen lié
 
   

import qrcode
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.base import ContentFile
from io import BytesIO
import base64


class GenerateQRCode(APIView):
    permission_classes = [AllowAny]
    """
    API View to generate a QR code from provided data.
    """

    def post(self, request):
        """
        Generate a QR code from the provided data in the request body.
        Expects a JSON payload with a 'data' field.
        """
        data = request.data.get('data')
        if not data:
            return Response({"error": "No data provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Generate QR code
            qr = qrcode.QRCode(version=1, box_size=10, border=5)
            qr.add_data(data)
            qr.make(fit=True)
            img = qr.make_image(fill='black', back_color='white')

            # Save to a BytesIO object
            buffer = BytesIO()
            img.save(buffer, format='PNG')
            img_str = base64.b64encode(buffer.getvalue()).decode()

            return Response({"qr_code": f"data:image/png;base64,{img_str}"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

        


@csrf_exempt
def login_with_matricul_secret(request):
    if request.method == "POST":
        data = json.loads(request.body)
        matricul = data.get("matricul")
        secret_number = data.get("secret_number")

        user = authenticate(matricul=matricul, secret_number=secret_number)
        if user:
            refresh = RefreshToken.for_user(user) 
            
            # Logs the user in
            return JsonResponse({
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({"error": "Invalid matricul or secret number"}, status=401)       
@csrf_exempt
def login_with_matricul_roll(request):
    if request.method == "POST":
        data = json.loads(request.body)
        matricul = data.get("matricul")
        roll_number = data.get("roll_number")

        user = authenticate(matricul=matricul, roll_number=roll_number)
        if user:
            refresh = RefreshToken.for_user(user) 
            
            # Logs the user in
            return JsonResponse({
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({"error": "Invalid matricul or roll number"}, status=401)       

import random
import string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import AuthTable,teacher,teach
from .serializers import teacherSerializer
from rest_framework.permissions import IsAuthenticated




class CreateteacherView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users with AuthTable can create new ones

    def post(self, request):
        # Ensure the requesting user already has an AuthTable
        # if not AuthTable.objects.filter(user=request.user).exists():
        #     return Response({"error": "You must have an AuthTable to create another user."}, status=status.HTTP_403_FORBIDDEN)
       
        first_name = request.data.get("first_name")  
        last_name = request.data.get("last_name")
        email = request.data.get("email")
        secret_number = request.data.get("secret_number")
        matricul = request.data.get("matricul")

        # if not first_name  last_name email):
        #     return Response({"error": "Username is required for the new user."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user already exists
      
        if User.objects.filter(first_name=first_name ,last_name=last_name , email=email).exists():
               
               return Response({"error": "teacher already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        if teacher.objects.filter(matricul=matricul,secret_number= secret_number).exists():
             return Response({"error": "teacher already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Generate a random password (since Django requires one)
        random_password = "".join(random.choices(string.ascii_letters + string.digits, k=12))
        username= "".join(random.choices(string.ascii_letters + string.digits, k=12))
        # Create the new user
        new_user = User.objects.create_user( username=username,first_name=first_name,last_name=last_name ,password=random_password)

        # Create the AuthTable entry for the new user
        auth_table_entry = teacher.objects.create(user=new_user, secret_number=secret_number,  matricul= matricul)
        serializer =  teacherSerializer(auth_table_entry) 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
       
class CreatestudView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users with AuthTable can create new ones

    def post(self, request):
        # Ensure the requesting user already has an AuthTable
        # if not AuthTable.objects.filter(user=request.user).exists():
        #     return Response({"error": "You must have an AuthTable to create another user."}, status=status.HTTP_403_FORBIDDEN)
       
        first_name = request.data.get("first_name")  
        last_name = request.data.get("last_name")
        email = request.data.get("email")
        roll_number = request.data.get("roll_number")
        matricul = request.data.get("matricul")
        level=request.data.get("level")
        speciality=request.data.get("speciality")
        

        # if not first_name  last_name email):
        #     return Response({"error": "Username is required for the new user."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user already exists
      
        if User.objects.filter(first_name=first_name ,last_name=last_name , email=email).exists():
               
               return Response({"error": "teacher already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        if Student.objects.filter(matricul=matricul,roll_number= roll_number).exists():
             return Response({"error": "student already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Generate a random password (since Django requires one)
        random_password = "".join(random.choices(string.ascii_letters + string.digits, k=12))
        username= "".join(random.choices(string.ascii_letters + string.digits, k=12))
        # Create the new user
        new_user = User.objects.create_user( username=username,first_name=first_name,last_name=last_name ,password=random_password)

        # Create the AuthTable entry for the new user
        auth_table_entry = Student.objects.create(Name=new_user, roll_number=roll_number,  matricul= matricul, level= level,speciality=speciality)
        serializer =  StudentSerializer(auth_table_entry) 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    






       
