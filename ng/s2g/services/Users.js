var Users = angular.module('Users', []);


Users.factory('Users',  ['$http', 'cfg', '$q', function($http, cfg, $q){
	var ls = cfg.LSpre+'users';
	var al = JSON.parse(localStorage.getItem(ls)) || {activeUser: '', activeList:'', regState:'Register',regMessage:'', userList:[]}
	var httpLoc = cfg.serverUrl;	
	return{
		al: al,
		LSsave: function(){
			localStorage.setItem(ls, JSON.stringify(al));
		},
		makeDefListInfo: function(listInfo){
			al[al.activeUser].defaultLid = listInfo.lid;
			//listInfo.users = [al.activeUser];
			localStorage.setItem(ls, JSON.stringify(al));
		}, 
		makeActive: function(name){
			al.activeUser = name;
			localStorage.setItem(ls, JSON.stringify(al));
		},
		setRegState: function(m){
			al.regState = m;
			localStorage.setItem(ls, JSON.stringify(al));
		},
		setRegMessage: function(m){
			al.regMessage = m;
			localStorage.setItem(ls, JSON.stringify(al));
		},
		getRegMessage: function(){
			return al.regMessage 
		},
		getRegState: function(){
			return al.regState 
		},	
		dBget: function(name){
			var url=httpLoc + 'users/'+name;      
			var deferred = $q.defer();     
			$http.get(url).
			success(function(data,status){
				deferred.resolve(data)
			}).
			error(function(data,status){
				deferred.reject(data)
			});
			return deferred.promise;
		},

	}
}])