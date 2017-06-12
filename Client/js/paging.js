page.base("/");
page('/about', about);

function about() {
	console.log("ABOUUUUT");
	document.querySelector('.p').textContent = 'viewing about';
}
