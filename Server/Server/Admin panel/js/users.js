$(function () {
    function showAllUsers(data) {
        var length = data.length;
        $(".usersTable").empty();

        for (var i = 0; i < length; i++) {
            $(".usersTable").append('<tr id="row' + i + '">');
            $("#row" + i)
                .append("<td>" + data[i].id + "</td>")
                .append("<td>" + data[i].userName + "</td>")
                .append("<td>" + data[i].email + "</td>")
                .append("<td>" + data[i].role + "</td>")
                .append("<td><span class='glyphicon glyphicon-edit edit-button'></span><span class='glyphicon glyphicon-remove remove-button'></span></td>");
        }
    }
    getAllUsers(showAllUsers);
});

$("#userName").append(" " + sessionStorage.getItem("currentUser") + ' <b class="caret"></b>');

//GetCurrentUser
function getEditUser() {
    var user = sessionStorage.getItem("currentUser");
    if (user === "" || user == "null") {
        alert("No user");
    }
    getCurrentUser({
        username: user,
    }
        , getCurrentUserSuccess, getCurrentUserError);
};

function getCurrentUserSuccess(data) {
    document.getElementById("currentUserName").innerHTML = data.userName;
    document.getElementById("currentUserEmail").value = data.email;
}

//TODO
function getCurrentUserError(message) {
    var errCodes = {
        "404": "Input fields are incorrect!",
        "406": "Something went wrong"
    };
    console.log(errCodes[message.status + ""]);
}