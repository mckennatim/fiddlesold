var Lists = angular.module('Lists', []);
 
Lists.factory('Lists',  ['$http', function($http){
	var clistsStr = localStorage.getItem('s2g_clists')
	var lal = !clistsStr ? {} : JSON.parse(clistsStr); 
	return{
		cat: 'mabibi',
		lal:lal,    
		saveLocal: function(lid){
			//lal[lid].timestamp = Date.now();
			localStorage.setItem('s2g_clists', JSON.stringify(lal));
		}
	}
}])