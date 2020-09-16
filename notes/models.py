from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    content = models.CharField(max_length=25)
    creation_date = models.DateField()
