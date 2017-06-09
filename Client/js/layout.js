//http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
//http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html
$(document).ready(function () {
	//extend string prototype
	var contentLoad = $(".content-load");
	// contentLoad.load("home.html");

	String.prototype.decodeHTML = function() { return $("<div>", {html: "" + this}).html(); };

	function init() {
		//do stuff
	}

	function loadPage(href) {
		console.log(href);
		contentLoad.load(href);
	}

	init();
// 	if (window.performance) {
//   console.info("window.performance work's fine on this browser");
// }

	if (performance.navigation.type == 1) {
		// loadPage(location.href);
		console.log(location.href);
		console.log(document.domain);
	}

	$(window).on("popstate", function (event) {
		console.log(location.href);
		console.log("EVENT STATE");
		console.log(event.originalEvent.state);
		if (event.originalEvent.state !== null)
			loadPage(location.href);
		else
			contentLoad.empty();
	});

	$(document).on("click", "a", function() {
		var href = $(this).data("href") + ".html";

		if (href.indexOf(document.doamin) > -1 || href.indexOf(":") === -1) {
			history.pushState({}, '', href);
			loadPage(href);
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
