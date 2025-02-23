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
from exams.views import examlist,CreateteacherView,subjectCreate,login_with_matricul_secret,login_with_matricul_roll,is_presente,CreatestudView,ExamUpdate,UpdateTeacherView,UpdateStudentView,teaching,teacher_present,ListStudentView,ListTeacherView,ListTeachView,ListSurveillanceView,StudentListByLevel,studentListByspesiality,subjetListByspecialityandlevelandsemester,CheckTokenView,LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView




urlpatterns = [

    path('admin/', admin.site.urls),
    
    path('generate-qr/', GenerateQRCode.as_view(), name='generate-qr'),
    path("exam/update/<int:pk>/",ExamUpdate.as_view(),name='exam_update'),
    path('teacher_l/',login_with_matricul_secret,name='t_login'),
    path('stud_l/',login_with_matricul_roll,name='s_login'),
    path('teacher/', CreateteacherView.as_view(), name='create-teacher'),
    path('t/', TokenObtainPairView.as_view(), name="get_token"),
    path('s/', subjectCreate.as_view(), name="subject_create"),
    path('att/<int:pk1>/etu/<int:pk>/', is_presente.as_view(), name="present"),
   # path('',.as_view,name=),
    path('u_teacher/<int:teacher_id>',UpdateTeacherView.as_view(),name="update_teacher"),
    path('u_student/<int:student_id>',UpdateStudentView.as_view(),name="update_student"),
    path('tea/<int:pk>/sub/<int:pk1>/',teaching.as_view(),name="t_teaching"),
    path('tea/<int:pk>/exa/<int:pk1>/',teacher_present.as_view(),name="t_present"),
    path('student_list/',ListStudentView.as_view(),name="student_list"),
    path('Teacher_list/',ListTeacherView.as_view(),name="Teacher_list"),
    path('stud/',CreatestudView.as_view(),name='c_stud'),
    path('modul/<int:pk>',ListTeachView.as_view(),name="list_teach"),
    path('observer/<int:pk>',ListSurveillanceView.as_view(),name="observer"),
    path('student_par_level/<str:level>',StudentListByLevel.as_view(),name="student_par_level"),
    path('student_par_speciality/<str:spe>',studentListByspesiality.as_view(),name="student_par_speciality"),
    path('subject/<str:spe>/<str:spe1>/<str:spe2>/',subjetListByspecialityandlevelandsemester.as_view(),name="subjetList_By_speciality_level_semester"),
    path('check-token/', CheckTokenView.as_view(), name='check-token'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('exam_list/',examlist.as_view(),name="exam_list"),


   ]

