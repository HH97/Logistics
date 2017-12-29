 $(document).ready(function() {
	validateSignIn()
})

function validateSignIn(){
	$("#formLogin").validate({
		submitHandler:function(){
			Func_signIn();
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

function Func_signIn(){
	$.ajax("/signIn/",{
		dataType:'json',
		type: 'POST',
		data:{
			"username":$("#username").val(),
			"password":$("#password").val()
		}
	}).done(function(data){
		alert(data.statCode)
		if(data.statCode < 0){
			alert(data.errormessage)
		}else if(data.statCode == 0){
			location.replace("/user/")
		}else if(data.statCode == 1){
			location.replace("/godown_keeper/")
		}else if(data.statCode == 2){
			location.replace("/distribute/")
		}
	})
}