$(function () {

	function showArticles(data) {
		var len = data.length;
		$(".articles").empty();

		for (var i = 0; i < len; i++) {

			$(".articles").append(`<div id="article${data[i].id}"></div>`);

			$("#article" + data[i].id)
			.append(`
			<h2 class="article-title">${data[i].title}</h2>
			<p class="article-content">${data[i].content}</p>
			<img class="article-image" src="${data[i].imagePath}">${data[i].imagePath}
			<p>Data postarii:${data[i].articleDate}</p>
			<div class="article-comments"></div>
			<input id="comment-box-${data[i].id}" type="text">
			<button id="comment-button-${data[i].id}">Send</button>`);
		}
	}

	function showComments(data) {
		var len = data.length;

		for (var i = 0; i < len; i++) {
			$("#article" + data[i].articleID + " .article-comments")
			.append(`
			<p class="comment-user">User->${data[i].name}</p>
			<p class="comment-text">Comment->${data[i].content}</p>
			<p class="comment-date">Posted->${data[i].commentDate}</p>`);
		}
	}

	function postComment() {
		console.log("asdasdyiq8y1t2863t172t37123");
	}

	$("#comment-button-1").on("click", function() { postComment(); });



	getAllArticles(showArticles);
	//Hack to make comments show propperly
	setTimeout(function () {
		getAllComments(showComments);
	}, 10);

});
