from django.db import models
from django.contrib.auth.models import User


class Location(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    country = models.CharField(max_length=25)
    city = models.CharField(max_length=100)
    street = models.CharField(max_length=10)
    house = models.DateField()
    flat = models.CharField(max_length=300)
    creation_date = models.DateField()
