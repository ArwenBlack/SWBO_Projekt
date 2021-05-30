from django.db import models


class Comment(models.Model):
    author_name = models.CharField(max_length=20)
    date = models.DateField()
    content = models.TextField(max_length=250)

    def __str__(self):
        return self.author_name
