$(document).ready(function () {
	// $(".navbar-load").load("../navbar.html");
	// $(".footer-load").load("../footer.html");


	var contentLoad = $(".content-load");

	  $(document).on("click", "a", function() {
	    var href = $(this).data("href");

	    history.pushState({}, '', href);
	    contentLoad.load(href);
	    return false;
	  });

  //  var $main = $("main");
  //
  // $("a").click(function() {
  //   var href = $(this).data("href");
  //
  //   history.pushState({}, '', href);
  //   $main.load(href);
  //   return false;
  // });

	// $(".content-load").load("../home.html");
});

//routing
//https://stackoverflow.com/questions/41425826/how-to-implement-routing-with-a-single-page-application-build-solely-using-jquer
