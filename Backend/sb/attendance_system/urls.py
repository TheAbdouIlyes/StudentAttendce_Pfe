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
from exams.views import QRCodeView,handle_scan,login_with_email_phone,CreateAuthTableView,log_visit

router = DefaultRouter()
router.register(r'students', views.StudentViewSet)
router.register(r'exams', views.ExamViewSet)
router.register(r'attendance', views.AttendanceViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('generate-qr/', GenerateQRCode.as_view(), name='generate-qr'),
   path('api/scan/', handle_scan, name='handle_scan'),
   path('p/',login_with_email_phone,name='login'),
   path('c/', CreateAuthTableView.as_view(), name='create-auth-table'),
    path("api/log-visit/", log_visit, name="log-visit")
   ]