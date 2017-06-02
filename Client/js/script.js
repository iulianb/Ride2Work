$(document).ready(function () {
	"use strict";
	$(".scrolling").on("click", function () {
		var target = $(this).data('rel');
		   var $target = $(target);
		   console.log($target);
		   $('html, body').stop().animate({
			   'scrollTop': $target.offset().top
		   }, 900, 'swing');
	});

	$(".mobile-nav").click(function () {
		$(".fa-times").toggleClass("no-display");
		$(".fa-bars").toggleClass("no-display");
	});


	/*console.log($( window ).width());*/
	if ($( window ).width() <= 600) {
		var maxLength = 180;
	}
	else {
		var maxLength = 335;
	}
	/*console.log(maxLength);*/

	//clears text-input
	$(".message").val('');
	$('.message').on('input focus keydown keyup', function() {
		var text = $(this).val();
		var lines = text.split(/(\r\n|\n|\r)/gm);
		for (var i = 0; i < lines.length; i++) {
			if (lines[i].length > maxLength) {
				/*console.log(maxLength);*/
				lines[i] = lines[i].substring(0, maxLength);
			}
		}
		$(this).val(lines.join(''));
	});

	function validateEmail(email) {
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(email);
	}

	function formValidation(text, success) {
		var formStatus = "";
		formStatus = $("#form-status");

		if (success) {
			formStatus
						.empty()
						.append(text)
						.removeClass("form-error")
						.addClass("form-success");
		}

		else {
			formStatus
						.empty()
						.append(text)
						.removeClass("form-success")
						.addClass("form-error");
		}
	}

	$("#form-send").click(function () {
		var message = "";
		var email = "";

		message = $(".message")[0].value;
		email = $("#email")[0].value;
		$(".message").val('');

		// console.log(email);
		// console.log(message);

		if (message === "" || email === "") {
			formValidation("Va rugam sa introduce-ti un mesaj si o adresa de email valida.", false);
		} else if (!validateEmail(email)) {
			formValidation("Adresa de email este invalida.", false);
		} else {	
			$.ajax({
				url: "../contact.php",
				type: "POST",
				data: {
					message : message,
					email : email
				},
				success: function(msg) {
					formValidation("Form subbmited successfuly.", true);					
					console.log(msg);
				},
				error: function(msg) {
					console.log(msg);
				}
			});
		}

	});
});
