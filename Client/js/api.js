//API stuff

var baseurl = "localhost";//this will be added from backend


/*Call API params:
//where==>where on the api the call must be made
//type==>type of the call => { GET, POST, PUT, DELETE }
//data==>data that must be used in the call(usually an object with stuff)
//error==>response codes for error cases
*/
//return callAPI will return an object that was recieved from the server
//or it will output an error message if anything goes wrong
function callAPI (variables) {
	$.ajax({
		url: baseurl + "/api/" + variables.where,
		type: variables.type,
		data: variables.data ,
		success: function(msg) {
			console.log(msg);
			return msg;
		},
		error: function(msg) {
			console.log(msg);
			return variables.error["" + msg.status];

		}
	});
}

//GET ALL NEEDED INFO
function getAllUsers() {
	return callAPI({
		where: "users",
		type: "GET",
	});
}

function getAllArticles() {
	return callAPI({
		where : "articles",
		type: "GET"
	});
}

function getAllComments () {
	return callAPI({
		where: "comments",
		type: "GET"
	});
}

function getAllEvents() {
	return callAPI({
		where: "events",
		type: "GET"
	});
}

function getAllEventSponsors () {
	return callAPI({
		where: "eventsSponsors",
		type: "GET"
	});
}

function getAllSponsors() {
	return callAPI({
		where: "Sponsors",
		type: "GET",
	});
}


//GET ONLY SPECIFIC INFO
function getUser(id) {
	return callAPI({
		where: "user/" + id,
		type: "GET",
	});
}

function getArticle (id) {
	return callAPI({
		where: "articles/" + id,
		type: "GET"
	});
}

function getComment (id) {
	return callAPI({
		where: "comments/" + id,
		type: "GET"
	});
}

function getEvent (id) {
	return callAPI({
		where: "events/" + id,
		type: "GET"
	});
}

function getEventSponsor (id) {
	return callAPI({
		where: "eventsSponsors/" + id,
		type: "GET"
	});
}

function getSponsor(id) {
	return callAPI({
		where: "Sponsors/" + id,
		type: "GET",
	});
}


//ADD SPECIFIC INFO

//userData==>{ UserName, Password, Email, Role }
//responseCodes==>created: 201; not acceptable: 406(same email or username);bad request: 400
function addUser(userData) {
	return callAPI({
		where: "users",
		type: "POST",
		data: userData
	});
}

//articeData==>{ Title,Content, ImagePath, ArticleDate }
function addArticle(articleData) {
	return callAPI({
		where: "articles",
		type: "POST",
		data: articleData
	});
}

//commentData==>{ name, content, commentDate, articleID }
function addComment(commentData) {
	return callAPI({
		where: "comments",
		type: "POST",
		data: commentData
	});
}

//eventData==>{ title, description, imagePath, videoLink, eventDate }
function addEvent(eventData) {
	return callAPI({
		where: "events",
		type: "POST",
		data: eventData
	});
}

//eventSponsorData==>{ linkToFacebook, eventID, sponsorID }
function addEventSponsor(eventSponsorData) {
	return callAPI({
		where: "eventsSponsors",
		type: "POST",
		data: eventSponsorData
	});
}

//sponsorData==>{ logoLink, name, siteLink, description }
function addSponsor(sponsorData) {
	return callAPI({
		where: "Sponsors",
		type: "POST",
		data: sponsorData
	});
}

//UPDATE SPECIFIC INFO
//responseCodes: OK: 200;not found: 404; not acceptable: 406; bad request: 400
var userErrorCodes = {
		"400" : "Bad Request: Something went wrong!",
		"404" : "Not Found: user was not found in database!",
		"406" : "Not Acceptable: Inputted email/username must be different!"
};
function updateUser(id, userData) {
	return callAPI({
		where: "users/" + id,
		type: "PUT",
		data: userData,
		error : userErrorCodes
	});
}

var articleErrorCodes = {
		"400" : "Bad Request: Something went wrong!",
		"404" : "Not Found: article was not found in database!",
		"406" : "Not Acceptable: Inputted title must be different!"
};
function updateArticle(id, articleData) {
	return callAPI({
		where: "articles/" + id,
		type: "PUT",
		data: articleData,
		error : userErrorCodes
	});
}

var commentErrorCodes = {
		"400" : "Bad Request: Something went wrong!",
		"404" : "Not Found: article was not found in database!"
};
function updateComment(id, commentData) {
	return callAPI({
		where: "comments/" + id,
		type: "POST",
		data: commentData,
		error: commentErrorCodes
	});
}

var eventErrorCodes = {
		"400" : "Bad Request: Something went wrong!",
		"404" : "Not Found: event was not found in database!",
		"406" : "Not Acceptable: Inputted title must be different!"
};
function updateEvent(id, eventData) {
	return callAPI({
		where: "events/" + id,
		type: "PUT",
		data: eventData,
		error: eventErrorCodes
	});
}


var eventSponsorsErrorCodes = {
		"400" : "Bad Request: Something went wrong!",
		"404" : "Not Found: event sponsor was not found in database!",
		"406" : "Not Acceptable: Inputted eventID and sponsorID allready exist!"
};
function updateEventSponsor(id, eventSponsorData) {
	return callAPI({
		where: "eventsSponsors/" + id,
		type: "PUT",
		data: eventSponsorData,
		error: eventSponsorsErrorCodes
	});
}

var sponsorErrorCodes = {
		"400" : "Bad Request: Something went wrong!",
		"404" : "Not Found: sponsor was not found in database!",
		"406" : "Not Acceptable: Inputted name already exists!"
};
function updateSponsor(id, sponsorData) {
	return callAPI({
		where: "Sponsors/" + id,
		type: "PUT",
		data: sponsorData,
		error: sponsorErrorCodes
	});
}

//DELETE SPECIFIC INFO

function deleteUser(id) {
	return callAPI({
		where: "user/" + id,
		type: "DELETE",
	});
}


function deleteArticle(id) {
	return callAPI({
		where: "articles/" + id,
		type: "DELETE",
	});
}


function deleteComent(id) {
	return callAPI({
		where: "comments/" + id,
		type: "DELETE"
	});
}

function deleteEvent(id) {
	return callAPI({
		where: "events/" + id,
		type: "DELETE",
	});
}

function deleteEventSponsor(id) {
	return callAPI({
		where: "eventSponsors/" + id,
		type: "DELETE"
	});
}

function deleteSponsor(id) {
	return callAPI({
		where: "Sponsors/" + id,
		type: "DELETE"
	});
}
