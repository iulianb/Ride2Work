$(function () {
    function showAllEvents(data) {
        var length = data.length;
        $(".eventsTable").empty();

        for (var i = 0; i < length; i++) {
            $(".eventsTable").append('<tr id="row' + i + '">');
            $("#row" + i)
                .append("<td>" + data[i].id + "</td>")
                .append("<td>" + data[i].title + "</td>")
                .append("<td>" + data[i].description + "</td>")
                .append("<td><img src='" + data[i].sponsorImage + "' width='25' height='25'</img></td>")
                .append("<td>" + data[i].mapImage + "</td>")
                .append("<td>" + data[i].mapImageLink + "</td>")
                .append("<td>" + data[i].videoLink + "</td>")
                .append("<td>" + data[i].eventDate + "</td>")
                .append("<td><a href='#' data-toggle='modal' data-target='#eventModal' onclick='getEditEvent("
                + data[i].id + ")'><span class='glyphicon glyphicon-edit edit-button'><a href='#' data-toggle='modal' data-target='#deleteEventModal' onclick='getDeleteEvent("
                + data[i].id + ")'><span class='glyphicon glyphicon-remove remove-button'></span></a></td>");
        }
    }
    getAllEvents(showAllEvents);
});

$("#userName").append(" " + sessionStorage.getItem("currentUser") + ' <b class="caret"></b>');

//GetCurrentEvent
function getEditEvent(id) {
    getEvent(id, getEditEventSuccess, getEditEventError);
};

function getEditEventSuccess(data) {
    document.getElementById("eventModalName").innerHTML = data.title;
    document.getElementById("eventTitle").value = data.title;
    document.getElementById("eventDescription").value = data.description;
    document.getElementById("eventSponsor").value = data.sponsorImage;
    document.getElementById("eventMapImage").value = data.mapImage;
    document.getElementById("eventLocation").value = data.mapImageLink;
    document.getElementById("eventVideoLink").value = data.videoLink;
    document.getElementById("eventDate").value = data.eventDate;
};

//TODO
function getEditEventError(message) {
    var errCodes = {
        "404": "Input fields are incorrect!",
        "406": "Something went wrong"
    };
    console.log(errCodes[message.status + ""]);
};

function clearEventModal() {
    document.getElementById("eventModalName").innerHTML = "New event";
    document.getElementById("eventTitle").value = '';
    document.getElementById("eventDescription").value = '';
    document.getElementById("eventSponsor").value = '';
    document.getElementById("eventMapImage").value = '';
    document.getElementById("eventLocation").value = '';
    document.getElementById("eventVideoLink").value = '';
    document.getElementById("eventDate").value = '';
};

//Add new event
function addNewEvent() {
    var title = document.getElementById("eventModalName").innerHTML;
    if (title === "New event") {
        addEvent(
            {
                title: $("#eventTitle")[0].value,
                description: $("#eventDescription")[0].value,
                sponsorImage: $("#eventSponsor")[0].value,
                mapImage: $("#eventMapImage")[0].value,
                location: $("#eventLocation")[0].value,
                videoLink: $("#eventVideoLink")[0].value,
                eventDate: $("#eventDate")[0].value
            }, eventAddedSuccess, eventAddedError);
        return;
    }
    var now = new Date();
    updateEvent(
        {
            title: $("#eventTitle")[0].value,
            description: $("#eventDescription")[0].value,
            sponsorImage: $("#eventSponsor")[0].value,
            mapImage: $("#eventMapImage")[0].value,
            location: $("#eventLocation")[0].value,
            videoLink: $("#eventVideoLink")[0].value,
            eventDate: $("#eventDate")[0].value
        }, eventAddedSuccess, eventAddedError);
}

function eventAddedSuccess() {
    location.reload();
}

function eventAddedError() {
    var errCodes = {
        "404": "Input fields are incorrect!",
        "406": "Something went wrong"
    };
    console.log(errCodes[message.status + ""]);
}

// Delete event
function getDeleteEvent(id) {
    sessionStorage.setItem("eventToDelete", id);
};

function deleteSelectedEvent() {
    var id = sessionStorage.getItem("eventToDelete");
    deleteEvent(id, deletionSuccess)
};

function deletionSuccess() {
    document.getElementById("deletionSuccessMessage").style.display = "block";
};
