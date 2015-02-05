
var app = angular.module("App", ['ui.router']);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
  $stateProvider.state('api', {
    url: '/api/:lid', 
    templateUrl: 'app.html', 
    controller: 'AppController',
  });
  $stateProvider.state('bye', {
    url: '/bye', 
    template: "<div>hey7 what</div"
  });
  $urlRouterProvider.otherwise('/bye'); 
}]);

app.controller("AppController", function($scope){
    console.log("in app ctrl")
});

app.directive("ioD", function(){
    return{
        restrict: "E",
        scope:{},
        template: '<h1>doog</h1><select id="lidSelect" ng-model="elected" ng-change="changeLid(elected)" ng-options="opt as opt.label for opt in options"></select> ',
        link: function(scope, element, attrs){
            scope.options = [
                {label:'Jutebi', value: 'Jutebi'},
                {label:'Qitula', value: 'Qitula'},
                {label:'Camala', value: 'Camala'},
                {label:'Minohu', value: 'Minohu'},
            ];    
            // scope.elected={};
            scope.changeLid = function(newval){
                console.log(newval)
            }
        }
    }
})