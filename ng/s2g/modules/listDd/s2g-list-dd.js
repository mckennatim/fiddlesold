
var s2gListDd = angular.module('s2gListDd', []);
 

s2gListDd.directive('s2gListDd', ['$state', 'Users',  function($state, Users){
	return{
		restrict: 'E',
    		scope: {
    		}, //isolates scope
    		templateUrl: "modules/listDd/s2g-list-dd.html",
    		controller: function(){
    			this.rat = 'felix'
    			this.change =function(def){
    				//console.log(def)
    				$state.go("list", {lid: def.lid})
    			}             	     
    		},
    		controllerAs: 'dctrl',
    		link: function(scope, element, attrs){
    			scope.users=Users.al
    		}
  	}
}])

