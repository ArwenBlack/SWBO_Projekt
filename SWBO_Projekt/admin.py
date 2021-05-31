from django.contrib import admin
from django.contrib.auth.models import User

from .models import *


class CommentAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'date', 'content')


admin.site.register(Comment, CommentAdmin)
