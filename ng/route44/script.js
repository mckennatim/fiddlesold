/*

*/
var ws;
var app = angular.module('app', ['ui.router']);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
  $stateProvider.state('api', {
    url: '/api/:lid', 
    templateUrl: 'app.html', 
    controller: 'AppCtrl',
    onExit: function(){
    	console.log('ws-closing')
      ws.close(3100);
    }
  });
  $stateProvider.state('bye', {
    url: '/bye', 
    template: "<div>hey7 what</div"
  });
  $urlRouterProvider.otherwise('/bye');	
}]);


app.controller('AppCtrl', [ '$scope', '$stateParams', function($scope, $stateParams){
	$scope.lid =$stateParams.lid;
	$scope.port = 1244
	ws = new WebSocket('ws://localhost:'+$scope.port+'/'+$scope.lid, 'echo-protocol');
	$scope.upd = function(){
		console.log('pressed button')
		ws.send($scope.lid)
	}
	console.log('ws-connect')
}]);

//app.factory('Lists', ['$http', '$q', '$rootScope', function($http, $q, $rootScope)

