from datetime import datetime

from django.contrib.auth.models import UserManager
from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=55)
    content = models.TextField(max_length=500)
    date = models.DateTimeField(default=datetime.now)

class Comment(models.Model):
    mother_post = models.ForeignKey(Post, default = None, null = True, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=500)
    date = models.DateTimeField(default=datetime.now)


class Character(models.Model):
    name = models.CharField(max_length=50)
    url = models.CharField(max_length=200, default="none")
    race = models.CharField(max_length=50, default="none")


class WordbyCharcter(models.Model):
    book = models.CharField(max_length=50)
    chapter = models.CharField(max_length=100, default='none')
    character = models.CharField(max_length=50)
    race = models.CharField(max_length=50)
    words = models.IntegerField(default=0)
