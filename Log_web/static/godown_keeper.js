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
			//解除weight输入框
			$.ajax("/getWeight/",{
				dataType:'json',
				data:{'package':$(this).text()}
			}).done(function(data){
				if(data.statCode == 1){
					$("#package_weight").removeAttr("disabled")
				}
			})
			//获取省份
			$("#SenderProvince").removeClass("disabled")
			$.ajax("/getProvince/", {dataType:'json'}).done(function(data){
				var ProvinceList = $("#SenderProvinceList")
				for (var i = 0; i < data.province.length; i++) {
					ProvinceList.append("<a class='dropdown-item btn btn-primary sprovince' href='javascript:void(0)'>" + data.province[i] + "</a>")
				}
				$(".dropdown-item.sprovince").click(function() {
					//省份已经选择完成
					var province = $(this).text()
					$(this).parent().prev().text($(this).text())
					$("#SenderCity").removeClass("disabled")

					$.ajax('/getCity/',{
						dataType:'json',
						data:{'province':$(this).text()}
					}).done(function(data) {
						//选择城市
						var CityList = $("#SenderCityList")
						CityList.children().remove()
						CityList.prev().text("选择发送城市")
						for (var i = 0; i < data.city.length; i++) {
							CityList.append("<a class='dropdown-item btn btn-primary city' href='javascript:void(0)'>" + data.city[i] + "</a>")
						}
						$(".dropdown-item.city").click(function() {
							//城市选择完毕
							$(this).parent().prev().text($(this).text())
							var city = $(this).text()
							$("#SenderGodown").removeClass("disabled")
							$.ajax('/getGodown/',{
								dataType:'json',
								data:{
									'province':province,
									'city':city,
								}
							}).done(function(data) {
								//选择线下网点
								var godownlist = $("#SenderGodownList")
								godownlist.children().remove()
								godownlist.prev().text("选择线下仓库")
								for (var i = 0; i < data.godown_id.length; i++) {
									godownlist.append("<a class='dropdown-item btn btn-primary godown_id' href='javascript:void(0)'>" + data.godown_id[i] + "</a>")
								}
								$(".dropdown-item.godown_id").click(function() {
									//线下网点选择完毕
									$(this).parent().prev().text($(this).text())
									var godown = $(this).text()
									$("#distributor_id").removeClass("disabled")
									$.ajax('/getDistributor/',{
										dataType:'json',
										data:{
											'godown':godown,
										}
									}).done(function(data){
										//选择配送员
										var distributorlist = $("#distributor_id_list")
										distributorlist.children().remove()
										distributorlist.prev().text("选择配送员")
										for (var i = 0; i < data.distributor_id.length; i++) {
											distributorlist.append("<a class='dropdown-item btn btn-primary distributor_id' href='javascript:void(0)'>" + data.distributor_id[i] + "</a>")
										}
										$(".dropdown-item.distributor_id").click(function() {
											$(this).parent().prev().text($(this).text())
										})
									})
								})
							})
						})
					})
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
	$.ajax("/godownkeeper_package/",{
		dataType:'json',
		data:{
			"package_id":$("#package_id").text(),
			"status":$("#status").val(),
			"distributor":$("#distributor_id").text(),
			"godown":$("#SenderGodown").text(),
			"package_weight":$("#package_weight").val(),
		}
	}).done(function(data){
		if(data.statCode != 0){
			alert(data.errormessage)
		}else{
			alert(data.successmessage)
			location.replace("/godown_keeper/")
		}
	})
}
								