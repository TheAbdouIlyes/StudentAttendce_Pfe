"""
URL configuration for attendance_system project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from exams import views
from exams.views import GenerateQRCode
from exams.views import CreateteacherView,subjectCreate,login_with_matricul_secret,login_with_matricul_roll,is_presente,CreatestudView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView




urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('generate-qr/', GenerateQRCode.as_view(), name='generate-qr'),
   
    path('teacher_l/',login_with_matricul_secret,name='t_login'),
    path('stud_l/',login_with_matricul_roll,name='s_login'),
    
    path('teacher/', CreateteacherView.as_view(), name='create-teacher'),
    path('t/', TokenObtainPairView.as_view(), name="get_token"),
    path('s/', subjectCreate.as_view(), name="subject_create"),
    path('att/<int:pk1>/etu/<int:pk>/', is_presente.as_view(), name="present"),
    path('stud/',CreatestudView.as_view(),name='c_stud'),
   
   ]
