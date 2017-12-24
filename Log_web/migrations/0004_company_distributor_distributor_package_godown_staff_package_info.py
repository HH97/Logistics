# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-24 07:38
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Log_web', '0003_godown'),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('sum_money', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Distributor',
            fields=[
                ('distributor_id', models.AutoField(primary_key=True, serialize=False)),
                ('godown_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Log_web.Godown')),
            ],
        ),
        migrations.CreateModel(
            name='Distributor_package',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('distributor_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Log_web.Distributor')),
                ('package_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Log_web.Package')),
            ],
        ),
        migrations.CreateModel(
            name='Godown_staff',
            fields=[
                ('staff_id', models.AutoField(primary_key=True, serialize=False)),
                ('godown_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Log_web.Godown')),
            ],
        ),
        migrations.CreateModel(
            name='Package_info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.FloatField()),
                ('transport_form', models.IntegerField()),
                ('loaction', models.CharField(max_length=100)),
                ('status', models.CharField(max_length=100)),
                ('Distributor_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Log_web.Distributor')),
                ('package_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='Log_web.Package')),
            ],
        ),
    ]