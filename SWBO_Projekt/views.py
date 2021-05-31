from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import *
from rest_framework.permissions import AllowAny

from .serializers import *
from .models import *


class CreateUserRegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer


class CommentView (ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

