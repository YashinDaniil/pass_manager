from django.db import models
from django.contrib.auth.models import User


class Card(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    number = models.CharField(max_length=25)
    cvv = models.CharField(max_length=100)
    password = models.CharField(max_length=10)
    data = models.DateField()
    name = models.CharField(max_length=300)
    payment_system = models.CharField(max_length=75)
    creation_date = models.DateField()
