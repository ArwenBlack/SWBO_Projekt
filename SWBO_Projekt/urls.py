"""SWBO_Projekt URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.urls import path, re_path
from SWBO_Projekt import views
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', views.CommentView.as_view(), name="home"),
    path('create_user/', views.CreateUserRegisterView.as_view(), name = 'register'),
    path('login/', views.LoginUserView.as_view(), name = 'login'),
    path('user/', views.UserView.as_view(), name = 'user'),
    path('user/<int:pk>/', views.UserGetView.as_view(), name = 'user_get'),
    path('post/', views.PostView.as_view(), name = "post"),
    path('post/create/', views.PostCreate.as_view(), name = "post_create"),
    path('post/delete/<int:pk>/', views.PostDelete.as_view(), name = "post_delete"),
    path('post/edit/<int:pk>/', views.PostEdit.as_view(), name = "post_edit"),
    path('comment/', views.CommentView.as_view(), name = "comment"),
    path('comment/create/', views.CommentCreate.as_view(), name = "comment_create"),
    path('comment/delete/<int:pk>/', views.CommentDelete.as_view(), name = "comment_delete"),
    path('comment/edit/<int:pk>/', views.CommentEdit.as_view(), name = "comment_edit"),
    path('characters/', views.CharcterView.as_view(), name = "character"),
    path('characters_words/', views.CharacterWordsView.as_view(), name = "character_words"),
    re_path(".*", TemplateView.as_view(template_name='index.html'))


]
