
var s2gListPg = angular.module('s2gListPg', []);
 
s2gListPg.directive('s2gListPg', ['Lists', 'Users',  '$state', function(Lists, Users, $state){
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

