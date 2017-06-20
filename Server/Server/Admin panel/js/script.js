function login() {
    var username = "";
    var password = "";
 
    username = $("#username")[0].value;
    password = $("#password")[0].value;

    if (username === "" || password === "") {
        alert("You must input all fields.");
    }
    else {
        signIn({
           data : {
                username : username,
                password : password
           }
        }, loginSuccess, loginError);
    }
};

function loginSuccess(message) {
    alert(message);
}

function loginError(message) {
    alert(message);
}

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