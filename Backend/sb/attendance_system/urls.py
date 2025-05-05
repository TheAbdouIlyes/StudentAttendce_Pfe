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
from exams.views import  ChangePasswordView,teacher_par_level,teacher_par_Spécialité,teacherstats,StudentStats,Présences_par_level,Présences_par_Spécialité,adminstats,Examserv, TeacherSubjectsId,not_teaching,teacher_not_present,TeacherexamsView,TeacherSubjectsView,students_by_subject,students_by_exam,SubjectUpdateView,studentinfo,TeacherDeleteAPIView,StudentDeleteAPIView,castomExam,teacherinfo,subjectlist,Examlist,StudentProfileView,delete_subject,delete_exam,ExamListByLevelAndSpeciality,CreateteacherView,subjectCreate,login_with_matricul_secret,login_with_matricul_roll,is_presente,CreatestudView,ExamUpdate,UpdateTeacherView,UpdateStudentView,teaching,teacher_present,ListStudentView,ListTeacherView,ListTeachView,ListSurveillanceView,studentListByspesialityandLevel,subjetListByspecialityandlevelandsemester,CheckTokenView,LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



urlpatterns = [

    path('admin/', admin.site.urls),

    path('generate-qr/', GenerateQRCode.as_view(), name='generate-qr'),
    path("exam/update/<int:pk>/",ExamUpdate.as_view(),name='exam_update'),
    path('teacher_l/',login_with_matricul_secret,name='t_login'),
    path('stud_l/',login_with_matricul_roll,name='s_login'),
    path('teacher/', CreateteacherView.as_view(), name='create-teacher'),
    path('t/', TokenObtainPairView.as_view(), name="get_token"),
    path('subject/',subjectCreate.as_view(), name="subject_create"),
    path('etu/<matricul>/exa/<exam_name>/', is_presente.as_view(), name="present"),
   # path('',.as_view(),name=),
    path('u_teacher/<int:teacher_id>',UpdateTeacherView.as_view(),name="update_teacher"),
    path('u_student/<int:student_id>',UpdateStudentView.as_view(),name="update_student"),
    path('tea/<matricul>/sub/<subject_name>/',teaching.as_view(),name="t_teaching"),
    path('tea/<matricul>/exa/<exam_name>/',teacher_present.as_view(),name="t_present"),
    path('tea/<matricul>/sub/<subject_name>/not',not_teaching.as_view(),name="not_t_teaching"),
    path('tea/<matricul>/exa/<exam_name>/not',teacher_not_present.as_view(),name="not_t_present"),
    path('student_list/',ListStudentView.as_view(),name="student_list"),
    path('Teacher_list/',ListTeacherView.as_view(),name="Teacher_list"),
    path('stud/',CreatestudView.as_view(),name='c_stud'),
    path('modul/<int:pk>',ListTeachView.as_view(),name="list_teach"),
    path('observer/<int:pk>',ListSurveillanceView.as_view(),name="observer"),
    path('student_par_specialitylevel/<str:spe>/<str:level>',studentListByspesialityandLevel.as_view(),name="student_par_speciality"),
    path('subject/<str:spe>/<str:spe1>/<str:spe2>/',subjetListByspecialityandlevelandsemester.as_view(),name="subjetList_By_speciality_level_semester"),
    path('check-token/', CheckTokenView.as_view(), name='check-token'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('exam_list/<level>/<speciality>/<semester>',ExamListByLevelAndSpeciality.as_view(),name="exam_list"),
    
    path('delete_subject/<int:name>', delete_subject.as_view(), name='delete_subject'),
    path('delete_exam/<int:pk>', delete_exam.as_view(), name='delete_exam'),
    path('student/profile/',StudentProfileView.as_view(),name="student_profile"),
    
    path('exams/', Examlist.as_view(), name='exam-list'),
    path('subjects/', subjectlist.as_view(), name='subject-list'),
    path('student/info/<int:pk>',studentinfo.as_view(),name="studentinfo"),
    path('teacher/info/<int:pk>',teacherinfo.as_view(),name="teacherinfo"),
  #    path('teacher/subject',teacher_subjects,name="teacher_subjects"),
    path('student/exam/<str:s>',castomExam.as_view(),name='student_exam'),

    path('student/delete/<int:pk>/', StudentDeleteAPIView.as_view(), name='student_delete_api'),
    path('teacher/delete/<int:pk>/', TeacherDeleteAPIView.as_view(), name='teacher_delete_api'),
    path("subject/update/<int:pk>/", SubjectUpdateView.as_view(), name="subject-update"),
    path('student/exams/<int:exam_id>', students_by_exam.as_view(),name=" get_students_by_exam"),
    path('student/subject/<str:subject_name>', students_by_subject.as_view(),name=" get_students_by_subject"),

    path('teacher_subjects/<str:s>', TeacherSubjectsView.as_view(), name='teacher_subjects'),
    path('teacher_exams/<str:s>', TeacherexamsView.as_view(), name='teacher_exams'),
    path('teacher_subject/<int:tea_id>', TeacherSubjectsId.as_view(), name='teacher_subjects_b_id'),

    path('teacher/<str:s>/exam/<str:ex>',Examserv.as_view(),name="tea_examserv"),
    path('adminstats/',adminstats.as_view(),name="admin_stats"),
    path('change-password/',ChangePasswordView.as_view(),name="update_password"),
    path('Présences_par_Spécialité/<str:spes>',Présences_par_Spécialité.as_view(),name="Présences_par_Spécialité"),
    path('Présences_par_level/<str:level>',Présences_par_level.as_view(),name="Présences_par_level"),
    path('studentstats/<str:semester>',StudentStats.as_view(),name="student_stats"),
    path('teacher/stats',teacherstats.as_view(),name="teacher_stats"),
    path('teacher_par_Spécialité/<str:spes>',teacher_par_Spécialité.as_view(),name="teacher_par_Spécialité"),
    path('teacher_par_level/<str:level>',teacher_par_level.as_view(),name="teacher_par_level"),
   ]

