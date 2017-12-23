$(document).ready(function() {
  //alert("!!!")
	 validateform()

  $.ajax('/getProvince', {dataType:'json'}).done(function(data){
    var ProvinceList = $("#ProvinceList")
    for (var i = 0; i < data.province.length; i++) {
      ProvinceList.append("<a class='dropdown-item btn btn-primary province' href='javascript:void(0)'>" + data.province[i] + "</a>")
    }
    $(".dropdown-item.SenderProvince").click(function() {
      $(this).parent().prev().text($(this).text())
      $("#SenderCity").removeClass("disabled")
      $.ajax('/getCity',{
        dataType:'json',
        data:{'province':$(this).text()}
      }).done(function(data) {
    var CityList = $("#CityList")
		CityList.children().remove()
		CityList.prev().text("选择城市")
        for (var i = 0; i < data.city.length; i++) {
          CityList.append("<a class='dropdown-item btn btn-primary city' href='javascript:void(0)'>" + data.city[i] + "</a>")
        }
        $(".dropdown-item.SenderCity").click(function() {
          $(this).parent().prev().text($(this).text())
        })
      })
    })
  })
	  $.ajax('/getProvince', {dataType:'json'}).done(function(data){
    var ProvinceList = $("#ProvinceList")
    for (var i = 0; i < data.province.length; i++) {
      ProvinceList.append("<a class='dropdown-item btn btn-primary province' href='javascript:void(0)'>" + data.province[i] + "</a>")
    }
    $(".dropdown-item.ReceiverProvince").click(function() {
      $(this).parent().prev().text($(this).text())
      $("#ReceiverCity").removeClass("disabled")
      $.ajax('/getCity',{
        dataType:'json',
        data:{'province':$(this).text()}
      }).done(function(data) {
    var CityList = $("#CityList")
		CityList.children().remove()
		CityList.prev().text("选择城市")
        for (var i = 0; i < data.city.length; i++) {
          CityList.append("<a class='dropdown-item btn btn-primary city' href='javascript:void(0)'>" + data.city[i] + "</a>")
        }
        $(".dropdown-item.ReceiverCity").click(function() {
          $(this).parent().prev().text($(this).text())
        })
      })
    })
  })
})

function validateform(){
	$("#formUser").validate({
		submitHandler:function(){
			Func_userform();
		},
		rules:{
			SenderName:{
				required:true
				maxlength: 100
			},
			SenderTele:{
				required:true
				maxlength: 100
			},
			SenderRegion:{
				required:true
				maxlength:100
			},
			SenderStreet:{
				required:true
				maxlength:100
			},
			ReceiverName:{
				required:true
				maxlength: 100
			},
			ReceiverTele:{
				required:true
				maxlength: 100
			},
			Receiverregion:{
				required:true
				maxength: 100
			},
			Receiverstreet:{
				required:true
				maxlength: 100
			},
			
		},
		messages:{
			SenderName:{
				required:"请输入寄件人姓名",
				maxlength:"寄件人姓名不能超过100个字符"
			},
			SenderTele:{
				required:"请输入寄件人联系方式",
				maxlength:"寄件人联系方式不能超过100个字符"
			},
			SenderRegion:{
				required:"请输入区/县",
				maxlength:"寄件人所在区/县不能超过100个字符"
			},
			SenderStreet:{
				required:"请输入街道地址",
				maxlength:"寄件人所在街道地址不能超过100个字符"
			},
			ReceiverName:{
				required:"请输入寄件人姓名",
				maxlength:"收件人姓名不能超过100个字符"
			},
			ReceiverTele:{
				required:"请输入寄件人联系方式",
				maxlength:"收件人联系方式不能超过100个字符"
			},
			ReceiverRegion:{
				required:"请输入区/县",
				maxlength:"收件人所在区/县不能超过100个字符"
			},
			ReceiverStreet:{
				required:"请输入街道地址",
				maxlength:"收件人所在街道地址不能超过100个字符"
			},
		}
	})
}

function Func_userform(){
	$.ajax({
		url:"/userform/",
		dataType:'json',
		type: 'POST',
		data:{
			"SenderName":$("#SenderName").val(),
			"SenderTele":$("#SenderTele").val(),
			"ReceiverName":$("#ReceiverName").val(),
			"ReceiverTele":$("#ReceiverTele").val()
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

