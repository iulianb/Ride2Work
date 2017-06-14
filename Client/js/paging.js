// page.base("/routes");
var contentLoad = $(".content-load");

function loadPage(href) {
	contentLoad.load(href);
}

page("/home", function () {
	loadPage("home.html");
});

page("/events", function () {
	loadPage("events.html");
});

page("/articles", function () {
	loadPage("articles.html");
});

page.redirect("/home", function () {
		contentLoad.empty();
});

page.start({
	hashbang: true
});
// page.exit("/home", function(next) { next(); } );
