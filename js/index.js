$(document).ready(function() {
	// custom plugin code
	var defaultselectbox = $('#cusSelectbox');
	var numOfOptions = $('#cusSelectbox').children('option').length;
	// hide select tag
	defaultselectbox.addClass('s-hidden');
	// wrapping default selectbox into custom select block
	defaultselectbox.wrap('<div class="cusSelBlock"></div>');
	// creating custom select div
	defaultselectbox.after('<div class="selectLabel"></div>');
	// getting default select box selected value
	$('.selectLabel').text(defaultselectbox.children('option').eq(0).text());
	// appending options to custom un-ordered list tag
	var cusList = $('<ul/>', {
		'class': 'options'
	}).insertAfter($('.selectLabel'));
	// generating custom list items
	for (var i = 0; i < numOfOptions; i++) {
		$('<li/>', {
			text: defaultselectbox.children('option').eq(i).text(),
			rel: defaultselectbox.children('option').eq(i).val()
		}).appendTo(cusList);
	}
	// open-list and close-list items functions
	function openList() {
		for (var i = 0; i <= numOfOptions; i++) {
			$('.options').children('li').eq(i).css(
				'transform', 'translateY(' + i * 100 + '%)').css(
				'transition-delay', i * 30 + 'ms');
		}
	}

	function closeList() {
		for (var i = 0; i < numOfOptions; i++) {
			$('.options').children('li').eq(i).css(
				'transform', 'translateY(' + i * 0 + 'px)').css('transition-delay', i * 0 + 'ms');
		}
		$('.options').children('li').eq(1).css('transform', 'translateY(' + 2 + 'px)');
		$('.options').children('li').eq(2).css('transform', 'translateY(' + 4 + 'px)');
	}
	// click event functions
	$('.selectLabel').click(function() {
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			openList();
		} else {
			closeList();
		}
	});
	$(".options li").click(function() {
		closeList();
		$('.selectLabel').removeClass('active');
		$('.selectLabel').text($(this).text());
		defaultselectbox.val($(this).text());
		$('.selected-item p span').text($('.selectLabel').text());
	});
});

// form validation
function validateRegister() {
	var emaidid, atpos, dotpos, password, username, country;

	username = $('#name').val();
	password = $('#password').val();
	emailid = $('#email').val();
	atpos = emailid.indexOf('@');
	dotpos = emailid.lastIndexOf('.');

	if (username == null || username == '') {
		$('#regisErr').addClass('error').text('* Name do not empty !');
		$('#name').focus();
		return false;
	}
	if (username.length < 6) {
		$('#regisErr').addClass('error').text('* Name should be min 6 char !');
		$('#name').focus();
		return false;
	}
	if (password == null || password == '') {
		$('#regisErr').addClass('error').text('* Password do not empty!');
		$('#password').focus();
		return false;
	}
	if (password.length < 6) {
		$('#regisErr').addClass('error').text('* Password do not short!');
		$('#password').focus();
		return false;
	}
	if (emailid == null || emailid == '') {
		$('#regisErr').addClass('error').text('* Email id do not empty!');
		$('#email').focus();
		return false;
	}
	if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailid.length) {
		$('#regisErr').addClass('error').text('It is not a valid email address!');
		$('#email').focus();
		return false;
	}

	country = $('.selectLabel').text();

	if (country == 'select') {
		$('#regisErr').addClass('error').text('* Select country !');
		$('.selectLabel').focus();
		return false;
	} else if (country != 'select') {
		$('#regisErr').addClass('success').text('Your country is: ' + country);
		return false;
	}
}