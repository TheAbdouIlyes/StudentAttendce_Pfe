
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import etudiantSerializer,examSerializer,presenceSerializer
from .models import etudiant,exam,presence
from rest_framework.response import Response
from rest_framework import status



class etudiantCreate(generics.ListCreateAPIView):
    queryset = etudiant.objects.all()
    serializer_class = etudiantSerializer
    permission_classes = [AllowAny]






class createExam(generics.ListCreateAPIView):
    queryset = exam.objects.all()
    serializer_class = examSerializer
    permission_classes = [AllowAny]
    def perform_create(self, serializer):
        """
        Méthode appelée lors de la création d'un examen.
        Elle sauvegarde l'examen puis crée automatiquement les présences.
        """
        exam_instance = serializer.save()  # Sauvegarde l'examen
        etudiants = etudiant.objects.all()  # Récupère tous les étudiants

        # Créer une présence pour chaque étudiant
        presences = [presence(etudiant=etu, exam=exam_instance) for etu in etudiants]
        presence.objects.bulk_create(presences)  

class is_presente(generics.UpdateAPIView):
       serializer_class = presenceSerializer
       permission_classes = [AllowAny]
       def get_object(self):
        id = self.kwargs['pk']
        id1 = self.kwargs['pk1']
        
        try:
            # Attempt to retrieve the presence object
            pre = presence.objects.get(etudiant=id, exam=id1)
            return pre
        except presence.DoesNotExist:
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

      
      