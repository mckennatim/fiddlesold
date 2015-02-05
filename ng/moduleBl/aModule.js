
var aModule = angular.module('aModule', []);
 
aModule.controller('MainController',['$state', function($state){
	this.dog = 'Kazzy'
}]) 

aModule.directive('aDir', ['List' , function(List){
	return{
		restrict: 'E',
    		scope: {}, //isolates scope
    		templateUrl: "a-dir.html",
    		controller: function(){
    			this.rat = 'felix'
    		},
    		controllerAs: 'dctrl',
    		link: function(scope, element, attrs){
    			scope.cat =List.cat;
    		}
  	}
}])

aModule.factory('List', ['$http', function($http){
	return{
		cat: 'mabibi'
	}
}])

