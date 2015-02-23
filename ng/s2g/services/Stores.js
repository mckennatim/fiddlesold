var Stores =angular.module('Stores', []);

Stores.factory('Stores', function(){
	var st = JSON.parse(localStorage.getItem('s2g_stores'))  || reload();	
	var reload = function(){
		localStorage.setItem('s2g_stores', JSON.stringify(stores));
		st = JSON.parse(localStorage.getItem('s2g_stores'))
	};
	return{
		st:st,
		reset: function(){
			console.log(JSON.stringify(stores))
			localStorage.setItem('s2g_stores', JSON.stringify(stores));
		},
	}
})