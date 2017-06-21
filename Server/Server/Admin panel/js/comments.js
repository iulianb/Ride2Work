$(function () {
    function showAllComments(data) {
        var length = data.length;
        $(".commentsTable").empty();

        for (var i = 0; i < length; i++) {
            $(".commentsTable").append('<tr id="row' + i + '">');
            $("#row" + i)
                .append("<td>" + data[i].id + "</td>")
                .append("<td>" + data[i].name + "</td>")
                .append("<td>" + data[i].content + "</td>")
                .append("<td>" + data[i].commentDate + "</td>")
                .append("<td>" + data[i].articleID + "</td>")
                .append("<td><span class='glyphicon glyphicon-edit edit-button'></span><span class='glyphicon glyphicon-remove remove-button'></span></td>");
        }
    }
    getAllComments(showAllComments);
});

$("#userName").append(" " + sessionStorage.getItem("currentUser") + ' <b class="caret"></b>');