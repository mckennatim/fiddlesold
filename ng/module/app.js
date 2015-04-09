var app= angular.module('App', [
	'ui.bootstrap',
	'ui.router',
	'Module'
	]);


app.constant('cfg', {
	serverURL: 'http://localhost:3000/api/',
	LSpre: 'my_'
});