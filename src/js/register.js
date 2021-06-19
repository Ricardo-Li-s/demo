window.onload = function() {
	//手机号验证
	$('.register-btn').click(function() {
			var tel = $('.tel').val();
			//正则表达式
			var reg = /^1(3\d{2}|4[14-9]\d|5([0-35689]\d|7[1-79])|66\d|7[2-35-8]\d|8\d{2}|9[13589]\d)\d{7}$/
			var isValid = reg.test(tel);

			if (isValid) {
				$('.error').css('display', 'none');
				location.assign('./login.html');
			} else {
				$('.tel').css('border', '1px solid #ff6700');
				$('.tel').css('border-left', '0');
				$('.btn-tel').css('border', '1px solid #ff6700');
				$('.btn-tel').css('border-right', '1px solid #e6e6e6');
				$('.error').css('display', 'block');
			}
	});

}
