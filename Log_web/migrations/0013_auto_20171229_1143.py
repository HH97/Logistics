# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-29 11:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Log_web', '0012_auto_20171228_1539'),
    ]

    operations = [
        migrations.AddField(
            model_name='package_receive',
            name='name',
            field=models.CharField(default='--', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='package_send',
            name='name',
            field=models.CharField(default='--', max_length=20),
            preserve_default=False,
        ),
    ]