/*

*/
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
