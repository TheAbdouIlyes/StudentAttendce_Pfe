from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Student, Exam, Attendance,AuthTable,subject
from .serializers import StudentSerializer, ExamSerializer, AttendanceSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = [AllowAny]

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [AllowAny]
import qrcode
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.base import ContentFile
import base64

class GenerateQRCode(APIView):
    



    import qrcode
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from io import BytesIO
import base64
class QRCodeView(APIView):
    def post(self, request):
        # Process the QR code data
        qr_data = request.data.get('data')
        # Perform your action here (e.g., save to database, etc.)
        return Response({"message": "Data received", "data": qr_data}, status=status.HTTP_200_OK)
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
        
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def handle_scan(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            qr_data = data.get('qr_data')

            # Perform actions based on the QR code data
            if qr_data == 'product_12345':
                # Fetch product details or perform an action
                response_data = {'status': 'success', 'message': 'Product found!', 'product_id': '12345'}
            else:
                response_data = {'status': 'error', 'message': 'Invalid QR code'}

           
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
@csrf_exempt
def login_with_email_phone(request):
    if request.method == "POST":
        data = json.loads(request.body)
        address = data.get("address")
        phone_number = data.get("phone_number")

        user = authenticate(address=address, phone_number=phone_number)
        if user:
            refresh = RefreshToken.for_user(user) 
            
            # Logs the user in
            return JsonResponse({
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({"error": "Invalid email or phone number"}, status=401)
        

import random
import string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import AuthTable
from .serializers import AuthTableSerializer
from rest_framework.permissions import IsAuthenticated

class CreateAuthTableView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users with AuthTable can create new ones

    def post(self, request):
        # Ensure the requesting user already has an AuthTable
        if not AuthTable.objects.filter(user=request.user).exists():
            return Response({"error": "You must have an AuthTable to create another user."}, status=status.HTTP_403_FORBIDDEN)

        new_username = request.data.get("username")  # Use new_username instead of username
        phone_number = request.data.get("phone_number")
        address = request.data.get("address")

        if not new_username:
            return Response({"error": "Username is required for the new user."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user already exists
        if User.objects.filter(username=new_username).exists():
            return Response({"error": "User with this username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Generate a random password (since Django requires one)
        random_password = "".join(random.choices(string.ascii_letters + string.digits, k=12))

        # Create the new user
        new_user = User.objects.create_user(username=new_username, password=random_password)

        # Create the AuthTable entry for the new user
        auth_table_entry = AuthTable.objects.create(user=new_user, phone_number=phone_number, address=address)
        serializer = AuthTableSerializer(auth_table_entry)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


from django.http import JsonResponse
@csrf_exempt
def log_visit(request):
    if request.method == "POST":
        print(f"Page visited: {request.POST.get('page')}")
        return JsonResponse({"message": "Visit logged"})
