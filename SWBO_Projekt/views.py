from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import ListAPIView

from .serializers import CommentSerializer
from .models import Comment

class CommentView (ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

