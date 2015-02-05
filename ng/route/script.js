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
	$scope.port = 1233
	$scope.d = JSON.stringify(d, undefined, 2);
	var d22 = d.filter(function(el){
		return el.lid =='/fit'
	})
	$scope.d2 = JSON.stringify(d22, undefined, 2);

	ws = new WebSocket('ws://10.0.1.24:'+$scope.port+'/'+$scope.lid, 'echo-protocol');
	ws.onmessage = function(event){
		console.log(event.data)
		document.getElementById('chatlog').innerHTML += '<br>' + event.data;
	}
	$scope.upd = function(){
		console.log('pressed button')
		ws.send($scope.lid)
	}
	console.log('ws-connect')
}]);

//app.factory('Lists', ['$http', '$q', '$rootScope', function($http, $q, $rootScope)

var d = [ ,
  { lid: '/fit',
    ws:
     { domain: null,
       _events: [Object],
       _maxListeners: 10,
       _socket: [Object],
       _ultron: [Object],
       _closeReceived: false,
       bytesReceived: 11,
       readyState: 1,
       supports: [Object],
       extensions: [Object],
       protocol: 'echo-protocol',
       protocolVersion: 13,
       upgradeReq: [Object],
       _isServer: true,
       _receiver: [Object],
       _sender: [Object] } },
  { lid: '/fite',
    ws:
     { domain: null,
       _events: [Object],
       _maxListeners: 10,
       _socket: [Object],
       _ultron: [Object],
       _closeReceived: false,
       bytesReceived: 23,
       readyState: 1,
       supports: [Object],
       extensions: [Object],
       protocol: 'echo-protocol',
       protocolVersion: 13,
       upgradeReq: [Object],
       _isServer: true,
       _receiver: [Object],
       _sender: [Object] } },
  { lid: '/yut',
    ws:
     { domain: null,
       _events: [Object],
       _maxListeners: 10,
       _socket: [Object],
       _ultron: [Object],
       _closeReceived: false,
       bytesReceived: 11,
       readyState: 1,
       supports: [Object],
       extensions: [Object],
       protocol: 'echo-protocol',
       protocolVersion: 13,
       upgradeReq: [Object],
       _isServer: true,
       _receiver: [Object],
       _sender: [Object] } } ]	

