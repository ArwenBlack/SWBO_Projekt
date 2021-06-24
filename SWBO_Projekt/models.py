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
    book_1  = models.IntegerField(default=0)
    book_2 = models.IntegerField(default=0)
    book_3 = models.IntegerField(default=0)
    book_hobbit = models.IntegerField(default=0)
