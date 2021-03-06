// page.base("/routes");
var contentLoad = $(".content-load");
// sessionStorage.setItem("currentPage", "");
function loadPage(href) {
	contentLoad.load(href);
}

// var app = angular.module("myApp", ["ngRoute"]);
//
// app.config (function ($routeProvider) {
// 	$routeProvider
// 	.when("/", {
// 		templateUrl : "home.html"
// 	})
// 	.when("/articles", {
// 		templateUrl : "articles.html"
// 	});
// });

page("/", function () {
	sessionStorage.setItem("currentPage", "");
	loadPage("home.html");
});

page("/events", function () {
	sessionStorage.setItem("currentPage", "/events");
	loadPage("events.html");
	$("#js-page").empty()
	.append('<script type="text/javascript" src="js/events.js"></script>');
});

page("/articles", function () {
	sessionStorage.setItem("currentPage", "/articles");
	loadPage("articles.html");
	$("#js-page").empty()
	.append('<script type="text/javascript" src="js/articles.js"></script>');
});


var currentPage = "";

if (sessionStorage.getItem("currentPage")) {
	currentPage = sessionStorage.getItem("currentPage");
}
console.log(sessionStorage);

page.redirect('' + currentPage);

page.start({
	hashbang: true
});
// page.exit("/home", function(next) { next(); } );
