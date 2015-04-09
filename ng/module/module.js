var md= angular.module('Module', []);

md.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
    $stateProvider.state('users', {
        url: '/users', 
        template: '<p>hi w<p><my-dir></my-dir>'
    });    
    $urlRouterProvider.otherwise('/');    
}])

md.directive('myDir', ['cfg', function(cfg){
	return{
		restrict: 'E',
		scope: {}, 
		templateUrl: "my-dir.html",
		controller: function(){
			this.what =cfg.serverURL;
		},
		controllerAs: 'myCtrl',
		link: function(scope, element, attrs){

		}
	}
}])