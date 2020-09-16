# Generated by Django 3.0.8 on 2020-08-23 18:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('number', models.CharField(max_length=25)),
                ('cvv', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=10)),
                ('data', models.DateField()),
                ('name', models.CharField(max_length=300)),
                ('payment_system', models.CharField(max_length=75)),
                ('creation_date', models.DateField()),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
