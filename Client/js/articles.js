$(function () {



	function showArticles(data) {
		var len = data.length;
		sessionStorage.setItem("currentArticle", data[len - 1].id);
		// console.log(sessionStorage.getItem("currentArticle"));
		$(".articles").empty();

		for (var i = len - 1; i >= 0; i--) {
			if (data[i].id != sessionStorage.getItem("currentArticle")) {

				$(".past-articles").append(`<div id="article${data[i].id}" class="slide"></div>`);

				$("#article" + data[i].id)
				.append(`
						<h2 class="article-title">${data[i].title}</h2>
						<p class="article-content">${data[i].content}</p>
						<div class="rhomb">
							<img class="article-image" src="${data[i].imagePath}">${data[i].imagePath}
						</div>
						<p>Data postarii:${data[i].articleDate}</p>
						<div class="article-comments1"></div>
						<input id="comment-box-${data[i].id}" type="text">
						<button id="comment-button-${data[i].id}" class="comment-b">Send</button>
				`);
			}
			else {
				// $(".main-image").attr("src", `${data[i].imagePath}`);
				$(".main-article")
				.append(`
					<h2 class="article-title">${data[i].title}</h2>
					<p>Data postarii:${data[i].articleDate}</p>
					<p class="article-content">${data[i].content}</p>
				`);
			}
		}
	}

	function showComments(data) {
		var len = data.length;

		for (var i = len - 1; i >= 0; i--)
			$(`#article${i} .article-comments`).empty();

		for (var i = len - 1; i >= 0; i--) {
			if (data[i].id != sessionStorage.getItem("currentArticle")) {
			$("#article" + data[i].articleID + " .article-comments")
			.append(`
			<p class="comment-user">User->${data[i].name}</p>
			<p class="comment-text">Comment->${data[i].content}</p>
			<p class="comment-date">Posted->${data[i].commentDate}</p>`);
		}
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

		for(let i = commentButtons.length; i >= 0 ; i--) {
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

	setTimeout(function () {
		$('.past-articles').bxSlider({
		  slideWidth: 300,
		  minSlides: 2,
		  maxSlides: 3,
		  moveSlides: 1,
		  slideMargin: 10
		});
	}, 1 * 1000);

});



/*
Snippet to convert iso date format
date = new Date('2013-08-03T02:00:00Z');
year = date.getFullYear();
month = date.getMonth()+1;
dt = date.getDate();

if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}
*/
