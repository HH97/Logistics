from django.shortcuts import render
from django.http import HttpResponse
import json
from Log_web.models import *
from django.db import connection
import traceback

# Create your views here.
def index(request):
	request.session['username'] = ''
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
			#根据用户的类型需要跳转到不同的页面
			count_type = row[2]
			if count_type == 1 : 
				return HttpResponse(json.dumps({
						'statCode' : 0,
						'username' : username
					}))
			elif count_type == 2:
				return HttpResponse(json.dumps({
						'statCode' : 1,
						'username' : username
					}))
			else:
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
		cursor.execute("insert into Log_web_user_info values(%s,0,0,0,0,0)",[username])
		return HttpResponse(json.dumps({
				'statCode' : 0,
				'successmessage' : 'Rigester Success! Welcome '+username+' !',
			}))

def sendPackage(request):
	return render(request,'send_package.html')

def getProvince(request):
	cursor = connection.cursor()
	cursor.execute("select distinct addr_pro from Log_web_godown")
	row = cursor.fetchall()
	res = {}
	res['province'] = row
	return HttpResponse(json.dumps(res))

def getCity(request):
	try:
		provincename = request.GET['province']
	except Exception:
		return HttpResponse(json.dumps({
				'city' : '--',
			}))
	cursor = connection.cursor()
	cursor.execute("select distinct addr_city from Log_web_godown \
		where addr_pro = %s",[provincename])
	row = cursor.fetchall()
	res = {}
	res['city'] = row
	return HttpResponse(json.dumps(res))

def userPackage(request):
	try:
		mes = {}
		mes['sendName'] = request.POST["SenderName"]
		mes['sendTel'] = request.POST["SenderTele"]
		mes['sendPro'] = request.POST["SenderProvince"]
		mes['sendCity'] = request.POST["SenderCity"]
		mes['sendRegion'] = request.POST["SenderRegion"]
		mes['sendStreet'] = request.POST["SenderStreet"]
		mes['recName'] = request.POST["ReceiverName"]
		mes['recTel'] = request.POST["ReceiverTele"]
		mes['recPro'] = request.POST["ReceiverProvince"]
		mes['recCity'] = request.POST["ReceiverCity"]
		mes['recRegion'] = request.POST["ReceiverRegion"]
		mes['recStreet'] = request.POST["ReceiverStreet"]
		mes['transType'] = request.POST["TransType"]
	except Exception:
		return HttpResponse(json.dumps({
				'statCode' : -1,
				'errormessage' : 'POST Error!',
			}))
	try:
		if request.session['username'] == '':
			return HttpResponse(json.dumps({
					'statCode' : -2,
					'errormessage' : 'Please sign in first!',
				}))
		cursor = connection.cursor()
		cursor.execute('insert into Log_web_package values(0,%s)',
			[request.session['username']])
		package_id = cursor.lastrowid
		print('package_id %d',package_id)
		cursor.execute('insert into Log_web_package_send\
			(id,package_id_id,addr_pro,addr_city,addr_district,addr_block,tel)\
			values(0,%s,%s,%s,%s,%s,%s)',[
				str(package_id),
				mes['sendPro'],
				mes['sendCity'],
				mes['sendRegion'],
				mes['sendStreet'],
				mes['sendTel']
			])
		cursor.execute('insert into Log_web_package_receive\
			(id,package_id_id,addr_pro,addr_city,addr_district,addr_block,tel)\
	 		values(0,%s,%s,%s,%s,%s,%s)',[
				str(package_id),
				mes['recPro'],
				mes['recCity'],
				mes['recRegion'],
				mes['recStreet'],
				mes['recTel']
			])
		#获取仓库所在地
		cursor.execute('select godown_id from Log_web_godown \
			where addr_pro=%s && addr_city=%s order by rand()',
			[mes['sendPro'],mes['sendCity']])
		row = cursor.fetchall()
		godown_id = row[0][0]
		#将信息填入包裹信息表
		cursor.execute('insert into Log_web_package_info \
			values(0,0.0,%s,%s,null,%s,%s)',[
				mes['transType'],
				'等待揽收',
				str(godown_id),
				str(package_id),
			])
		#更新用户信息表
		cursor.execute('update Log_web_user_info set tel=%s , addr_pro=%s , \
			addr_city=%s , addr_district=%s , addr_block=%s \
			where user_name = %s',[
				mes['sendTel'],
				mes['sendPro'],
				mes['sendCity'],
				mes['sendRegion'],
				mes['sendStreet'],
				request.session['username']
			])
		return HttpResponse(json.dumps({
				'statCode' : 0,
				'successmessage' : '您的包裹ID为'+str(package_id)+",正在等待揽收",
			}))
	except Exception:
		traceback.print_exc()
		return HttpResponse(json.dumps({
				'statCode' : -2,
				'errormessage' : 'Backend processing Error!',
			}))

