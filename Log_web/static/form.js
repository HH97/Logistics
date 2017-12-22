 $(document).ready(function() {
	validateSignIn()
})

function validateSignIn(){
	$("#formUser").validate({
		submitHandler:function(){
			Func_userform();
		},
		rules:{
			SenderName:{
				required:true
				minlength: 100
			},
			SenderTele:{
				required:true
				minlength: 100
			},
			SenderRegion:{
				required:true
				minlength:100
			},
			SenderStreet:{
				required:true
				minlength:100
			},
			ReceiverName:{
				required:true
				minlength: 100
			},
			ReceiverTele:{
				required:true
				minlength: 100
			},
			Receiverregion:{
				required:true
				minlength: 100
			},
			Receiverstreet:{
				required:true
				minlength: 100
			},
			
		},
		messages:{
			SenderName:{
				required:"请输入寄件人姓名",
				minlength:"寄件人姓名不能超过100个字符"
			},
			SenderTele:{
				required:"请输入寄件人联系方式",
				minlength:"寄件人联系方式不能超过100个字符"
			},
			SenderRegion:{
				required:"请输入区/县",
				minlength:"寄件人所在区/县不能超过100个字符"
			},
			SenderStreet:{
				required:"请输入街道地址",
				minlength:"寄件人所在街道地址不能超过100个字符"
			},
			ReceiverName:{
				required:"请输入寄件人姓名",
				minlength:"收件人姓名不能超过100个字符"
			},
			ReceiverTele:{
				required:"请输入寄件人联系方式",
				minlength:"收件人联系方式不能超过100个字符"
			},
			ReceiverRegion:{
				required:"请输入区/县",
				minlength:"收件人所在区/县不能超过100个字符"
			},
			ReceiverStreet:{
				required:"请输入街道地址",
				minlength:"收件人所在街道地址不能超过100个字符"
			},
		}
	})
}

function Func_userform(){
	$.ajax("/userform/",{
		dataType:'json',
		type: 'POST',
		data:{
			"SenderName":$("#SenderName").val(),
			"SenderTele":$("#SenderTele").val(),
			"SenderRegion":$("#SenderAddr").val(),
			"SenderStreet":$("#SenderAddr").val(),
			"ReceiverName":$("#ReceiverName").val(),
			"ReceiverTele":$("#ReceiverTele").val(),
			"ReceiverRegion":$("#ReceiverAddr").val(),
			"ReceiverStreet":$("#ReceiverAddr").val()
		}
	}).done(function(data){
		if(data.statCode != 0){
			alert(data.errormessage)
		}else{
			alert(data.successmessage)
			location.replace("/send_package/")
		}
	})
}