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
                .append("<td><a href='#' data-toggle='modal' data-target='#sponsorModal' onclick='getEditSponsor(" + data[i].id + ")'><span class='glyphicon glyphicon-edit edit-button'></span></a><span class='glyphicon glyphicon-remove remove-button'></span></td>");
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
}

//TODO
function getEditSponsorError(message) {
    var errCodes = {
        "404": "Input fields are incorrect!",
        "406": "Something went wrong"
    };
    console.log(errCodes[message.status + ""]);
}

function clearSponsorModal() {
    document.getElementById("sponsorModalName").innerHTML = 'New sponsor';
    document.getElementById("sponsorName").value = '';
    document.getElementById("sponsorDescription").value = '';
    document.getElementById("sponsorLogoLink").value = '';
    document.getElementById("sponsorSiteLink").value = '';
}