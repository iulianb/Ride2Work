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
                .append("<td><a href='#' data-toggle='modal' data-target='#userModal' onclick='getEditUser("
                + data[i].id + ")'><span class='glyphicon glyphicon-edit edit-button'></span></a><a href='#' data-toggle='modal' data-target='#deleteUserModal' onclick='getDeleteUser("
                + data[i].id + ")'><span class='glyphicon glyphicon-remove remove-button'></span></a></td>");
        }
    }
    getAllUsers(showAllUsers);
});

$("#userName").append(" " + sessionStorage.getItem("currentUser") + ' <b class="caret"></b>');

//GetCurrentUser
function getEditUser(id) {
    getUser(id, getEditUserSuccess, getEditUserError);
};

function getEditUserSuccess(data) {
    document.getElementById("userModalName").innerHTML = data.userName;
    document.getElementById("userUserName").value = data.userName;
    document.getElementById("userEmail").value = data.email;
    document.getElementById("userRole").value = data.role;
    document.getElementById("userPassword").disabled = true;
    document.getElementById("userConfirmPassword").disabled = true;
};

//TODO
function getEditUserError(message) {
    var errCodes = {
        "404": "Input fields are incorrect!",
        "406": "Something went wrong"
    };
    console.log(errCodes[message.status + ""]);
};

function clearUserModal() {
    document.getElementById("userModalName").innerHTML = 'New User';
    document.getElementById("userUserName").value = '';
    document.getElementById("userEmail").value = '';
    document.getElementById("userRole").value = '';
    document.getElementById("userPassword").disabled = false;
    document.getElementById("userConfirmPassword").disabled = false;
};

//Add new user
function addNewUser() {
    var title = document.getElementById("userModalName").innerHTML;
    if (title === "New user") {
        addUser(
            {
                userName: $("#userUserName")[0].value,
                email: $("#userEmail")[0].value,
                role: $("#userRole")[0].value,
                password: $("#userPassword")[0].value
            }, userAddedSuccess, userAddedError);
        return;
    }
    updateUser(
        {
            userName: $("#userUserName")[0].value,
            email: $("#userEmail")[0].value,
            role: $("#userRole")[0].value
        }, userAddedSuccess, userAddedError);
}

function userAddedSuccess() {
    location.reload();
}

function userAddedError() {
    var errCodes = {
        "404": "Input fields are incorrect!",
        "406": "Something went wrong"
    };
    console.log(errCodes[message.status + ""]);
}

// Delete user
function getDeleteUser(id) {
    sessionStorage.setItem("userToDelete", id);
};

function deleteSelectedUser() {
    var id = sessionStorage.getItem("userToDelete");
    deleteUser(id, deletionSuccess)
};

function deletionSuccess() {
    document.getElementById("deletionSuccessMessage").style.display = "block";
};