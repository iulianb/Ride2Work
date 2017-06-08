//API stuff

var baseurl = "localhost";//this will be added from backend

var userErrorCodes = {
		"400" : "bad request",
		"404" : "not found",
		"405" : "THOU ART RETARDED!!!",
		"406" : "not acceptable"
};

console.log(userErrorCodes["" + 400]);

function callAPI (variables) {
	$.ajax({
		url: baseurl + "/api/" + variables.where,
		type: variables.type,
		data: { data: variables.data },
		success: function(msg) {
			console.log(msg);
			return msg;
		},
		error: function(msg) {
			console.log(variables.error["" + msg.status]);
			console.log(msg);
		}
	});
}

//GET ALL NEEDED INFO
function getArticles() {
	callAPI({
		where : "articles",
		type: "GET"
	});
}
function getComments () {
	callAPI({
		where: "comments",
		type: "GET"
	});
}
function getEvents() {
	callAPI({
		where: "events",
		type: "GET"
	});
}
function getEventSponsors () {
	callAPI({
		where: "eventsSponsors",
		type: "GET"
	});
}


//GET ONLY SPECIFIC INFO
function getArticle (id) {
	callAPI({
		where: "articles/" + id,
		type: "GET"
	});
}


function getComment (id) {
	callAPI({
		where: "comments/" + id,
		type: "GET"
	});
}


function getEvent (id) {
	callAPI({
		where: "events/" + id,
		type: "GET"
	});
}


function getEventSponsor (id) {
	callAPI({
		where: "eventsSponsors/" + id,
		type: "GET"
	});
}

//commentData==>JSON with (name,comment,commendDate,articleID)
function postComment (commentData) {
	callAPI({
		where: "comments",
		type: "POST",
		data: commentData
	});
}
