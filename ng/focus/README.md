Detecting browser window focus in AngularJS
-----
When using hhtml5 built-in window.onfocus and window.blur you need to inject $window in the controller and after you update the $scope you need to $scope.apply() so angular knows about it. [plnkr](http://plnkr.co/edit/jyUJ6y64cBQDPTMXMWVb?p=preview)

	var app = angular.module("App", []);

	app.controller("AppController", function($scope, $window){
	    $scope.dog="fred";
	    var onFocus = function(){
	        $scope.dog = 'onfocus';
	        $scope.$apply();
	    }
	    var onBlur = function(){
	        $scope.dog = 'onblur';
	        $scope.$apply();
	    }
	    $window.onfocus = onFocus;
	    $window.onblur = onBlur;   
	});