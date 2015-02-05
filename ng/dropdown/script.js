
var app = angular.module("App", []);
var reload =function(){
    location.reload();
}
app.controller("AppController", function($scope){
    $scope.dog="fred";

    $scope.stores=  [
            {"id" : "s_Bereti","name" : "Stop&Shop"},
            {"id" : "s_Bereto","name" : "WholeFoods"},
            {"id" : "s_Bereta","name" : "TraderJoes"}
    ]

    $scope.defStore = {"id" : "s_Bereta","name" : "TraderJoes"};
    console.log($scope.defStore)
    $scope.defOrder = function(store){
        console.log(store)
    }

    console.log($scope.stores.map(function(e) { return e.name; }));//returns
    ["Stop&Shop", "WholeFoods", "TraderJoes"] 

    $scope.currentStore = $scope.stores[2];
    console.log($scope.currentStore)


    var idxOfObjByPropVal = function(objArr, property, value){
        return objArr.map(function(e){return e[property]}).indexOf(value)
    }

    var defSelect = function(objArr, obj, property){
        return objArr[idxOfObjByPropVal(objArr, property, obj[property] )]
    }

    $scope.theStore={"id" : "s_Bereto","name" : "WholeFoods"};
    //$scope.theStore = $scope.stores[$scope.stores.map(function(e) { return e.name; }).indexOf($scope.theStore.name)];

    console.log($scope.stores[$scope.stores.map(function(e) { return e.name; }).indexOf($scope.theStore.name)]);
    $scope.theStore= defSelect($scope.stores, $scope.theStore, 'name');
    console.log(idxOfObjByPropVal($scope.stores, 'name', $scope.theStore['name'] ));
    console.log($scope.theStore)

    $scope.updateOrder = function(currentStore){
        console.log(currentStore);
    };
});
