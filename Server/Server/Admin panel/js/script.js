function formSend() {
    var username = "";
    var password = "";
 
    username = $("#username")[0].value;
    password = $("#password")[0].value;

    if (username === "" || password === "") {
        alert("You must input all fields.");
    }
    else {
        $.ajax({
            url: "http://localhost:49421/api/Login/SignIn",
            type: "POST",
            data: {
                username : username,
                password : password
            }
        })
        .done(function (mess) {
            console.log(mess);
        });
    }
};