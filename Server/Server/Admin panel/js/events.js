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
                .append("<td>" + data[i].imagePath + "</td>")
                .append("<td>" + data[i].videoLink + "</td>")
                .append("<td>" + data[i].eventDate + "</td>")
                .append("<td><span class='glyphicon glyphicon-edit edit-button'></span><span class='glyphicon glyphicon-remove remove-button'></span></td>");
        }
    }
    getAllEvents(showAllEvents);
});

$("#userName").append(" " + sessionStorage.getItem("currentUser") + ' <b class="caret"></b>');