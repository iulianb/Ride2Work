$(function () {
    function showAllComments(data) {
        var length = data.length;
        $(".commentsTable").empty();

        for (var i = 0; i < length; i++) {
            $(".commentsTable").append('<tr id="row' + i + '">');
            $("#row" + i)
                .append("<td>" + data[i].id + "</td>")
                .append("<td>" + data[i].name + "</td>")
                .append("<td><div class='content'>" + data[i].content + "</div></td>")
                .append("<td>" + data[i].commentDate + "</td>")
                .append("<td>" + data[i].articleID + "</td>")
                .append("<td><a href='#' data-toggle='modal' data-target='#deleteCommentModal' onclick='getDeleteComment("
                + data[i].id + ")'><span class='glyphicon glyphicon-remove remove-button'></span></a></td>");
        }
    }
    getAllComments(showAllComments);
});

$("#userName").append(" " + sessionStorage.getItem("currentUser") + ' <b class="caret"></b>');

// Delete comment
function getDeleteComment(id) {
    sessionStorage.setItem("commentToDelete", id);
};

function deleteSelectedComment() {
    var id = sessionStorage.getItem("commentToDelete");
    deleteComment(id, deletionSuccess)
};

function deletionSuccess() {
    document.getElementById("deletionSuccessMessage").style.display = "block";
};