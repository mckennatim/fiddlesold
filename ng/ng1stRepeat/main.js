/*
Write an algorithm that will find the first duplicate in a list on the page.
For example we would return 4, for the list above.
*/
var app = angular.module("DuplicateApp", []);

app.controller("DuplicateController", function($scope){
    $scope.dog="fred";
    var numbers = [6,3,1,4,7,4,2,8,9,2];
    var newnums= [];
    var idx = -2;
    for (var i = 0; i<numbers.length; i++){
        idx = newnums.indexOf(numbers[i]);
        if (idx > -1){break;}
        newnums.push(numbers[i]);
    }
    $scope.idx =idx;
    $scope.firstRepNum=numbers[idx];
    $scope.numbers=numbers;    
});
app.controller("ItemCtrl", function($scope){    
        if ($scope.$parent.$index==$scope.$parent.idx){
            $scope.yo = 'this is the first item to get repeated'
        }
});