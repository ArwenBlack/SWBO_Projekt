from django.contrib.auth import get_user_model
from django.shortcuts import render
from knox.models import AuthToken
from rest_framework import viewsets, generics
from rest_framework.generics import *
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import *
from .models import *


class CreateUserRegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

class LoginUserView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserGetView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PostView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostCreate(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDelete(DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostEdit(UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CommentView(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentCreate(CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentDelete(DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentEdit(UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CharcterView(ListAPIView):
    queryset = Character.objects.all()
    serializer_class = CharactersSerializer


class CharacterWordsView(ListAPIView):
    queryset = WordbyCharcter.objects.all()
    serializer_class = CharactersWordsSerializer