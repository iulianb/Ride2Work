$(function () {
    function showAllArticles(data) {
        var length = data.length;
        $(".articlesTable").empty();

        for (var i = 0; i < length; i++) {
            $(".articlesTable").append('<tr id="row' + i + '">');
            $("#row" + i)
                .append("<td>" + data[i].id + "</td>")
                .append("<td>" + data[i].title + "</td>")
                .append("<td>" + data[i].content + "</td>")
                .append("<td>" + data[i].imagePath + "</td>")
                .append("<td>" + data[i].articleDate + "</td>");
        }
    }
    getAllArticles(showAllArticles);
});

$("#userName").append(" " + sessionStorage.getItem("currentUser") + ' <b class="caret"></b>');