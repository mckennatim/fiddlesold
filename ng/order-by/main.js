/*

*/
var app = angular.module("App", []);

app.controller("AppController", function($scope, $filter){
    var orderBy = $filter('orderBy');
    var mkt0={"id": "0", "name": "sort-alpha"};
    var stores=  [
    {"id" : "s_Bereti","name" : "Stop&Shop"},
    {"id" : "s_Bereto","name" : "WholeFoods"},
    {"id" : "s_Bereta","name" : "TraderJoes"}
    ]
    stores.unshift(mkt0);
    $scope.stores =stores;
    $scope.currentStore=$scope.stores[0];
    console.log($scope.currentStore)
    $scope.reverse = true;
    $scope.order = function() {
        if($scope.currentStore.id=="0"){
            $scope.reverse = !$scope.reverse
             console.log($scope.currentStore.id)
            console.log($scope.reverse)
            $scope.items = orderBy($scope.items, "age", $scope.reverse);
        }else {
            $scope.items = orderBy($scope.items, $scope.marketOrder);
        }        
    };    
    $scope.updateOrder =function(){
        console.log($scope.currentStore)
        $scope.order();
    }
    $scope.order();
    $scope.aisles = ["produce", "canned", "meats", "baking", "snacks",  "paper/plastic/cleaning", "dairy", "bread"];
    $scope.items =
    [{name:'John', phone:'555-1212', age:10, loc: "produce"},
    {name:'Mary', phone:'555-9876', age:19, loc: "dairy"},
    {name:'Mike', phone:'555-4321', age:21, loc: "canned"},
    {name:'Mike', phone:'555-4321', age:21},
    {name:'Adam', phone:'555-5678', age:35, loc: "baking"},
    {name:'Julie', phone:'555-8765', age:29, loc: "meats"}];
    $scope.predicate = '-age';
    $scope.marketOrder = function(item){
        console.log(item)
        if(!item.loc){
            return 0 
        }else {
            var ret = $scope.aisles.indexOf(item.loc);
            return ret;   
        }  
    };

      //$scope.order('-age',true);      

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