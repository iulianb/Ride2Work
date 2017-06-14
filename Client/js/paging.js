// page.base("/routes");
var contentLoad = $(".content-load");

function loadPage(href) {
	contentLoad.load(href);
}

page("/home", function () {
	sessionStorage.setItem("currentPage", "home");
	loadPage("home.html");
});

page("/events", function () {
	sessionStorage.setItem("currentPage", "events");
	loadPage("events.html");
});

page("/articles", function () {
	sessionStorage.setItem("currentPage", "articles");
	loadPage("articles.html");
});


var currentPage = "home";

currentPage = sessionStorage.getItem("currentPage");

console.log(currentPage);
page.redirect('/' + currentPage);

page.start({
	hashbang: true
});
// page.exit("/home", function(next) { next(); } );
