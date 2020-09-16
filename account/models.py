from django.db import models
from django.contrib.auth.models import User


class UserSettings(models.Model):
    user_id = models.AutoField(User, primary_key=True)
    master_password = models.CharField(max_length=500)
    theme = models.CharField(max_length=50, default='light')
    language = models.CharField(max_length=10, default='eng')
