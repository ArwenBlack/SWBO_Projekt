from django.contrib import admin
from django.contrib.auth.models import User

from .models import *

class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'title', 'content', 'date')


class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'mother_post', 'author', 'content', 'date')


admin.site.register(Comment, CommentAdmin)
admin.site.register(Post, PostAdmin)