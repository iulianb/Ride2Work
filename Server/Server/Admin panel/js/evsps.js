$(function () {
    function showAllEventsSponsors(data) {
        var length = data.length;
        $(".evsSpsTable").empty();

        for (var i = 0; i < length; i++) {
            $(".evsSpsTable").append('<tr id="row' + i + '">');
            $("#row" + i)
                .append("<td>" + data[i].id + "</td>")
                .append("<td>" + data[i].linkToFacebook + "</td>")
                .append("<td>" + data[i].eventID + "</td>")
                .append("<td>" + data[i].sponsorID + "</td>")
                .append("<td><a href='#' data-toggle='modal' data-target='#eventSponsorModal' onclick='getEditEvSp(" + data[i].id + ")'><span class='glyphicon glyphicon-edit edit-button'></span></a><span class='glyphicon glyphicon-remove remove-button'></span></td>");

        }
    }
    getAllEventSponsors(showAllEventsSponsors);
});

$("#userName").append(" " + sessionStorage.getItem("currentUser") + ' <b class="caret"></b>');

//GetCurrentEvSp
function getEditEvSp(id) {
    getEventSponsor(id, getEditEvSpSuccess, getEditEvSpError);
};

function getEditEvSpSuccess(data) {
    document.getElementById("eventSponsorModalName").innerHTML = 'Link';
    document.getElementById("evspLinkToFb").value = data.linkToFacebook;
    document.getElementById("evspEvent").value = data.eventID;
    document.getElementById("evspSponsor").value = data.sponsorID;
}

//TODO
function getEditEvSpError(message) {
    var errCodes = {
        "404": "Input fields are incorrect!",
        "406": "Something went wrong"
    };
    console.log(errCodes[message.status + ""]);
}

function clearEvSpModal() {
    document.getElementById("eventSponsorModalName").innerHTML = "New link";
    document.getElementById("evspLinkToFb").value = '';
    document.getElementById("evspEvent").value = '';
    document.getElementById("evspSponsor").value = '';
}