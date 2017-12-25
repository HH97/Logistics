  $(document).ready(function() {
	 validateForm(),
	 $.ajax("/get_package_id/", {dataType:'json'}).done(function(data){
    var package_id_list = $("#package_id_list")
    for (var i = 0; i < data.package_id.length; i++) {
      package_id_list.append("<a class='dropdown-item btn btn-primary package_id' href='javascript:void(0)'>" + data.package_id[i] + "</a>")
    }
    $(".dropdown-item.spackage_id").click(function() {
      
	  $(this).parent().prev().text($(this).text())
		$("#SenderProvince").removeClass("disabled")	  
		
		$.ajax("/getProvince/", {dataType:'json'}).done(function(data){
			var ProvinceList = $("#SenderProvinceList")
			for (var i = 0; i < data.province.length; i++) {
				ProvinceList.append("<a class='dropdown-item btn btn-primary sprovince' href='javascript:void(0)'>" + data.province[i] + "</a>")
			}
			$(".dropdown-item.sprovince").click(function() {
			$(this).parent().prev().text($(this).text())
			$("#SenderCity").removeClass("disabled")
			
			$.ajax('/getCity/',{
				dataType:'json',
				data:{'province':$(this).text()}
			}).done(function(data) {
				var CityList = $("#SenderCityList")
				CityList.children().remove()
				CityList.prev().text("选择发送城市")
				for (var i = 0; i < data.city.length; i++) {
					CityList.append("<a class='dropdown-item btn btn-primary city' href='javascript:void(0)'>" + data.city[i] + "</a>")
				}
				$(".dropdown-item.city").click(function() {
				$(this).parent().prev().text($(this).text())
					})
				})
			})
		})
		
	 $(this).parent().prev().text($(this).text())
		$("#courier_id").removeClass("disabled")
			
		$.ajax('/get_courier_id/',{
				dataType:'json',
				data:{'courier_id':$(this).text()}
			}).done(function(data) {
				var CityList = $("#courier_id_list")
				courier_id_list.children().remove()
				courier_id_list.prev().text("选择配送员")
				for (var i = 0; i < data.courier_id.length; i++) {
					courier_id_list.append("<a class='dropdown-item btn btn-primary courier_id' href='javascript:void(0)'>" + data.courier_id[i] + "</a>")
				}
				$(".dropdown-item.courier_id").click(function() {
				$(this).parent().prev().text($(this).text())
					})
				})
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
	$.ajax("/keeper_operation/",{
		dataType:'json',
		type: 'POST',
		data:{
			"package_id":$("#package_id").val(),
			"status":$("#status").val(),
			"SenderProvince":$("#SenderProvince").text(),
			"SenderCity":$("#SenderCity").text(),
			"courier_id":$("#courier_id").val(),
			"package_weight":$("#package_weight").val(),
		}
	}).done(function(data){
		if(data.statCode != 0){
			alert(data.errormessage)
		}else{
			alert(data.successmessage)
			location.replace("/keeper/")
		}
	})
}
								