var Other = angular.module('Other', []);


Other.factory('TokenService',  ['Users',  function(Users){
	return{
		tokenExists: function(){
			if (Users.al[Users.al.activeUser].lists) {
				return true;	
			}else {
				return false;
			}
		}		
	}
}])