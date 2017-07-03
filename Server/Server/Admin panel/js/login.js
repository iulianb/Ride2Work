//Login
function login() {
    var user = "";
    var pass = "";

    user = $("#username")[0].value;
    pass = $("#password")[0].value;

    if (user === "" || pass === "") {
        alert("You must input all fields.");
    }
    else {
        signIn({
            username: user,
            password: pass
        }
            , loginSuccess, loginError);
    }
};

function loginSuccess(message) {
    sessionStorage.setItem("currentUser", message.userName);
    sessionStorage.setItem("currentUserId", message.id);
    window.location.replace("articles.html");
}

//TODO
function loginError(message) {
    var errCodes = {
        "404": "Input fields are incorrect!",
        "406": "Something went wrong"
    };
    console.log(errCodes[message.status + ""]);
}

//TODO
//Forgot password
function sendPassword() {
    var email = "";
    email = $("#email")[0].value;
    if (email === "") {
        alert("You must enter email address.");
    }
    else {
        $.ajax({
            url: "http://localhost:49421/api/Login/ForgotPassword",
            type: "POST",
            data: {
                email: email
            }
        })
            .done(function (mess) {
                console.log(mess);
            });
    }
};