def userInfo(request):
	try:
		if request.session['username'] == '':
			return render(request,"user_info.html",
				{'name':'--','tel':'--','address':'--'})
		else:
			cursor = connection.cursor()
			cursor.execute('select * from Log_web_user_info where user_name = %s'
				,[request.session['username']])
			row = cursor.fetchall()
			tel = row[0][5]
			address = row[0][1] + row[0][2] + row[0][3] + row[0][4]
			return render(request,"user_info.html",{
					'name':request.session['username'],
					'tel':tel,
					'address':address
				})
	except Exception:
		return render(request,"user_info.html",
				{'name':'--','tel':'--','address':'--'})

def userPackages(request):
	try:
		res_mes = []
		if request.session['username'] == '':
			package = {}
			package['id'] = '--'
			package['status'] = '--'
			package['position'] = '--'
			package['distributor'] = '--'
			res_mes.append(package)
		else:
			username = request.session['username']
			cursor = connection.cursor()
			flag = cursor.execute('select package_id_id , Distributor_id_id,\
				godown_id_id,status from Log_web_package_info \
				where package_id_id in (select package_id \
				from Log_web_package where username_id = %s)',[username])
			if flag:
				packages = cursor.fetchall()
				for pack in packages:
					pack_tmp = {}
					pack_tmp['id'] = pack[0]
					pack_tmp['status'] = pack[3]
					pack_tmp['distributor'] = pack[1]
					godown_tmp = pack[2]
					cursor.execute("select addr_pro,addr_city from Log_web_godown\
						where godown_id = %s",[godown_tmp])
					row = cursor.fetchall()
					pack_tmp['position'] = row[0][0] + row[0][1]
					res_mes.append(pack_tmp)
			else:
				package = {}
				package['id'] = '--'
				package['status'] = '--'
				package['position'] = '--'
				package['distributor'] = '--'
				res_mes.append(package)
		return render(request,"to_be_received_packages.html",{
					'packages':res_mes
				})
	except Exception:
		return render(request,"to_be_received_packages.html",{
					'packages':res_mes
				})

def godownKeeper(request):
	try:
		res_mes = []
		if request.session['username'] == '':
			package = {}
			package['id'] = '--'
			package['status'] = '--'
			res_mes.append(package)
		else:
			cursor = connection.cursor()
			cursor.execute('select count_type from Log_web_login_user \
				where username = %s',[request.session['username']])
			user_type = cursor.fetchall()[0][0]
			if not user_type == 2:
				package = {}
				package['id'] = '--'
				package['status'] = '--'
				res_mes.append(package)
			else:
				#首先获得godownid，再查包裹
				flag = cursor.execute('select package_id_id , status \
					from Log_web_package_info \
					where godown_id_id in \
					(select godown_id from Log_web_godown_staff \
					where staff_id=%s)',[request.session['username']])
				if flag:
					packages = cursor.fetchall()
					for pack in packages:
						pack_tmp = {}
						pack_tmp['id'] = pack[0]
						pack_tmp['status'] = pack[1]
						res_mes.append(pack_tmp)
				else:
					package = {}
					package['id'] = '--'
					package['status'] = '--'
					res_mes.append(package)
		return render(request,"godown_keeper.html",{'packages':res_mes})
	except Exception:
		traceback.print_exc()
		return render(request,"godown_keeper.html",{'packages':res_mes})
