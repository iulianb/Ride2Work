// page.base("/routes");
var contentLoad = $(".content-load");
// sessionStorage.setItem("currentPage", "");
function loadPage(href) {
	contentLoad.load(href);
}

page("/", function () {
	sessionStorage.setItem("currentPage", "");
	loadPage("home.html");
});

page("/events", function () {
	sessionStorage.setItem("currentPage", "/events");
	loadPage("events.html");
});

page("/articles", function () {
	sessionStorage.setItem("currentPage", "/articles");
	loadPage("articles.html");
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
