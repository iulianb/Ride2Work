$(function () {
	//functions stole shamelessly from SO
	function getVidId(url) {
	    var vidId;
		if(url.indexOf("youtube.com/watch?v=") !== -1) {//https://m.youtube.com/watch?v=e3S9KINoH2M
	        vidId = url.substr(url.indexOf("youtube.com/watch?v=") + 20);
	    }
	    else if(url.indexOf("youtube.com/watch/?v=") !== -1) {//https://m.youtube.com/watch/?v=e3S9KINoH2M
	        vidId = url.substr(url.indexOf("youtube.com/watch/?v=") + 21);
	    }
	    else if(url.indexOf("youtu.be") !== -1) {
	        vidId = url.substr(url.indexOf("youtu.be") + 9);
	    }
	    else if(url.indexOf("www.youtube.com/embed/") !== -1) {
	        vidId = url.substr(url.indexOf("www.youtube.com/embed/") + 22);
	    }
	    else if(url.indexOf("?v=") !== -1) {// http://m.youtube.com/?v=tbBTNCfe1Bc
	        vidId = url.substr(url.indexOf("?v=")+3, 11);
	    }
	    else {
	        console.warn("YouTubeUrlNormalize getVidId not a youTube Video: " + url);
	        vidId = null;
	    }

	    if(vidId.indexOf("&") !== -1) {
	        vidId = vidId.substr(0, vidId.indexOf("&") );
	    }
	    return vidId;
	};

	function YouTubeUrlNormalize (url){
	    var rtn = url;

	    if(url && url.indexOf("youtube") !== -1) {
	        var vidId = getVidId(url);
	        if(vidId) {
	            rtn = "https://www.youtube.com/embed/" + vidId;
	        }
	        else {
	            rtn = url;
	        }
	    }

	    return rtn;
	};

	function showEvents(data) {
		var len = data.length;
		$(".events").empty();

		for (var i in data) {

			$(".events").append(`<div id="event${data[i].id}"></div>`);

			$("#event" + data[i].id)
			.append(`
			<h2 class="event-title">${data[i].title}</h2>
			<p class="event-description">${data[i].description}</p>
			<img class="event-image" src="${data[i].imagePath}">${data[i].imagePath}
			<iframe src="` + YouTubeUrlNormalize(data[i].videoLink) + `" width="400" height="375"
			frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
			<div class="event-sponsors">Eveniment oferit de</div>
			<p>Eveniment organizat in data:${data[i].eventDate}</p>`);
		}
	}

	function showSponsors(data) {
		var len = data.length;

		for (var i = 0; i < len; i++)
			$(`#event${i} .event-comments`).empty();

		for (var i = 0; i < len; i++) {
			$("#event" + data[i].id + " .event-sponsors")
			.append(`<p class="sponsor-name">Sponsor name->${data[i].name}</p>
				<a class="sponsor-site" href="${data[i].siteLink}">
					<img class="sponsor-logo" src="${data[i].logoLink}">
				</a>`);
		}

	}

	getAllEvents(showEvents);

	//Hack to make comments show propperly
	setTimeout(function () {
		getAllSponsors(showSponsors);
	}, 100);
});
