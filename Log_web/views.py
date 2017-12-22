from django.shortcuts import render
from django.http import HttpResponse
import json
from Log_web.models import *
from django.db import connection

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
	except Exception:
		return HttpResponse(json.dumps({
				'statCode' : -1,
				'errormessage' : 'Cannot get username or password!',
			}))
	cursor = connection.cursor()
	flag = cursor.execute("select * from Log_web_login_user\
		where username = %s",[username])
	if not (flag):
		return HttpResponse(json.dumps({
				'statCode' : -2,
				'errormessage' : 'User account not exist!',
			}))
	else:
		row = cursor.fetchone()
		if(row[1]==password):
			request.session['username'] = username
			return HttpResponse(json.dumps({
					'statCode' : 0,
					'username' : username
				}))
		else:
			return HttpResponse(json.dumps({
					'statCode' : -3,
					'errormessage' : 'Wrong password!',
				}))

def signUp(request):
	try:
		username = request.POST['username']
		password = request.POST['password']
	except Exception:
		return HttpResponse(json.dumps({
				'statCode' : -1,
				'errormessage' : 'Cannot get username or password!',
			}))
	cursor = connection.cursor()
	flag = cursor.execute("select * from Log_web_login_user\
		where username = %s",[username])
	if flag:
		return HttpResponse(json.dumps({
				'statCode' : -2,
				'errormessage' : 'Username exist!',
			}))
	else:
		cursor.execute("insert into Log_web_login_user values(%s,%s,1)",[username,password])
		return HttpResponse(json.dumps({
				'statCode' : 0,
				'successmessage' : 'Rigester Success! Welcome '+username+' !',
			}))



