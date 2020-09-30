from django.db import models
from django.contrib.auth.models import User


class Card(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    number = models.CharField(max_length=125)
    cvv = models.CharField(max_length=100)
    password = models.CharField(max_length=110)
    date = models.CharField(max_length=30)
    name = models.CharField(max_length=300)
    creation_date = models.DateField(auto_now_add=True, blank=True)
