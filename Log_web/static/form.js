$(document).ready(function() {
	 validateForm()

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
		CityList.prev().text("选择城市")
        for (var i = 0; i < data.city.length; i++) {
          CityList.append("<a class='dropdown-item btn btn-primary city' href='javascript:void(0)'>" + data.city[i] + "</a>")
        }
        $(".dropdown-item.city").click(function() {
          $(this).parent().prev().text($(this).text())
        })
      })
    })
  })
  
  $.ajax("/getProvince/", {dataType:'json'}).done(function(data){
    var ProvinceList = $("#ReceiverProvinceList")
    for (var i = 0; i < data.province.length; i++) {
      ProvinceList.append("<a class='dropdown-item btn btn-primary rprovince' href='javascript:void(0)'>" + data.province[i] + "</a>")
    }
    $(".dropdown-item.rprovince").click(function() {
      $(this).parent().prev().text($(this).text())
      $("#ReceiverCity").removeClass("disabled")
      $.ajax('/getCity/',{
        dataType:'json',
        data:{'province':$(this).text()}
      }).done(function(data) {
    	var CityList = $("#ReceiverCityList")
		CityList.children().remove()
		CityList.prev().text("选择城市")
        for (var i = 0; i < data.city.length; i++) {
          CityList.append("<a class='dropdown-item btn btn-primary city' href='javascript:void(0)'>" + data.city[i] + "</a>")
        }
        $(".dropdown-item.city").click(function() {
          $(this).parent().prev().text($(this).text())
        })
      })
    })
  })
})

function validateForm(){
	$("#packageForm").validate({
		submitHandler:function(){
			Func_PackageForm();
		},
		rules:{
			SenderName:{
				required:true,
				maxlength:20,
				minlength:1,
			},
			SenderTele:{
				required:true,
				maxlength:20,
				minlength:5,
			},
			SenderRegion:{
				required:true,
				maxlength:20,
				minlength:2,
			},
			SenderStreet:{
				required:true,
				maxlength:100,
				minlength:2,
			},
			ReceiverName:{
				required:true,
				maxlength:20,
				minlength:1,
			},
			ReceiverTele:{
				required:true,
				maxlength:20,
				minlength:5,
			},
			ReceiverRegion:{
				required:true,
				maxlength:20,
				minlength:2,
			},
			ReceiverStreet:{
				required:true,
				maxlength:100,
				minlength:2,
			},
		},
		messages:{	
			SenderName:{
				required:"请输入寄件人姓名",
				maxlength:"寄件人姓名过长",
				minlength:"寄件人姓名过短",
			},
			SenderTele:{
				required:"请输入寄件人联系方式",
				maxlength:"寄件人电话号码长度过长",
				minlength:"寄件人电话号码长度过短",
			},
			SenderRegion:{
				required:"请输入区/县",
				maxlength:"寄件人所在区/县输入过长",
				minlength:"寄件人所在区/县输入过短",
			},
			SenderStreet:{
				required:"请输入街道地址",
				maxlength:"寄件人所在街道地址输入过长",
				minlength:"寄件人所在街道地址输入过短",
			},
			ReceiverName:{
				required:"请输入收件人姓名",
				maxlength:"收件人姓名过长",
				minlength:"收件人姓名过短",
			},
			ReceiverTele:{
				required:"请输入收件人联系方式",
				maxlength:"收件人电话号码长度过长",
				minlength:"收件人电话号码长度过短",
			},
			ReceiverRegion:{
				required:"请输入区/县",
				maxlength:"收件人所在区/县输入过长",
				minlength:"收件人所在区/县输入过短",
			},
			ReceiverStreet:{
				required:"请输入街道地址",
				maxlength:"收件人所在街道地址输入过长",
				minlength:"收件人所在街道地址输入过短",
			},
		}
	})
}

function Func_PackageForm(){
	$.ajax("/userPackage/",{
		dataType:'json',
		type: 'POST',
		data:{
			"SenderName":$("#SenderName").val(),
			"SenderTele":$("#SenderTele").val(),
			"SenderProvince":$("#SenderProvince").text(),
			"SenderCity":$("#SenderCity").text(),
			"SenderRegion":$("#SenderRegion").val(),
			"SenderStreet":$("#SenderStreet").val(),
			"ReceiverName":$("#ReceiverName").val(),
			"ReceiverTele":$("#ReceiverTele").val(),
			"ReceiverProvince":$("#ReceiverProvince").text(),
			"ReceiverCity":$("#ReceiverCity").text(),
			"ReceiverRegion":$("#ReceiverRegion").val(),
			"ReceiverStreet":$("#ReceiverStreet").val(),
			"TransType":$("#TransType").val(),
		}
	}).done(function(data){
		if(data.statCode != 0){
			alert(data.errormessage)
		}else{
			alert(data.successmessage)
			location.replace("/user/")
		}
	})
}
