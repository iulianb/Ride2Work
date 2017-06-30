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
                .append("<td>" + data[i].lastEditDate + "</td>")
                .append("<td>" + data[i].lastEditUserID + "</td>")
                .append("<td><a href='#' data-toggle='modal' data-target='#articleModal' onclick='getEditArticle(" + data[i].id + ")'><span class='glyphicon glyphicon-edit edit-button'></span></a><span class='glyphicon glyphicon-remove remove-button'></span></td>");
        }
    }
    getAllArticles(showAllArticles);
});

$("#userName").append(" " + sessionStorage.getItem("currentUser") + ' <b class="caret"></b>');

//GetCurrentArticle
function getEditArticle(id) {
    getArticle(id, getEditArticleSuccess, getEditArticleError);
};

function getEditArticleSuccess(data) {
    document.getElementById("articleModalName").innerHTML = data.title;
    document.getElementById("articleTitle").value = data.title;
    document.getElementById("articleContent").value = data.content;
    document.getElementById("articleImage").value = data.imagePath;
    document.getElementById("articleDateAdded").value = data.articleDate;
}

//TODO
function getEditArticleError(message) {
    var errCodes = {
        "404": "Input fields are incorrect!",
        "406": "Something went wrong"
    };
    console.log(errCodes[message.status + ""]);
}

function clearArticleModal() {
    document.getElementById("articleModalName").innerHTML = "New article";
    document.getElementById("articleTitle").value = "";
    document.getElementById("articleContent").value = "";
    document.getElementById("articleImage").value = "";
    document.getElementById("articleDateAdded").value = "";
}