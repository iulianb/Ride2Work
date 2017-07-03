$(function () {
    function showAllSponsors(data) {
        var length = data.length;
        $(".sponsorsTable").empty();

        for (var i = 0; i < length; i++) {
            $(".sponsorsTable").append('<tr id="row' + i + '">');
            $("#row" + i)
                .append("<td>" + data[i].id + "</td>")
                .append("<td>" + data[i].name + "</td>")
                .append("<td>" + data[i].description + "</td>")
                .append("<td>" + data[i].logoLink + "</td>")
                .append("<td>" + data[i].siteLink + "</td>")
                .append("<td><a href='#' data-toggle='modal' data-target='#sponsorModal' onclick='getEditSponsor("
                + data[i].id + ")'><span class='glyphicon glyphicon-edit edit-button'></span></a><a href='#' data-toggle='modal' data-target='#deleteSponsorModal' onclick='getDeleteSponsor("
                + data[i].id + ")'><span class='glyphicon glyphicon-remove remove-button'></span></a></td>");
        }
    }
    getAllSponsors(showAllSponsors);
});

$("#userName").append(" " + sessionStorage.getItem("currentUser") + ' <b class="caret"></b>');

//GetCurrentSponsor
function getEditSponsor(id) {
    getSponsor(id, getEditSponsorSuccess, getEditSponsorError);
};

function getEditSponsorSuccess(data) {
    document.getElementById("sponsorModalName").innerHTML = data.name;
    document.getElementById("sponsorName").value = data.name;
    document.getElementById("sponsorDescription").value = data.description;
    document.getElementById("sponsorLogoLink").value = data.logoLink;
    document.getElementById("sponsorSiteLink").value = data.siteLink;
};

function getEditSponsorError(message) {
    var errCodes = {
        "404": "Input fields are incorrect!",
        "406": "Something went wrong"
    };
    console.log(errCodes[message.status + ""]);
};

function clearSponsorModal() {
    document.getElementById("sponsorModalName").innerHTML = 'New sponsor';
    document.getElementById("sponsorName").value = '';
    document.getElementById("sponsorDescription").value = '';
    document.getElementById("sponsorLogoLink").value = '';
    document.getElementById("sponsorSiteLink").value = '';
};

//Add new sponsor
function addNewSponsor() {
    var title = document.getElementById("sponsorModalName").innerHTML;
    if (title === "New sponsor") {
        addSponsor(
            {
                name: $("#sponsorName")[0].value,
                description: $("#sponsorDescription")[0].value,
                logoLink: $("#sponsorLogoLink")[0].value,
                siteLink: $("#sponsorSiteLink")[0].value
            }, sponsorAddedSuccess, sponsorAddedError);
        return;
    }
    updateSponsor(
        {
            name: $("#sponsorName")[0].value,
            description: $("#sponsorDescription")[0].value,
            logoLink: $("#sponsorLogoLink")[0].value,
            siteLink: $("#sponsorSiteLink")[0].value
        }, sponsorAddedSuccess, sponsorAddedError);
}

function sponsorAddedSuccess() {
    location.reload();
}

function sponsorAddedError() {
    var errCodes = {
        "404": "Input fields are incorrect!",
        "406": "Something went wrong"
    };
    console.log(errCodes[message.status + ""]);
}

// Delete sponsor
function getDeleteSponsor(id) {
    sessionStorage.setItem("sponsorToDelete", id);
};

function deleteSelectedSponsor() {
    var id = sessionStorage.getItem("sponsorToDelete");
    deleteSponsor(id, deletionSuccess)
};

function deletionSuccess() {
    document.getElementById("deletionSuccessMessage").style.display = "block";
};