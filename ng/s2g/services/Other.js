var Other = angular.module('Other', []);


Other.factory('TokenService',  [function(){
	var activeUser = JSON.parse(localStorage.getItem('s2g_users')).activeUser
	var tokens = JSON.parse(localStorage.getItem('s2g_tokens'))
	//console.log(tokens[activeUser])
	return{
		tokenExists: function(){
			if (tokens[activeUser]) {
				return true;	
			}else {
				return false;
			}
		}		
	}
}])