
var aModule = angular.module('aModule', []);
 
aModule.controller('MainController',['$state', function($state){
	this.dog = 'Kazzy'
}]) 

aModule.directive('aDir', ['Lists' , function(Lists){
	return{
		restrict: 'E',
    		scope: {}, //isolates scope
    		templateUrl: "a-dir.html",
    		controller: function(){
    			this.rat = 'felix'
    			var activeList='Jutebi';
             	this.list = Lists.lal[activeList];     
             	this.updd= function(message){
             		console.log('its updating ' +message.action)
             		
             	}     
    		},
    		controllerAs: 'dctrl',
    		link: function(scope, element, attrs){
    			scope.cat =Lists.cat;
    			scope.lal=Lists.lal;
    			var activeList = scope.lal.activeList ='Jutebi';
    			var list = scope.list = Lists.lal[activeList];
    			scope.items= list.items;
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
			//console.log(lal[lal.activeList].timestamp)
			console.log(lal[activeList].items)
		         	localStorage.setItem('s2g_clists', JSON.stringify(lal));
	          	//var newLal = JSON.parse(localStorage.getItem('s2g_clists'));
	        		//angular.copy(newLal, lal);			
		}
	}
}])

