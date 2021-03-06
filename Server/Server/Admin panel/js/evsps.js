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
                .append("<td><span class='glyphicon glyphicon-edit edit-button'></span><span class='glyphicon glyphicon-remove remove-button'></span></td>");
        }
    }
    getAllEventSponsors(showAllEventsSponsors);
});

$("#userName").append(" " + sessionStorage.getItem("currentUser") + ' <b class="caret"></b>');