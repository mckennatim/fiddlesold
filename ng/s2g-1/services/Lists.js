var Lists = angular.module('Lists', []);
 
Lists.factory('Lists',  ['$http', 'Lists', function($http, Lists){
	var clistsStr = localStorage.getItem('s2g_clists')
	var lal = !clistsStr ? {} : JSON.parse(clistsStr); 
	var activeList= lal.activeList='Jutebi';   
	return{
		cat: 'mabibi',
		lal:lal,    
		saveLocal: function(){
			lal[lal.activeList].timestamp = Date.now();
			localStorage.setItem('s2g_clists', JSON.stringify(lal));
		},
		makeDefListInfo: function(listInfo){
			console.log(listInfo)
			lal.activeList = listInfo.lid;
			if(lal[lal.activeList]==undefined){
				var nl = {lid: listInfo.lid, shops: listInfo.shops, stores:[], items:[], users: listInfo.users, timestamp:0};
				lal[listInfo.lid]=nl;
			}
			//this.updList(lal[lal.activeList]);
			localStorage.setItem('s2g_clists', JSON.stringify(lal));
		}		
	}
}])