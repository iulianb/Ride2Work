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
                .append("<td><a href='#' data-toggle='modal' data-target='#articleModal' onclick='getEditArticle("
                + data[i].id + ")'><span class='glyphicon glyphicon-edit edit-button'></span></a><a href='#' data-toggle='modal' data-target='#deleteArticleModal' onclick='getDeleteArticle("
                + data[i].id + ")'><span class='glyphicon glyphicon-remove remove-button'></span></a></td>");
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
};

function getEditArticleError(message) {
    var errCodes = {
        "404": "Input fields are incorrect!",
        "406": "Something went wrong"
    };
    console.log(errCodes[message.status + ""]);
};

function clearArticleModal() {
    document.getElementById("articleModalName").innerHTML = "New article";
    document.getElementById("articleTitle").value = "";
    document.getElementById("articleContent").value = "";
    document.getElementById("articleImage").value = "";
    document.getElementById("articleDateAdded").value = "";
};

//Add new article
function addNewArticle() {
    var title = document.getElementById("articleModalName").innerHTML;
    if (title === "New article") {
        addArticle(
            {
                title: $("#articleTitle")[0].value,
                content: $("#articleContent")[0].value,
                imagePath: $("#articleImage")[0].value,
                articleDate: $("#articleDateAdded")[0].value,
                lastEditDate: $("#articleDateAdded")[0].value,
                lastEditUserID: sessionStorage.getItem("currentUserId")
            }, articleAddedSuccess, articleAddedError);
        return;
    }
    var now = new Date();
    updateArticle(
        {
            title: $("#articleTitle")[0].value,
            content: $("#articleContent")[0].value,
            imagePath: $("#articleImage")[0].value,
            articleDate: $("#articleDateAdded")[0].value,
            lastEditDate: now.format("isoDateTime"),
            lastEditUserID: sessionStorage.getItem("currentUserId")
        }, articleAddedSuccess, articleAddedError);
}

function articleAddedSuccess() {
    location.reload();
}

function articleAddedError() {
    var errCodes = {
        "404": "Input fields are incorrect!",
        "406": "Something went wrong"
    };
    console.log(errCodes[message.status + ""]);
}

// Delete article
function getDeleteArticle(id) {
    sessionStorage.setItem("articleToDelete", id);
};

function deleteSelectedArticle() {
    var id = sessionStorage.getItem("articleToDelete");
    deleteArticle(id, deletionSuccess)
};

function deletionSuccess() {
    document.getElementById("deletionSuccessMessage").style.display = "block";
};