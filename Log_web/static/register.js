 $(document).ready(function() {
	validateSignUp()
})

function validateSignUp(){
	$("#formRegister").validate({
		submitHandler:function(){
			Func_signUp();
		},
		rules:{
			username:{
				required:true,
				minlength: 2
			},
			password:{
				required:true,
				minlength: 6
			}
		},
		messages:{
			username:{
				required:"请输入用户名",
				minlength:"用户名至少需要两个字符"
			},
			password:{
				required:"请输入密码",
				minlength:"密码长度不能少于6个字符"
			},
		}
	})
}

function Func_signUp(){
	$.ajax("/signUp/",{
		dataType:'json',
		type: 'POST',
		data:{
			"username":$("#username").val(),
			"password":$("#password").val()
		}
	}).done(function(data){
		if(data.statCode != 0){
			alert(data.errormessage)
		}else{
			alert(data.successmessage)
			location.replace("/login/")
		}
	})
}