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

	$("#form-send").click(function () {
		var message = "";
		var email = "";


		email = $("#email")[0].value;
		for (var i = 1; i < $(".md-input").length; i++) {
			message += $("#subject" + i)[0].value;
		}

		//clear input fields
		$(".md-input").each(function () {
			this.firstElementChild.value = '';
		});

		console.log(email);
		console.log(message);
		if (message === "" || email === "") {
			alert("You must input both a message and an email.");
		}
		else {
			$.ajax({
				url: "../contact.php",
				type: "POST",
				data: {
					message : message,
					email : email
				}
			})
			.done(function (mess) {
				console.log(mess);
			});
		}
	});
});
