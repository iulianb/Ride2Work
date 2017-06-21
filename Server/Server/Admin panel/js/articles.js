$(function () {
    function showAllArticles(data) {
        var length = data.length;
        $(".articlesTable").empty();

        for (var i = 0; i < length; i++) {
            $(".articlesTable").append('<tr id="row' + i + '">');
            $("#row" + i)
                .append("<td>" + data[i].id + "</td>")
                .append("<td>" + data[i].title + "</td>")
                .append("<td><div class='content'>" + data[i].content + "</div></td>")
                .append("<td><img src='" + data[i].imagePath + "' width='25' height='25'</img></td>")
                .append("<td>" + data[i].articleDate + "</td>")
                .append("<td><span class='glyphicon glyphicon-edit edit-button'></span><span class='glyphicon glyphicon-remove remove-button'></span></td>");
        }
    }
    getAllArticles(showAllArticles);
});

$("#userName").append(" " + sessionStorage.getItem("currentUser") + ' <b class="caret"></b>');