from django.contrib import admin
from .models import Comment


class CommentAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'date', 'content')


admin.site.register(Comment, CommentAdmin)
