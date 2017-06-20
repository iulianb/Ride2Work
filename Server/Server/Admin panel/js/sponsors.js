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
                .append("<td>" + data[i].siteLink + "</td>");
        }
    }
    getAllSponsors(showAllSponsors);
});

$("#userName").append(" " + sessionStorage.getItem("currentUser") + ' <b class="caret"></b>');