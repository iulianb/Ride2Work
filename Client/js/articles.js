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
			<button id="comment-button-${data[i].id}" class="comment-b">Send</button>`);
		}
	}

	function showComments(data) {
		var len = data.length;

		for (var i = 0; i < len; i++)
			$(`#article${i} .article-comments`).empty();

		for (var i = 0; i < len; i++) {
			$("#article" + data[i].articleID + " .article-comments")
			.append(`
			<p class="comment-user">User->${data[i].name}</p>
			<p class="comment-text">Comment->${data[i].content}</p>
			<p class="comment-date">Posted->${data[i].commentDate}</p>`);
		}
	}

	function appendComment(success) {
		$("#article" + success.articleID + " .form-success").empty();
		$("#article" + success.articleID + " .article-comments")
		.append(`
		<p class="comment-user">User->${success.name}</p>
		<p class="comment-text">Comment->${success.content}</p>
		<p class="comment-date">Posted->${success.commentDate}</p>`);
		$("#article" + success.articleID).append('<p class="form-success">Comment Sent!</p>');
		setTimeout(function () {
			$("#article" + success.articleID + " .form-success").fadeOut("slow");
		}, 1000);
	}

	function postComment(message, id) {
		var timestamp = new Date().toISOString();

		addComment({
			name : "JavaScript",
			content : "Message sent from articles page ->" + message,
			commentDate : timestamp,
			articleID : id
		},
		appendComment,
		function(error){console.log(error);}
	);
	}

	function addHandle () {
		var commentButtons = $(".comment-b") + 1;

		for(let i = 1; i < commentButtons.length; i++) {
			$("#comment-button-" + i).click(function () {
				var comment = $("#comment-box-" + i);

				if (comment[0].value !== "") {
					postComment(comment[0].value, i);
					comment[0].value = "";
				}
			});
		}
	}

	getAllArticles(showArticles);

	//Hack to make comments show propperly
	setTimeout(function () {
		getAllComments(showComments);
	}, 100);

	setTimeout(function () {
		addHandle();
	}, 300);

});
