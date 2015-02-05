
var aModule = angular.module('aModule', []);
 
aModule.controller('MainController',['$state', '$stateParams', function($state, $stateParams){
	this.dog = 'Kazzy'
	this.lid = $stateParams.lid;
}]) 

aModule.directive('aDir', ['Lists', 'Users',  '$state', function(Lists, Users, $state){
	return{
		restrict: 'E',
    		scope: {
    			lid : "@",
    		}, //isolates scope
    		templateUrl: "a-dir.html",
    		controller: function(){
    			//console.log(this.lid)
    			this.rat = 'felix'
    			//var activeList='Jutebi';
             	//this.list = Lists.lal[activeList];     
             	this.updd= function(message){
             		console.log('its updating ' +message)
             		Lists.saveLocal()	
             	};
    			this.makeDefListInfo =function(def){
    				console.log(def)
    				this.list = Lists.lal[def.lid];  
    				$state.go("main", {lid: def.lid})
    			}             	     
    		},
    		controllerAs: 'dctrl',
    		link: function(scope, element, attrs){
    			scope.cat =Lists.cat;
    			scope.users=Users.al
    			var activeList = scope.lid
    			scope.list = Lists.lal[activeList];
    		}
  	}
}])

aModule.factory('Lists', ['$http', function($http){
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

aModule.factory('Users',  ['$http', 'Lists', function($http, Lists){
	var al = JSON.parse(localStorage.getItem('s2g_users')) || {activeList:'', regState:'Register',regMessage:'', userList:[]}
	return{
		al: al,
		makeDefListInfo: function(listInfo){
			al[al.activeUser].defaultLid = listInfo.lid;
			listInfo.users = [al.activeUser];
			localStorage.setItem('s2g_users', JSON.stringify(al));
			Lists.makeDefListInfo(listInfo);
		} 		
	}
}])
