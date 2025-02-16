from . import views
from django.urls import path


urlpatterns = [
 path("createetud/", views.etudiantCreate.as_view(), name="task-list"),
 path("createexama/", views.createExam.as_view(), name="task-list"),
]