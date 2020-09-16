from django.db import models
from django.contrib.auth.models import User


class PasswordSec(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    url = models.CharField(max_length=300)
    name = models.CharField(max_length=300)
    username = models.CharField(max_length=300)
    password = models.CharField(max_length=300)
    category = models.CharField(max_length=300)
    creation_date = models.DateField(auto_now_add=True, blank=True)
