# Generated by Django 3.0.8 on 2020-08-23 18:33

import django.contrib.auth.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserSettings',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False, verbose_name=django.contrib.auth.models.User)),
                ('master_password', models.CharField(max_length=500)),
                ('theme', models.CharField(default='light', max_length=50)),
                ('language', models.CharField(default='eng', max_length=10)),
            ],
        ),
    ]
