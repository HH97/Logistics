from django.db import models

# Create your models here.
class Login_user(models.Model):
	#attributes:
	username = models.CharField(max_length=50,unique=True,primary_key=True)
	password = models.CharField(max_length=50)
	count_type = models.IntegerField()
	