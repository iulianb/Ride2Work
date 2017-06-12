//http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
//http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html
$(document).ready(function () {
	"use strict";

	var contentLoad = $(".content-load");
	// contentLoad.load("home.html");
	// var ref = "home";
	// history.pushState({}, '', ref);
	// loadPage(ref + ".html");


	function loadPage(href) {
		console.log("Load Page Call==>");
		console.log(href);
		contentLoad.load(href);
	}



	// if (performance.navigation.type == 1) {
	// 	loadPage(location.href + ".html");
	// 	// console.log(location.href);
	// 	// console.log(document.domain);
	// }

	$(window).beforeunload = function () {
		$(window).unload = function () {
			window.location.href = 'layout.html';
			console.log("RELOAD " + location.href);
		};
		return "asdhgasdgjasd";
	};

	// $(window).('beforeunload', function() {
	// 	$(window).('unload', function() {
	// 		var ref = window.location.href;
	// 		// location.href = 'layout.html';
	// 		// if (window.location.href !== 'layout.html')
	// 		alert(location);
	// 		window.location.href = 'layout.html';
	// 		console.log(window.location.href);
	//
	// 		// location.assign('layout.html');
	// 	});
	// 	window.location.href = 'layout.html';
	//
	//     return 'Not an empty string';
 //  	});


	$(window).on("popstate", function (event) {
		// console.log(location);
		// console.log(location.href);
		// console.log("EVENT STATE");
		// console.log(event.originalEvent.state);
		if (event.originalEvent.state !== null)
			loadPage(location.href + ".html");
		else
			contentLoad.empty();
	});

	$(document).on("click", "a", function() {
		// console.log(location);

		var href = $(this).data("href");

		if (href.indexOf(document.doamin) > -1 || href.indexOf(":") === -1) {
			history.pushState({}, '', href);
			loadPage(href + ".html");
			return false;
		}

	});

 //   var $main = $("main");
 //
 // $(document).on("click", "a", function() {
 //    var href = $(this).data("href");
 //
 //    history.pushState({}, '', href);
 //    $main.load(href + " main>*");
 //    return false;
 //  });

	// $(".content-load").load("../home.html");
});

//routing
//https://stackoverflow.com/questions/41425826/how-to-implement-routing-with-a-single-page-application-build-solely-using-jquery
