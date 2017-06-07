//API stuff

var baseurl = "localhost";//this will be added from backend

function callAPI (where, type, data) {
	$.ajax({
		url: baseurl + "/api/" + where,
		type: type,
		data: { data: data },
		success: function(msg) {
			console.log(msg);
		},
		error: function(msg) {
			console.log(msg);
		}
	});
}
