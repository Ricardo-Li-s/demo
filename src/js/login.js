window.onload = function() {
	// 登录选项卡
	$('.login-box .login li').click(function() {
		//切换class
		$(this).addClass('active').siblings('.account-box').removeClass('active');
		//获取索引
		var i = $(this).index();
		//切换content
		$(this).parent().siblings('.cont').find('.account-box').hide().eq(i).show();
	});
	//登录验证
	$('.login-btn').click(function() {



		$.ajax({
			url:'../php/login.php',
			data:{
			username:$('username').value,
			password:$('password').value,
			},
			dataType:'json',
			success:function(res){
			if(res['status'] == "1"){
				alert(res['msg']);
				window.location.href = "../static/Letv.html"
			}else{
				alert(res["msg"]);
			}
			}
		})











		var zh = $('.account-input').val();
		var mm = $('.password-input').val();
		//正则表达式
		// var reg = /^[a-zA-Z0-9]{6,10}$/
		// var age = /^[a-zA-Z0-9]{6,12}$/
		var isAccount = zh;
		var isPassword = mm;
		if (isAccount) {
			$('.form-box .acc').css('display', 'none');
		} else {
			$('.account-input').css('border', '1px solid #ff6700');
			$('.acc').css('display', 'block');
			$(".account-input").val("");
		}
		
		if ( !isPassword) {
			$('.password-input').css('border', '1px solid #ff6700');
			$('.form-box .acc').css('display', 'block');
			$(".password-input").val("");
		} 
		
		if(isPassword && isAccount){
			// location.assign('http://127.0.0.1:8848/mi/center.html');
				window.location.href = "../static/Letv.html"
				// window.location = 'Letv.html'
		}
		
		});





		


}
