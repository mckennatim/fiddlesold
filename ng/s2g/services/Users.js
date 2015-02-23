var Users = angular.module('Users', []);


Users.factory('Users',  ['$http', function($http){
	var al = JSON.parse(localStorage.getItem('s2g_users')) || {activeUser: '', activeList:'', regState:'Register',regMessage:'', userList:[]}
	return{
		al: al,
		makeDefListInfo: function(listInfo){
			al[al.activeUser].defaultLid = listInfo.lid;
			//listInfo.users = [al.activeUser];
			localStorage.setItem('s2g_users', JSON.stringify(al));
		}, 
		makeActive: function(name){
			al.activeUser = name;
			localStorage.setItem('s2g_users', JSON.stringify(al));
		}		
	}
}])