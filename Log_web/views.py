from django.shortcuts import render
from django.http import HttpResponse
import json
from Log_web.models import *

# Create your views here.
def index(request):
    return render(request,'index.html') 

def login(request):
	return render(request,'login.html')

def register(request):
	return render(request,'register.html')

def user(request):
	return render(request,'user.html')

def signIn(request):
	try:
		username = request.POST['username']
		password = request.POST['password']
		print(username)
		print(password)
	except Exception:
		return HttpResponse(json.dumps({
				'statCode' : -1,
				'errormessage' : 'Cannot get username or password!',
			}))
	try:
		u = Login_user.objects.get(username = username)
	except Exception:
		return HttpResponse(json.dumps({
				'statCode' : -2,
				'errormessage' : 'User account not exist!',
			}))
	if(password != u.password):
		return HttpResponse(json.dumps({
				'statCode' : -3,
				'errormessage' : 'Wrong password!',
			}))
	else:
		return HttpResponse(json.dumps({
				'statCode' : 0,
				'username' : username
			}))
	

