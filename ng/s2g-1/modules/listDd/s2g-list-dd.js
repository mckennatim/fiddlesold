
var s2gListDd = angular.module('s2gListDd', []);
 

s2gListDd.directive('s2gListDd', [ 'Users',  function(Users){
	return{
		restrict: 'E',
    		scope: {
    			lid : "@",
    		}, //isolates scope
    		templateUrl: "s2g-list-dd.html",
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

