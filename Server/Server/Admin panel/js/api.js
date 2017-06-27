//API stuff
"use strict";

//Location of the deployed server
// var baseurl = "http://89.44.121.72:8001";
var baseurl = "http://localhost:49421";



/*Call API params:
	where==>where on the api the call must be made

	type==>type of the call => { GET, POST, PUT, DELETE }

	data==>data that must be used in the call(usually an object with stuff)

	error==>response codes for error cases
*/
//Call API will return an object that was received from the server
//or it will output an error message if anything goes wrong
function callAPI(variables) {
    $.ajax({
        url: baseurl + "/api/" + variables.where,
        type: variables.type,
        data: variables.data,
        success: function (response) {
            variables.successCall(response);
        },
        error: function (response) {
            variables.errorCall(response);
        }
    });
}

//GET ALL NEEDED INFO
function getAllUsers(success, error) {
    return callAPI({
        where: "users",
        type: "GET",
        successCall: success,
        errorCall: error
    });
}

function getAllArticles(success, error) {
    return callAPI({
        where: "articles",
        type: "GET",
        successCall: success,
        errorCall: error
    });
}

function getAllComments(success, error) {
    return callAPI({
        where: "comments",
        type: "GET",
        successCall: success,
        errorCall: error
    });
}

function getAllEvents(success, error) {
    return callAPI({
        where: "events",
        type: "GET",
        successCall: success,
        errorCall: error
    });
}

function getAllEventSponsors(success, error) {
    return callAPI({
        where: "eventsSponsors",
        type: "GET",
        successCall: success,
        errorCall: error
    });
}

function getAllSponsors(success, error) {
    return callAPI({
        where: "Sponsors",
        type: "GET",
        successCall: success,
        errorCall: error
    });
}


//GET ONLY SPECIFIC INFO
function getUser(id, success, error) {
    return callAPI({
        where: "users/" + id,
        type: "GET",
        successCall: success,
        errorCall: error
    });
}

function getCurrentUser(userData, success, error) {
    return callAPI({
        where: "Users/GetCurrentUser",
        type: "POST",
        data: userData,
        successCall: success,
        errorCall: error
    });
}

function getArticle(id, success, error) {
    return callAPI({
        where: "articles/" + id,
        type: "GET",
        successCall: success,
        errorCall: error
    });
}

function getComment(id, success, error) {
    return callAPI({
        where: "comments/" + id,
        type: "GET",
        successCall: success,
        errorCall: error
    });
}

function getEvent(id, success, error) {
    return callAPI({
        where: "events/" + id,
        type: "GET",
        successCall: success,
        errorCall: error
    });
}

function getEventSponsor(id, success, error) {
    return callAPI({
        where: "eventsSponsors/" + id,
        type: "GET",
        successCall: success,
        errorCall: error
    });
}

function getSponsor(id, success, error) {
    return callAPI({
        where: "Sponsors/" + id,
        type: "GET",
        successCall: success,
        errorCall: error
    });
}


//ADD SPECIFIC INFO

//userData==>{ UserName, Password, Email, Role }
//responseCodes==>created: 201; not acceptable: 406(same email or username);bad request: 400
function addUser(userData, success, error) {
    return callAPI({
        where: "users",
        type: "POST",
        data: userData,
        successCall: success,
        errorCall: error
    });
}

//articeData==>{ Title,Content, ImagePath, ArticleDate }
function addArticle(articleData, success, error) {
    return callAPI({
        where: "articles",
        type: "POST",
        data: articleData,
        successCall: success,
        errorCall: error
    });
}

//commentData==>{ name, content, commentDate, articleID }
function addComment(commentData, success, error) {
    return callAPI({
        where: "comments",
        type: "POST",
        data: commentData,
        successCall: success,
        errorCall: error
    });
}


//eventData==>{ title, description, imagePath, videoLink, eventDate }
function addEvent(eventData, success, error) {
    return callAPI({
        where: "events",
        type: "POST",
        data: eventData,
        successCall: success,
        errorCall: error
    });
}

//eventSponsorData==>{ linkToFacebook, eventID, sponsorID }
function addEventSponsor(eventSponsorData, success, error) {
    return callAPI({
        where: "eventsSponsors",
        type: "POST",
        data: eventSponsorData,
        successCall: success,
        errorCall: error
    });
}

//sponsorData==>{ logoLink, name, siteLink, description }
function addSponsor(sponsorData, success, error) {
    return callAPI({
        where: "Sponsors",
        type: "POST",
        data: sponsorData,
        successCall: success,
        errorCall: error
    });
}

//UPDATE SPECIFIC INFO
//responseCodes: OK: 200;not found: 404; not acceptable: 406; bad request: 400


function updateUser(id, userData, success, error) {
    return callAPI({
        where: "users/" + id,
        type: "PUT",
        data: userData,

        successCall: success,
        errorCall: error
    });
}


function updateArticle(id, articleData, success, error) {
    return callAPI({
        where: "articles/" + id,
        type: "PUT",
        data: articleData,

        successCall: success,
        errorCall: error
    });
}

function updateComment(id, commentData, success, error) {
    return callAPI({
        where: "comments/" + id,
        type: "POST",
        data: commentData,

        successCall: success,
        errorCall: error
    });
}


function updateEvent(id, eventData, success, error) {
    return callAPI({
        where: "events/" + id,
        type: "PUT",
        data: eventData,

        successCall: success,
        errorCall: error
    });
}



function updateEventSponsor(id, eventSponsorData, success, error) {
    return callAPI({
        where: "eventsSponsors/" + id,
        type: "PUT",
        data: eventSponsorData,

        successCall: success,
        errorCall: error
    });
}


function updateSponsor(id, sponsorData, success, error) {
    return callAPI({
        where: "Sponsors/" + id,
        type: "PUT",
        data: sponsorData,

        successCall: success,
        errorCall: error
    });
}

//DELETE SPECIFIC INFO

function deleteUser(id, success, error) {
    return callAPI({
        where: "users/" + id,
        type: "DELETE",
        successCall: success,
        errorCall: error
    });
}


function deleteArticle(id, success, error) {
    return callAPI({
        where: "articles/" + id,
        type: "DELETE",
        successCall: success,
        errorCall: error
    });
}


function deleteComent(id, success, error) {
    return callAPI({
        where: "comments/" + id,
        type: "DELETE",
        successCall: success,
        errorCall: error
    });
}

function deleteEvent(id, success, error) {
    return callAPI({
        where: "events/" + id,
        type: "DELETE",
        successCall: success,
        errorCall: error
    });
}

function deleteEventSponsor(id, success, error) {
    return callAPI({
        where: "eventSponsors/" + id,
        type: "DELETE",
        successCall: success,
        errorCall: error
    });
}

function deleteSponsor(id, success, error) {
    return callAPI({
        where: "Sponsors/" + id,
        type: "DELETE",
        successCall: success,
        errorCall: error
    });
}

//LOGIN
//responseCodes: OK: 200;not found: 404; not acceptable: 406; bad request: 400
function signIn(userData, success, error) {
    return callAPI({
        where: "Login/SignIn",
        type: "POST",
        data: userData,
        successCall: success,
        errorCall: error
    });
}

function forgotPassword(userData, success, error) {
    return callAPI({
        where: "Login/ForgotPassword",
        type: "POST",
        data: userData,
        successCall: success,
        errorCall: error
    });
}
