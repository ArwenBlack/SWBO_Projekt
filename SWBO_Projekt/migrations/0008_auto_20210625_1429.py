# Generated by Django 3.2.3 on 2021-06-25 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SWBO_Projekt', '0007_auto_20210625_1334'),
    ]

    operations = [
        migrations.AlterField(
            model_name='character',
            name='race',
            field=models.CharField(default='none', max_length=200),
        ),
        migrations.AlterField(
            model_name='character',
            name='url',
            field=models.CharField(default='none', max_length=50),
        ),
    ]
