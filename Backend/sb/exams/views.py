from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Student, Exam, Attendance,subject,surveillance,teacher
from .serializers import StudentSerializer, ExamSerializer, AttendanceSerializer,subjetSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination



class ExamUpdate(generics.UpdateAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = [AllowAny]



# class is_presente(generics.UpdateAPIView):
#        serializer_class = AttendanceSerializer
#        permission_classes = [IsAuthenticated]
#        def get_object(self):
#         id = self.kwargs['pk']
#         id1 = self.kwargs['pk1']
        
#         try:
#             # Attempt to retrieve the presence object
#             pre = Attendance.objects.get(student=id, exam=id1)
#             return pre
#         except Attendance.DoesNotExist:
#             # Handle the case where the object does not exist
#             return None
#        def put(self, request, *args, **kwargs):
#         # Get the object using the overridden get_object method
#         presence_instance = self.get_object()
        
#         if presence_instance is None:
#             return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
#         # Update the is_present field
#         presence_instance.is_present = True
#         presence_instance.save()

#         # Optionally, serialize the updated object to return it in the response
#         serializer = self.get_serializer(presence_instance)
#         return Response(serializer.data, status=status.HTTP_200_OK)
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Attendance, Student, Exam
from .serializers import AttendanceSerializer

class is_presente(generics.UpdateAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        matricul = self.kwargs['matricul']
        exam_name = self.kwargs['exam_name']

        # Retrieve student by matricul
        student = get_object_or_404(Student, matricul=matricul)

        # Retrieve exam by subject name
        exam = get_object_or_404(Exam, subject__name=exam_name)

        # Get Attendance object
        return get_object_or_404(Attendance, student=student, exam=exam)

    def put(self, request, *args, **kwargs):
        # Get the object using get_object()
        presence_instance = self.get_object()

        # Update is_present field
        presence_instance.is_present = True
        presence_instance.save()

        # Serialize and return the updated object
        serializer = self.get_serializer(presence_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class subjectCreate(generics.ListCreateAPIView):
    queryset = subject.objects.all()
    serializer_class = subjetSerializer
    permission_classes = [AllowAny]

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
        

        teachers = teacher.objects.all()  
        surveillances = [surveillance(teacher=etu, exam=exam_instance) for etu in teachers]
        surveillance.objects.bulk_create(surveillances)  

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
                "refresh": str(refresh),
               "role": "teacher"
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
                "refresh": str(refresh),
                "role": "student"
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({"error": "Invalid matricul or roll number"}, status=401)       

import random
import string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import teacher,teach
from .serializers import teacherSerializer,teachSerializer,surveillanceSerializer
from rest_framework.permissions import IsAuthenticated




class CreateteacherView(APIView):
    permission_classes = [AllowAny]  # Only authenticated users with AuthTable can create new ones

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
      
        if User.objects.filter(first_name=first_name ,last_name=last_name ,email=email).exists():
               
               return Response({"error": "teacher already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        if teacher.objects.filter(matricul=matricul,secret_number= secret_number).exists():
             return Response({"error": "teacher already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Generate a random password (since Django requires one)
        random_password = "".join(random.choices(string.ascii_letters + string.digits, k=12))
        username= "".join(random.choices(string.ascii_letters + string.digits, k=12))
        # Create the new user
        new_user = User.objects.create_user( username=username,first_name=first_name,email=email,last_name=last_name ,password=random_password)

        # Create the AuthTable entry for the new user
        auth_table_entry = teacher.objects.create(user=new_user, secret_number=secret_number,  matricul= matricul)
        subjects= subject.objects.all()  
        presences = [teach(teacher= auth_table_entry, subject=subject1) for subject1 in subjects]
        teach.objects.bulk_create(presences)  
        

        exams = Exam.objects.all()  
        surveillances = [surveillance(teacher=auth_table_entry, exam=exam1) for exam1 in exams]
        surveillance.objects.bulk_create(surveillances) 

        serializer =  teacherSerializer(auth_table_entry) 
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class CreatestudView(APIView):
    permission_classes = [AllowAny]  # Only authenticated users with AuthTable can create new ones

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
        new_user = User.objects.create_user( username=username,first_name=first_name,email=email,last_name=last_name ,password=random_password)

        # Create the AuthTable entry for the new user
        auth_table_entry = Student.objects.create(Name=new_user, roll_number=roll_number,  matricul= matricul, level= level,speciality=speciality)
        exams=Exam.objects.all()
        presences = [Attendance(student=auth_table_entry, exam=exam1) for exam1 in exams]
        Attendance.objects.bulk_create(presences)  
        serializer =  StudentSerializer(auth_table_entry) 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
class UpdateTeacherView(APIView):
    permission_classes = [AllowAny]  # Only authenticated users can update a teacher

    def put(self, request, teacher_id):
        try:
            teacher_instance = teacher.objects.get(id=teacher_id)
        except teacher.DoesNotExist:
            return Response({"error": "Teacher not found"}, status=status.HTTP_404_NOT_FOUND)
        # Ensure the user updating is the owner OR an admin (optional check)
        

        # Get updated fields from request
        first_name = request.data.get("first_name", teacher_instance.user.first_name)
        last_name = request.data.get("last_name", teacher_instance.user.last_name)
        email = request.data.get("email", teacher_instance.user.email)
        secret_number = request.data.get("secret_number", teacher_instance.secret_number)
        matricul = request.data.get("matricul", teacher_instance.matricul)

        # Update User model
        teacher_instance.user.first_name = first_name
        teacher_instance.user.last_name = last_name
        teacher_instance.user.email = email
        teacher_instance.user.save()

        # Update Teacher model
        teacher_instance.secret_number = secret_number
        teacher_instance.matricul = matricul
        teacher_instance.save()

        # Serialize and return response
        serializer = teacherSerializer(teacher_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UpdateStudentView(APIView):
    permission_classes = [AllowAny]  # Only authenticated users can update a student

    def put(self, request, student_id):
        try:
            student_instance = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        # Ensure the user updating is the owner OR an admin (optional check)
        # if request.user != student_instance.Name and not request.user.is_staff:
            # return Response({"error": "You do not have permission to update this student."}, status=status.HTTP_403_FORBIDDEN)

        # Get updated fields from request
        first_name = request.data.get("first_name", student_instance.Name.first_name)
        last_name = request.data.get("last_name", student_instance.Name.last_name)
        email = request.data.get("email", student_instance.Name.email)
        roll_number = request.data.get("roll_number", student_instance.roll_number)
        matricul = request.data.get("matricul", student_instance.matricul)
        level = request.data.get("level", student_instance.level)
        speciality = request.data.get("speciality", student_instance.speciality)

        # Update User model
        student_instance.Name.first_name = first_name
        student_instance.Name.last_name = last_name
        student_instance.Name.email = email
        student_instance.Name.save()

        # Update Student model
        student_instance.roll_number = roll_number
        student_instance.matricul = matricul
        student_instance.level = level
        student_instance.speciality = speciality
        student_instance.save()

        # Serialize and return response
        serializer = StudentSerializer(student_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
class teaching(generics.UpdateAPIView):
       serializer_class =teachSerializer
       
       permission_classes = [AllowAny]

       def get_object(self):
           matricul = self.kwargs['matricul']
           subject_name = self.kwargs['subject_name']

        # Retrieve student by matricul
           teacher1 = get_object_or_404(teacher, matricul=matricul)

        # Retrieve exam by subject name
           subject1 = get_object_or_404(subject, name=subject_name)

        # Get Attendance object
           return get_object_or_404(teach, teacher=teacher1, subject=subject1)

       def put(self, request, *args, **kwargs):
        # Get the object using get_object()
          presence_instance = self.get_object()

        # Update is_present field
          presence_instance.teaching = True
          presence_instance.save()
 
        # Serialize and return the updated object
          serializer = self.get_serializer(presence_instance)
          return Response(serializer.data, status=status.HTTP_200_OK)


class  teacher_present(generics.UpdateAPIView):
       
       serializer_class =surveillanceSerializer
       permission_classes = [AllowAny]

       def get_object(self):
           matricul = self.kwargs['matricul']
           exam_name = self.kwargs['exam_name']

        # Retrieve student by matricul
           teacher1 = get_object_or_404(teacher, matricul=matricul)

        # Retrieve exam by subject name
           exam = get_object_or_404(Exam, subject__name=exam_name)

        # Get Attendance object
           return get_object_or_404(surveillance, teacher=teacher1, exam=exam)

       def put(self, request, *args, **kwargs):
        # Get the object using get_object()
          presence_instance = self.get_object()

        # Update is_present field
          presence_instance.is_present = True
          presence_instance.save()
 
        # Serialize and return the updated object
          serializer = self.get_serializer(presence_instance)
          return Response(serializer.data, status=status.HTTP_200_OK)

 

class ListStudentView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]  # Only authenticated users can view the list

    def get_queryset(self):
        return Student.objects.select_related('Name').all() 
       
class teacherPagination(PageNumberPagination):
    page_size = 5  # Number of items per page
    page_size_query_param = 'page_size'
    max_page_size = 100  # Optional limit
class ListTeacherView(generics.ListAPIView):
    queryset = teacher.objects.all()
    serializer_class = teacherSerializer
    permission_classes = [AllowAny] # Only authenticated users can view the list
    pagination_class = teacherPagination  
    def get_queryset(self):
        return teacher.objects.select_related('user').all() 
       
class ListTeachView(generics.ListAPIView):
    serializer_class = subjetSerializer
    permission_classes = [AllowAny]    

    def get_queryset(self):
        id = self.kwargs['pk']  # Get teacher ID
        modules = teach.objects.filter(teacher__id=id, teaching=True).values_list('subject', flat=True)
        return subject.objects.filter(id__in=modules)  # Use __in to filter multiple IDs
    

class ListSurveillanceView(generics.ListAPIView):
     serializer_class = teacherSerializer
     permission_classes = [AllowAny]
     def get_queryset(self):
        id = self.kwargs['pk']  # Get teacher ID
        modules = surveillance.objects.filter(exam__id=id, is_present=True).values_list('teacher', flat=True)
        return teacher.objects.filter(id__in=modules)


class StudentPagination(PageNumberPagination):
    page_size = 5 # Number of items per page
    page_size_query_param = 'page_size'
    max_page_size = 100  # Optional limit

class studentListByspesialityandLevel(generics.ListAPIView):
     serializer_class = StudentSerializer
     permission_classes = [AllowAny]
     pagination_class = StudentPagination  
     def get_queryset(self):
        spesiality= self.kwargs.get('spe')  
        level= self.kwargs.get('level')
        return Student.objects.filter(speciality=spesiality, level=level)  
     
class subjetListByspecialityandlevelandsemester(generics.ListAPIView):
    serializer_class = subjetSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        spesiality= self.kwargs.get('spe')  
        level= self.kwargs.get('spe1')
        semester= self.kwargs.get('spe2')
        return subject.objects.filter(speciality=spesiality,level=level,semester=semester)  
    


from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

class CheckTokenView(APIView):
    permission_classes = [IsAuthenticated]  # Ensures the user is logged in

    def get(self, request):
        token = request.headers.get("Authorization", "").split("Bearer ")[-1]  # Extract token safely

        if not token or token == "Authorization":
            return Response({"expired": True, "error": "No token provided"}, status=400)

        try:
            access_token = AccessToken(token)  # Decode token
            exp_time = access_token["exp"]  # Get expiration timestamp
            is_expired = datetime.fromtimestamp(exp_time) < datetime.utcnow()  # Compare with current time

            return Response({"expired": is_expired, "error": None})

        except (TokenError, InvalidToken) as e:  # Handle expired or invalid tokens
            return Response({"expired": True, "error": str(e)}, status=401)

        except Exception as e:
            return Response({"expired": True, "error": f"Unexpected error: {str(e)}"}, status=400)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]  # Only logged-in users can access

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")  # Get refresh token from request body
            
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=400)

            token = RefreshToken(refresh_token)  # Decode the token
            token.blacklist()  # Blacklist the token (Requires Blacklist App)
            
            return Response({"message": "Successfully logged out"}, status=200)
        
        except Exception as e:
            return Response({"error": f"Logout failed: {str(e)}"}, status=400)
        

class ExamListByLevelAndSpeciality(generics.ListAPIView):
    serializer_class = ExamSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        level = self.kwargs.get('level')  
        speciality = self.kwargs.get('speciality')
        semester=self.kwargs.get('semester')
        return Exam.objects.filter(subject__level=level, subject__speciality=speciality,subject__semester=semester).select_related("subject")
    

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import subject, Exam, surveillance, teach  # Import your models here

class delete_subject(APIView):
    permission_classes = [AllowAny]

    def delete(self, request, *args, **kwargs):
        # Retrieve the subject name from the URL kwargs
        name1 = self.kwargs.get("name")

        # Get the subject instance or return a 404 response if not found
        subject_instance = get_object_or_404(subject, name=name1)

        # Delete related objects
        try:
            # Delete all related exams
            exam_instance = Exam.objects.filter(subject=subject_instance)
            exam_ids = exam_instance.values_list('id', flat=True)  # Get IDs of related exams

            # Delete related surveillance objects
            surveillance.objects.filter(exam__in=exam_ids).delete()

            # Delete related teach objects
            teach.objects.filter(subject=subject_instance).delete()

            # Delete the exams
            exam_instance.delete()

            # Finally, delete the subject itself
            
            subject_instance.delete()

            # Return a success response
            return Response(status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            # Handle unexpected errors gracefully
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    



class delete_exam(APIView):
   
    permission_classes = [AllowAny]
 
 
    def delete(self ,request, *args, **kwargs):
     
        exam_id= self.kwargs.get('pk') 
        exam_instance=Exam.objects.filter(subject=exam_id)
        attendance_instance=surveillance.objects.filter(exam__in=exam_instance)
        attendance_instance.delete()
       
        exam_instance.delete()
        
       
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class StudentProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Seuls les utilisateurs connectés peuvent voir leurs infos

    def get(self, request):
        # Récupérer l'étudiant à partir de l'utilisateur connecté
        student_instance = get_object_or_404(Student, Name=request.user)  

        serializer = StudentSerializer(student_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class Examlist(APIView):

    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):

        exams = Exam.objects.all()
        serializer = ExamSerializer(exams, many=True)
        return Response(serializer.data)
class subjectlist(APIView):

    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):

        subjects = subject.objects.all()
        serializer = subjetSerializer(subjects, many=True)
        return Response(serializer.data)

class teacherinfo(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        id = self.kwargs['pk']
        teacher1 = get_object_or_404(teacher, id=id)
        serializer = teacherSerializer(teacher1)
        return Response(serializer.data,status=status.HTTP_200_OK)
    






from django.shortcuts import render, get_object_or_404


from django.http import JsonResponse


from django.http import JsonResponse


def teacher_subjects(request):
    teachers = teacher.objects.all()  # Fetch all teachers
    teacher_list = []

    for teacher1 in teachers:
        # Make sure teacher.user exists and is a valid User instance
        user = getattr(teacher1, "user", None)  # Fetch user safely
        if not user:
            continue  # Skip this teacher if user doesn't exist

        teachings = teach.objects.filter(teacher=teacher1, teaching=True)
        subjects = [teach.subject for teach in teachings]

        teacher_data = {
            "id": teacher1.id,
            "first_name": user.first_name,  # Now it should work
            "last_name": user.last_name,
            "email": user.email,
            "matricul": teacher1.matricul,
            "secret_number": teacher1.secret_number,
            "subjects": [
                {
                    "id": subject.id,
                    "name": subject.name,
                    "level": subject.level,
                    "speciality": subject.speciality,
                    "semester": subject.semester,
                } for subject in subjects
            ]
        }
        teacher_list.append(teacher_data)

    return JsonResponse({"teachers": teacher_list})


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404



class castomExam(APIView):
   permission_classes = [IsAuthenticated]  # Only authenticated users can access

   def get(self, request):
        # Retrieve student based on the authenticated user
        student_instance = get_object_or_404(Student, Name=request.user)  

        # Get level and speciality
        level1 = student_instance.level
        speciality1 = student_instance.speciality

        # Get subjects and exams
        subject1 = subject.objects.filter(level=level1, speciality=speciality1)
        exams = Exam.objects.filter(subject__in=subject1)

        # Prepare exam data with attendance status
        exam_data = []
        for exam in exams:
            attendance = Attendance.objects.filter(student=student_instance, exam=exam).first()
            exam_data.append({
                "exam": ExamSerializer(exam).data,
                "is_present": attendance.is_present if attendance else False  # Default to False if no record exists
            })

        return Response(exam_data, status=status.HTTP_200_OK)

from django.http import JsonResponse
from django.views import View
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from .models import Student, Attendance

class StudentDeleteAPIView(APIView):
    permission_classes = [AllowAny]
    def delete(self, request, *args, **kwargs):
        id1 = self.kwargs['pk']
        student1 = get_object_or_404(Student, id=id1)
        user = student1.Name
        Attendance.objects.filter(student=student1).delete()  # Delete related attendance records
        student1.delete()
        user.delete()  # Delete the associated User instance
        return JsonResponse({"message": "Student deleted successfully."}, status=200)

class TeacherDeleteAPIView(APIView):
    permission_classes = [AllowAny]
    def delete(self, request, *args, **kwargs):
        id1 = self.kwargs['pk']
        teacher1 = get_object_or_404(teacher, id=id1)
        user = teacher1.user
        teach.objects.filter(teacher=teacher1).delete()  # Delete related attendance records
        surveillance.objects.filter(teacher=teacher1).delete()
        teacher1.delete()
        user.delete()  # Delete the associated User instance
        return JsonResponse({"message": "teacher deleted successfully."}, status=200)

    

