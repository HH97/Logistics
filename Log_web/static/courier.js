  $(document).ready(function() {
	validateForm(),
	$.ajax("/get_package_id/", {dataType:'json'}).done(function(data){
		var package_id_list = $("#package_id_list")
		for (var i = 0; i < data.package_id.length; i++) {
			package_id_list.append("<a class='dropdown-item btn btn-primary package_id' href='javascript:void(0)'>" + data.package_id[i] + "</a>")
		}
		$(".dropdown-item.package_id").click(function() {
			//packageid选择完毕
			$(this).parent().prev().text($(this).text())
		})
	})
})

function validateForm(){
	$("#keeper_operation_Form").validate({
		submitHandler:function(){
			Func_Operation_Form();
		}
	})
}
function Func_Operation_Form(){
	$.ajax("/courier_package/",{
		dataType:'json',
		data:{
			"package_id":$("#package_id").text(),
			"status":$("#status").val(),
		}
	}).done(function(data){
		if(data.statCode != 0){
			alert(data.errormessage)
		}else{
			alert(data.successmessage)
			location.replace("/courier/")
		}
	})
}
