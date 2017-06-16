$(document).ready(function () {

	function showArticles(data) {
		var len = data.length;

		for (var i = 0; i < len; i++) {
			$(".articles")
			.append(data[i].title)
			.append(data[i].content)
			.append(data[i].imagePath)
			.append(data[i].articleDate);
		}
	}


	getAllArticles(showArticles);
});
