from django.db import models

# Create your models here.
#登录用户信息表
class Login_user(models.Model):
	#attributes:
	username = models.CharField(max_length=50,unique=True,primary_key=True)
	password = models.CharField(max_length=50)
	count_type = models.IntegerField()
	
#包裹用户信息表
class Package(models.Model):
	package_id = models.AutoField(primary_key=True)
	username = models.ForeignKey(
		Login_user,
		on_delete = models.SET_NULL,
		null = True,
	)

#包裹寄件表
class Package_send(models.Model):
	package_id = models.OneToOneField(
		Package,
		on_delete = models.CASCADE,
	)
	addr_pro = models.CharField(max_length=20)
	addr_city = models.CharField(max_length=20,blank=True)
	addr_district = models.CharField(max_length=20)
	addr_block = models.CharField(max_length=100)
	tel = models.CharField(max_length=20)

#包裹收件表
class Package_receive(models.Model):
	package_id = models.OneToOneField(
		Package,
		on_delete=models.CASCADE,
	)
	addr_pro = models.CharField(max_length=20)
	addr_city = models.CharField(max_length=20,blank=True)
	addr_district = models.CharField(max_length=20)
	addr_block = models.CharField(max_length=100)
	tel = models.CharField(max_length=20)

#用户常用信息表
class User_info(models.Model):
	user_name = models.CharField(max_length=20,primary_key=True)
	addr_pro = models.CharField(max_length=20,blank=True)
	addr_city = models.CharField(max_length=20,blank=True)
	addr_district = models.CharField(max_length=20,blank=True)
	addr_block = models.CharField(max_length=100,blank=True)
	tel = models.CharField(max_length=20,blank=True)


#线下实体表
class Godown(models.Model):
	godown_id = models.AutoField(primary_key=True)
	godown_num = models.IntegerField()
	addr_pro = models.CharField(max_length=20)
	addr_city = models.CharField(max_length=20,blank=True)
	addr_district = models.CharField(max_length=20)
	addr_block = models.CharField(max_length=100)

#配送员工
class Distributor(models.Model):
	distributor_id = models.AutoField(primary_key=True)
	godown_id = models.ForeignKey(
		Godown,
		on_delete = models.SET_NULL,
		null = True
	)

#包裹信息
class Package_info(models.Model):
	package_id = models.OneToOneField(
		Package,
		on_delete = models.CASCADE,
	)
	weight = models.FloatField()
	transport_form = models.CharField(max_length=10)
	Distributor_id = models.ForeignKey(
		Distributor,
		on_delete = models.SET_NULL,
		null = True
	)
	godown_id = models.ForeignKey(
		Godown,
		on_delete = models.SET_NULL,
		null = True
	)
	status = models.CharField(max_length=100)

#包裹配送信息
class Distributor_package(models.Model):
	distributor_id = models.ForeignKey(
		Distributor,
		on_delete = models.CASCADE,
	)
	package_id = models.ForeignKey(
		Package,
		on_delete = models.CASCADE,
	)

#线下管理人员表
class Godown_staff(models.Model):
	staff_id = models.AutoField(primary_key = True)
	godown_id = models.ForeignKey(
		Godown,
		on_delete = models.SET_NULL,
		null = True,
	)

#公司
class Company(models.Model):
	name = models.CharField(max_length=50)
	sum_money = models.IntegerField()


