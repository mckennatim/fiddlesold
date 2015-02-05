/*

*/
var app = angular.module("App", [
    'ui.router',
    'aModule'
    ]);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
    $stateProvider.state('main', {
        url: '/main', 
        templateUrl: 'main.html', 
        controller: 'MainController as mctrl'
    });
    $urlRouterProvider.otherwise('/main');    
}])


