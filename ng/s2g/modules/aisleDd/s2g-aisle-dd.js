
var s2gAisleDd = angular.module('s2gAisleDd', []);
 

s2gAisleDd.directive('s2gAisleDd', ['Stores',  function(Stores){
	return{
		restrict: 'E',
		scope: {
			loc: "=loc"
		}, //isolates scope
		templateUrl: "modules/aisleDd/s2g-aisle-dd.html",
		controller: function(){
			this.dog = 'uli'       	     
		},
		controllerAs: 'aisleCtrl',
		link: function(scope, element, attrs){
			scope.stores=Stores.st;
		}
	}
}])

