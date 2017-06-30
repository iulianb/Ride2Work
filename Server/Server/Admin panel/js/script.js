function filterByKeyword() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filter");
    filter = input.value.toUpperCase();
    table = document.getElementById("genericTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i <= tr.length; i++) {
        td = tr[i].innerText;
        if (td) {
            if (td.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

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