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
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from .models import Attendance, Student, Exam
from .serializers import AttendanceSerializer

class is_presente(generics.UpdateAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        matricul = self.kwargs['matricul']
        exam_name = self.kwargs['exam_name']

        # Retrieve student by matricul
        student = get_object_or_404(Student, matricul=matricul)

        # Retrieve exam by subject name
        exam = get_object_or_404(Exam, subject__name=exam_name)

        # Check level and speciality match
        if student.level != exam.subject.level or student.speciality != exam.subject.speciality:
            return Response({'detail': 'Student level or speciality does not match the exam.'},
                            status=status.HTTP_403_FORBIDDEN)

        # Check if attendance record already exists
        if Attendance.objects.filter(student=student, exam=exam).exists():
            return Response({'detail': 'Attendance record already exists.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Create new attendance record
        attendance = Attendance.objects.create(student=student, exam=exam)

        # Serialize and return the created record
        serializer = self.serializer_class(attendance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class subjectCreate(generics.ListCreateAPIView):
    queryset = subject.objects.all()
    serializer_class = subjetSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        print("Creating a new subject...")
        
        # 1️⃣ Save the new subject
        subject_instance = serializer.save()
        print(f"Subject created: {subject_instance}")

        # 2️⃣ Create an exam associated with the subject
        exam_instance = Exam.objects.create(subject=subject_instance)
        print(f"Exam created: {exam_instance}")

        # # 3️⃣ Add students to Attendance
        # students = Student.objects.all()
        # print(f"Total students found: {students.count()}")

        # if students.exists():
        #     for student1 in students:
        #         Attendance.objects.create(student=student1, exam=exam_instance)
        #     print(f"Attendance records created: {students.count()}")

        # # 4️⃣ Add teachers to Teach
        # teachers = teacher.objects.all()
        # print(f"Total teachers found: {teachers.count()}")

        # if teachers.exists():
        #     for teacher1 in teachers:
        #         teach.objects.create(teacher=teacher1, subject=subject_instance)
        #     print(f"Teach records created: {teachers.count()}")

        #     for teacher1 in teachers:
        #         surveillance.objects.create(teacher=teacher1, exam=exam_instance)
        #     print(f"Surveillance records created: {teachers.count()}")

        return subject_instance

   

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
        
        if teacher.objects.filter(matricul=matricul).exists():
             return Response({"error": "teacher already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Generate a random password (since Django requires one)
        random_password = "".join(random.choices(string.ascii_letters + string.digits, k=12))
        username= "".join(random.choices(string.ascii_letters + string.digits, k=12))
        # Create the new user
        new_user = User.objects.create_user( username=username,first_name=first_name,email=email,last_name=last_name ,password=random_password)

        # Create the AuthTable entry for the new user
        auth_table_entry = teacher.objects.create(user=new_user, secret_number=secret_number,  matricul= matricul)
        # subjects= subject.objects.all()  
        # presences = [teach(teacher= auth_table_entry, subject=subject1) for subject1 in subjects]
        # teach.objects.bulk_create(presences)  
        

        # exams = Exam.objects.all()  
        # surveillances = [surveillance(teacher=auth_table_entry, exam=exam1) for exam1 in exams]
        # surveillance.objects.bulk_create(surveillances) 

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
        # exams=Exam.objects.all()
        # presences = [Attendance(student=auth_table_entry, exam=exam1) for exam1 in exams]
        # Attendance.objects.bulk_create(presences)  
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

    
class teaching(APIView):
    serializer_class = teachSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        matricul1 = self.kwargs['matricul']
        subject_name = self.kwargs['subject_name']

        # Retrieve teacher by matricul
        teacher_instance = get_object_or_404(teacher, matricul=matricul1)

        # Retrieve subject by name
        subject_instance = get_object_or_404(subject, name=subject_name)

        # Check if teaching record already exists
        if teach.objects.filter(teacher=teacher_instance, subject=subject_instance).exists():
            return Response({'detail': 'Teach record already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create new teaching record
        teaching_record = teach.objects.create(teacher=teacher_instance, subject=subject_instance)

        # Serialize and return the created record
        serializer = self.serializer_class(teaching_record)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



  


class not_teaching(generics.UpdateAPIView):
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

    def delete(self, request, *args, **kwargs):
        attendance_instance = self.get_object()
        attendance_instance.delete()
        return Response({'detail': 'Attendance record deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)



class teacher_present(generics.UpdateAPIView):
    serializer_class = surveillanceSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        matricul = self.kwargs['matricul']
        exam_name = self.kwargs['exam_name']

        # Retrieve teacher by matricul
        teacher_instance = get_object_or_404(teacher, matricul=matricul)

        # Retrieve exam by subject name
        exam_instance = get_object_or_404(Exam, subject__name=exam_name)

        # Check if the teacher already surveils this exam
        if surveillance.objects.filter(teacher=teacher_instance, exam=exam_instance).exists():
            return Response({'detail': 'Teacher is already assigned to this exam.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check for time/date conflict with another exam
        conflicting_exam = surveillance.objects.filter(
            teacher=teacher_instance,
            exam__date=exam_instance.date,
            exam__time=exam_instance.time
        ).exists()

        if conflicting_exam:
            return Response(
                {'detail': 'Teacher is already assigned to another exam at the same time.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create new surveillance record
        teaching_record = surveillance.objects.create(teacher=teacher_instance, exam=exam_instance)

        # Serialize and return the created record
        serializer = self.serializer_class(teaching_record)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

 


class  teacher_not_present(generics.UpdateAPIView):
    serializer_class = surveillanceSerializer
    permission_classes = [AllowAny]  
       
    
    def delete(self, request, *args, **kwargs):
         matricule = self.kwargs['matricul']
         exam_name = self.kwargs['exam_name']
         teacher_instance = get_object_or_404(teacher, matricul=matricule)
         exam_instance = get_object_or_404(Exam, subject__name=exam_name)
         attendance_instance = surveillance.objects.filter(teacher=teacher_instance, exam=exam_instance)
         if (surveillance.objects.filter(teacher=teacher_instance, exam=exam_instance).exists()):
          attendance_instance.delete()
         return Response({'detail': 'Attendance record deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)



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
        modules = teach.objects.filter(teacher__id=id).values_list('subject', flat=True)
        return subject.objects.filter(id__in=modules)  # Use __in to filter multiple IDs
    

class ListSurveillanceView(generics.ListAPIView):
     serializer_class = teacherSerializer
     permission_classes = [AllowAny]
     def get_queryset(self):
        id = self.kwargs['pk']  # Get teacher ID
        modules = surveillance.objects.filter(exam__id=id).values_list('teacher', flat=True)
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
    

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken, TokenError
from datetime import datetime
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken, TokenError
from datetime import datetime

class CheckTokenView(APIView):
    permission_classes = [AllowAny]  # Allow all users to access this view

    def get(self, request):
        token = request.GET.get("token")  # Get token from query parameters

        if not token:
            return Response(False, status=400)  # Return False if no token is provided

        try:
            access_token = AccessToken(token)  # Decode token
            exp_time = access_token["exp"]  # Get expiration timestamp
            is_expired = datetime.fromtimestamp(exp_time) < datetime.utcnow()  # Compare with current time

            return Response(not is_expired)  # Return True if valid, False if expired

        except (TokenError, Exception):  # Handle expired or invalid tokens
            return Response(False, status=401)  # Return False if the token is invalid or expired




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
        subject_instance = get_object_or_404(subject, id=name1)

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
    

class studentinfo(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        id = self.kwargs['pk']
        teacher1 = get_object_or_404(Student, id=id)
        serializer = StudentSerializer(teacher1)
        return Response(serializer.data,status=status.HTTP_200_OK)
    





from django.http import JsonResponse


from django.http import JsonResponse


# def teacher_subjects(request):
#     teachers = teacher.objects.all()  # Fetch all teachers
#     teacher_list = []

#     for teacher1 in teachers:
#         # Make sure teacher.user exists and is a valid User instance
#         user = getattr(teacher1, "user", None)  # Fetch user safely
#         if not user:
#             continue  # Skip this teacher if user doesn't exist

#         teachings = teach.objects.filter(teacher=teacher1, teaching=True)
#         subjects = [teach.subject for teach in teachings]

#         teacher_data = {
#             "id": teacher1.id,
#             "first_name": user.first_name,  # Now it should work
#             "last_name": user.last_name,
#             "email": user.email,
#             "matricul": teacher1.matricul,
#             "secret_number": teacher1.secret_number,
#             "subjects": [
#                 {
#                     "id": subject.id,
#                     "name": subject.name,
#                     "level": subject.level,
#                     "speciality": subject.speciality,
#                     "semester": subject.semester,
#                 } for subject in subjects
#             ]
#         }
#         teacher_list.append(teacher_data)

#     return JsonResponse({"teachers": teacher_list})


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404



class castomExam(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

    def get(self, request, *args,**kwargs):

        # Retrieve student based on the authenticated user
        student_instance = get_object_or_404(Student, Name=request.user)  
        s= self.kwargs['s']
        # Get level and speciality
        level1 = student_instance.level
        speciality1 = student_instance.speciality
        
        # Get subjects and exams
        
        subject1 = subject.objects.filter(level=level1, speciality=speciality1, semester=s)
        exams = Exam.objects.filter(subject__in=subject1)

        # Prepare exam data with attendance status
        exam_data = []
        for exam in exams:
            attendance_exists = Attendance.objects.filter(student=student_instance, exam=exam).exists()
            exam_data.append({
                "exam": ExamSerializer(exam).data,
                "is_persent": attendance_exists  # True if attendance exists, False otherwise
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

    
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import subject
from .serializers import subjetSerializer  # Fixed serializer name

class SubjectUpdateView(RetrieveUpdateAPIView):
    queryset = subject.objects.all()
    serializer_class = subjetSerializer  # Fixed serializer name
    permission_classes = [AllowAny]  # Anyone can update

    def put(self, request, pk):
        instance = get_object_or_404(subject, pk=pk)  # Get subject by ID
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
from django.shortcuts import get_object_or_404
from django.db.models import OuterRef, Subquery, BooleanField
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from .models import Student, Exam, Attendance
from django.db.models import Exists, OuterRef

# ✅ Pagination Class
class StudentPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 100

# ✅ Corrected View
class students_by_exam(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = StudentSerializer  # ✅ Uses the correct serializer
    pagination_class = StudentPagination  

    def get_queryset(self):
        """Retrieve students by exam's level and speciality, checking if attendance exists."""
        exam_id = self.kwargs.get("exam_id")
        exam = get_object_or_404(Exam, id=exam_id)

        # ✅ Subquery to check if student has an attendance record
        attendance_subquery = Attendance.objects.filter(
            exam=exam,
            student=OuterRef("id")
        ).values("id")[:1]  # Returns an ID if attendance exists

        # ✅ Query students with attendance status
        students = Student.objects.filter(
            level=exam.subject.level,
            speciality=exam.subject.speciality
        ).annotate(
            is_present=Exists(attendance_subquery)  # ✅ Set is_present to True if attendance exists
        ).select_related("Name")  # ✅ Ensure user data is loaded efficiently

        return students  # ✅ Must return a QuerySet, NOT serializer.data


from django.shortcuts import get_object_or_404
from django.db.models import OuterRef, Subquery, BooleanField
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Student, subject, Attendance
from .serializers import StudentSerializer




class students_by_subject(generics.ListAPIView):
     permission_classes = [AllowAny]
     serializer_class = StudentSerializer  
     pagination_class = StudentPagination  

     def get_queryset(self):
        """Retrieve students by subject name, checking if attendance exists."""
        subject_name = self.kwargs.get("subject_name")  # Get subject name from URL
        subject_instance = get_object_or_404(subject, name=subject_name)

        # ✅ Subquery to check if the student has an attendance record for any exam of this subject
        attendance_subquery = Attendance.objects.filter(
            exam__subject=subject_instance,
            student=OuterRef("id")
        ).values("id")[:1]  # Returns an ID if attendance exists

        # ✅ Query students with attendance status
        students = Student.objects.filter(
            level=subject_instance.level,
            speciality=subject_instance.speciality
        ).annotate(
            is_present=Exists(attendance_subquery)  # ✅ Check if attendance exists
        ).select_related("Name")  # ✅ Ensure user data is loaded efficiently

        return students  # ✅ Must return a QuerySet, NOT serializer.data





from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import teach, subject  # Import your models
from .serializers import subjetSerializer  # Import the subject serializer




from django.shortcuts import get_object_or_404
from .models import teacher, teach, subject
from .serializers import subjetSerializer

class TeacherSubjectsView(APIView):
    permission_classes = [IsAuthenticated]  # Require authentication

    def get(self, request ,*args,**kwargs):
        """Retrieve all subjects that the authenticated teacher actively teaches (teaching=True)."""
        # ✅ Get the authenticated teacher (assuming one teacher per user)
        teacher_instance = get_object_or_404(teacher, user=request.user)
        s= self.kwargs['s']
        # ✅ Retrieve subjects where the teacher has `teaching=True`
        subjects = subject.objects.filter(teach__teacher=teacher_instance, semester=s)

        # ✅ Serialize the subjects
        serializer = subjetSerializer(subjects, many=True)

        return Response(serializer.data)

class TeacherSubjectsId(APIView):
    permission_classes = [AllowAny]  # Require authentication

    def get(self,request,*args, **kwargs):
        """Retrieve all subjects that the authenticated teacher actively teaches (teaching=True)."""
        # ✅ Get the authenticated teacher (assuming one teacher per user)
        id1 = self.kwargs['tea_id']
        teacher_instance = get_object_or_404(teacher, id=id1)

        # ✅ Retrieve subjects where the teacher has `teaching=True`
        subjects = subject.objects.filter(teach__teacher=teacher_instance)

        # ✅ Serialize the subjects
        serializer = subjetSerializer(subjects, many=True)

        return Response(serializer.data)


class TeacherexamsView(APIView):
    permission_classes = [IsAuthenticated]  # Require authentication

    def get(self, request, *args,**kwargs):
        """Retrieve all subjects that the authenticated teacher actively teaches (teaching=True)."""
        # ✅ Get the authenticated teacher (assuming one teacher per user)
        teacher_instance = get_object_or_404(teacher, user=request.user)
        s = self.kwargs['s']
        # ✅ Retrieve subjects where the teacher has `teaching=True`
        Exams = Exam.objects.filter(surveillance__teacher=teacher_instance,subject__semester=s).select_related("subject")

        # ✅ Serialize the subjects
        serializer = ExamSerializer(Exams, many=True)

        return Response(serializer.data)
         
class Examserv(APIView):
  
    permission_classes = [AllowAny]  # Require authentication
    def get(self, request, *args, **kwargs):


     matricule = self.kwargs['s']
     ex=self.kwargs['ex']
     teacher_instance = get_object_or_404(teacher, matricul=matricule)
     exam_instance = get_object_or_404(Exam, subject__name=ex)
     surveillance_instance=surveillance.objects.filter(teacher=teacher_instance,exam= exam_instance)
     if surveillance_instance.exists():
            return JsonResponse({"is_present": True})
     else:
            return JsonResponse({"is_present": False})
     


from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from django.utils import timezone
from datetime import datetime

from .models import Student, teacher, Exam, Attendance, surveillance

class adminstats(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        # Student counts
        students_count = Student.objects.count()
        student_phisic = Student.objects.filter(speciality="physic").count()
        student_INFO = Student.objects.filter(speciality="info").count()
        student_gestion = Student.objects.filter(speciality="gestion").count()
        student_biology = Student.objects.filter(speciality="biology").count()
        student_pharmacy = Student.objects.filter(speciality="pharmacy").count()
        student_medcine = Student.objects.filter(speciality="medcine").count()

        # General stats
        exam_count = Exam.objects.count()
        teacher_count = teacher.objects.count()
        attendance_count = Attendance.objects.count()

        # Expected attendance
        expected_attendance = 0
        now = timezone.now()
        nd=now.date()
        nt=now.time()
        exams = Exam.objects.filter(date__lt=nd,time__lt=nt)
        for exam in exams:
            expected_students = Student.objects.filter(
                level=exam.subject.level,
                speciality=exam.subject.speciality
            ).count()
            expected_attendance += expected_students

        absences_count = expected_attendance - attendance_count

        # 🔹 Teachers without any surveillance duties
        assigned_teacher_ids = surveillance.objects.values_list("teacher_id", flat=True).distinct()
        teachers_without_duty = teacher.objects.exclude(id__in=assigned_teacher_ids).count()

        # 🔹 Exams that have ended (date + time < now)
        now = timezone.now()
        exams_ended = 0
        for exam in exams:
            exam_datetime = timezone.make_aware(datetime.combine(exam.date, exam.time))
            if exam_datetime < now:
                exams_ended += 1

        return JsonResponse({
            "students_count": students_count,
            "student_phisic": student_phisic,
            "student_INFO": student_INFO,
            "student_gestion": student_gestion,
            "student_biology": student_biology,
            "student_pharmacy": student_pharmacy,
            "student_medcine": student_medcine,
            "exam_count": exam_count,
            "teacher_count": teacher_count,
            "attendance_count": attendance_count,
            "absences_count": absences_count,
            "teachers_without_duty": teachers_without_duty,
            "exams_ended": exams_ended,
        })



class Présences_par_Spécialité(APIView):
   
    permission_classes = [AllowAny]  # Require authentication
    def get(self, request, *args, **kwargs):
           spes=self.kwargs['spes']
           now = timezone.now()
           nd=now.date()
           nt=now.time()
         
           exams = Exam.objects.filter( subject__speciality=spes,date__lt=nd,time__lt=nt)
           Attendance_count=Attendance.objects.filter( exam__in=exams).count()
           expected_attendance = 0
           for exam in exams:
              expected_students = Student.objects.filter(
                level=exam.subject.level,
                speciality=exam.subject.speciality
               ).count()
              expected_attendance += expected_students
            
            
            
            
           absences_count = expected_attendance - Attendance_count
           return JsonResponse({ "absences_count": absences_count, "attendance_count": Attendance_count})


 




class Présences_par_level(APIView):
   
    permission_classes = [AllowAny]  # Require authentication
    def get(self, request, *args, **kwargs):
           spes=self.kwargs['level']
           
           now = timezone.now()
           nd=now.date()
           nt=now.time()
           exams = Exam.objects.filter( subject__level=spes,date__lt=nd,time__lt=nt)
           Attendance_count=Attendance.objects.filter( exam__in=exams).count()
           expected_attendance = 0
           for exam in exams:
              expected_students = Student.objects.filter(
                level=exam.subject.level,
                speciality=exam.subject.speciality
               ).count()
              expected_attendance += expected_students
            
            
            
            
           absences_count = expected_attendance - Attendance_count
           return JsonResponse({"absences_count": absences_count, "attendance_count": Attendance_count})


from django.db.models import Q

class StudentStats(APIView):

    permission_classes =[IsAuthenticated]

    def get(self, request, *args, **kwargs):
         
        semester1=self.kwargs['semester']
        student_instance = get_object_or_404(Student, Name=request.user)

        level1= student_instance.level
        spesiality1= student_instance.speciality
        exam=Exam.objects.filter(subject__level=level1,subject__speciality=spesiality1,subject__semester=semester1)
        exam_count=exam.count()
        now = timezone.now()
        nd=now.date()
        nt=now.time()
        exams=exam.filter(date__lt=nd, time__lt=nt)
        exam_1= 0
        for e in exam:
            exam_datetime = timezone.make_aware(datetime.combine(e.date, e.time))
            if exam_datetime < now:
             exam_1+=1
            
        Attendance_count =Attendance.objects.filter(student= student_instance,exam__in=exams).count()

        absence_count= exam_1 - Attendance_count
        nom=request.user.last_name
        prenom=request.user.first_name
        return JsonResponse({"absences_count": absence_count, "attendance_count": Attendance_count,"exam_count": exam_count,"nom":nom,"prenom":prenom})


class teacherstats(APIView):

    permission_classes =[IsAuthenticated]

    def get(self, request, *args, **kwargs):
        
        teacher_instance = get_object_or_404(teacher, user=request.user)
        #teacherin = get_object_or_404(User, id=request.user)
        lname1 = teacher_instance.user.last_name
        fname1= teacher_instance.user.first_name
        modul_count= teach.objects.filter(teacher= teacher_instance).count()
        duties_count= surveillance.objects.filter(teacher= teacher_instance).count()
                        
        subjects = subject.objects.filter(
         id__in=teach.objects.filter(teacher=teacher_instance).values_list('subject__id', flat=True)
          )
        now = timezone.now()
        nd=now.date()
        nt=now.time()
        exams= Exam.objects.filter(subject__in=subjects,date__lt=nd,time__lt=nt)
        
        
        Attendance_count=Attendance.objects.filter(exam__in=exams).count()
       
        expected_attendance = 0
        for exam in exams:
              expected_students = Student.objects.filter(
                level=exam.subject.level,
                speciality=exam.subject.speciality
               ).count()
              expected_attendance += expected_students
              
        level1=subject.objects.filter(id__in=subjects).values_list('level', flat=True)
        spe1 =subject.objects.filter(id__in=subjects).values_list('speciality', flat=True)
        student_count= Student.objects.filter(level__in= level1,speciality__in=spe1).count()

        absences_count = expected_attendance - Attendance_count

        return JsonResponse({"last_name":lname1,"first_name":fname1,"modul_count":modul_count,"duties_count":duties_count,"student_count":student_count ,"absences_count": absences_count, "attendance_count": Attendance_count})

        


class teacher_par_Spécialité(APIView):
   
    permission_classes =[IsAuthenticated]  # Require authentication
    def get(self, request, *args, **kwargs):
           spes=self.kwargs['spes']
          
          
         
           teacher_instance = get_object_or_404(teacher, user=request.user)
           subjects = subject.objects.filter(
             id__in=teach.objects.filter(teacher=teacher_instance).values_list('subject__id', flat=True)
              )
           now = timezone.now()
           nd=now.date()
           nt=now.time()
           exams= Exam.objects.filter(subject__in=subjects,date__lt=nd,time__lt=nt,subject__speciality=spes)
           Attendance_count=Attendance.objects.filter( exam__in=exams).count()
           expected_attendance = 0
           for exam in exams:
              expected_students = Student.objects.filter(
                level=exam.subject.level,
                speciality=exam.subject.speciality
               ).count()
              
              expected_attendance += expected_students
            
           subject_total=subject.objects.filter(speciality=spes)
            
           teacher_count=teacher.objects.filter(
                id__in=teach.objects.filter(subject__in=subject_total).values_list('teacher__id', flat=True)
              ).count()
            
           absences_count = expected_attendance - Attendance_count
           return JsonResponse({"absences_count": absences_count, "attendance_count": Attendance_count,"teacher_count":teacher_count})


 




class teacher_par_level(APIView):
   
    permission_classes =[IsAuthenticated] # Require authentication
    def get(self, request, *args, **kwargs):
           spes=self.kwargs['level']
           teacher_instance = get_object_or_404(teacher, user=request.user)
           subjects = subject.objects.filter(
             id__in=teach.objects.filter(teacher=teacher_instance).values_list('subject__id', flat=True)
              )
           now = timezone.now()
           nd=now.date()
           nt=now.time()
           exams= Exam.objects.filter(subject__in=subjects,date__lt=nd,time__lt=nt,subject__level=spes)
           Attendance_count=Attendance.objects.filter( exam__in=exams).count()
           expected_attendance = 0
           for exam in exams:
              expected_students = Student.objects.filter(
                level=exam.subject.level,
                speciality=exam.subject.speciality
               ).count()
              expected_attendance += expected_students
            
           subject_total=subject.objects.filter(level=spes)
            
           teacher_count=teacher.objects.filter(
                id__in=teach.objects.filter(subject__in=subject_total).values_list('teacher__id', flat=True)
               ).count() 
            
            
           absences_count = expected_attendance - Attendance_count
           return JsonResponse({"absences_count": absences_count, "attendance_count": Attendance_count,"teacher_count":teacher_count})





from .serializers import ChangePasswordSerializer

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data['old_password']):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"detail": "Password updated successfully"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from .serializers import UpdateSecretNumberSerializer

class UpdateSecretNumberView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            teacher1 =teacher.objects.get(user=request.user)
        except teacher1.DoesNotExist:
            return Response({'detail': 'Teacher not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateSecretNumberSerializer(teacher, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'detail': 'Secret number updated successfully.'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class examsinfo(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        exam_id = self.kwargs['exam_id']
        exam = get_object_or_404(Exam, id=exam_id)

        return JsonResponse({
            "date": exam.date.isoformat(),
            "time": exam.time.strftime("%H:%M:%S")
        })


class examsinfo2(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        exam_name= self.kwargs['exam']

        exam= get_object_or_404(Exam, subject__name= exam_name)

        return JsonResponse({
        
            "date": exam.date.isoformat(),
            "time": exam.time.strftime("%H:%M:%S")
        })
