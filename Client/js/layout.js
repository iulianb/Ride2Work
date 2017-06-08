$(document).ready(function () {
	//extend string prototype
	var contentLoad = $(".content-load");

	String.prototype.decodeHTML = function() { return $("<div>", {html: "" + this}).html(); };

	function init() {
		//do stuff
	}

	function titleChange (html) {
		document.title = html.match(/<title>(.*?)<\/title>/)[1].trim().decodeHTML();
		init();
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
		var href = $(this).data("href");

		// if (href.indexOf(document.doamin) > -1 || href.indexOf(":") === -1) {
			history.pushState({}, '', href);
			loadPage(href);
			return false;
		// }

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
