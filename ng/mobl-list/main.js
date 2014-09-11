/*

*/
var app = angular.module("App", [
    'ui.router',
    'ui.bootstrap'
]);

app.controller("AppController", function($scope){
    $scope.cnt =7;
    $scope.shops="groceries"
    $scope.mkt = "Stop and Shop"
    $scope.dog="fred";
    $scope.showTags=true;
    $scope.showAmt=true;
    $scope.list = {
        "items" : [
                {
                        "product" : "butter",
                        "done" : false,
                        "tags" : [
                                "dairy"
                        ]
                },
                {
                        "product" : "cream cheese",
                        "done" : false,
                        "tags" : [
                                "dairy"
                        ],
                        "amt" : {
                                "qty" : "16",
                                "unit" : "oz"
                        }
                },
                {
                        "product" : "apples",
                        "done" : false,
                        "tags" : [
                                "produce",
                                "fridge",
                                "organic"
                        ],
                        "amt" : {
                                "qty" : "2",
                                "unit" : "5lb bag"
                        }
                },
                {
                        "product" : "coffee",
                        "done" : false,
                        "tags" : [
                                "canned"
                        ]
                },
                {
                        "product" : "teff flour",
                        "done" : false,
                        "tags" : [ ],
                        "amt" : {
                                "unit" : "",
                                "qty" : ""
                        }
                },
                {
                        "product" : "bananas",
                        "done" : true
                },
                {
                        "product" : "dishwasher detergent",
                        "done" : true
                },
                {
                        "product" : "dish soap",
                        "done" : true
                },
                {
                        "product" : "milk",
                        "done" : false,
                        "amt" : {
                                "unit" : "1/2 gal",
                                "qty" : "1"
                        }
                },
                {
                        "product" : "oj",
                        "done" : false,
                        "tags" : [ ]
                }
        ],
        "lid" : "Jutebi",
        "shops" : "groceries",
        "stores" : [
                {
                        "id" : "s_Bereti",
                        "name" : "Stop&Shop"
                }
        ],
        "timestamp" : 1406552224617
}   
});
app.controller("ItemCtrl", function($scope){    
        if ($scope.$parent.$index==$scope.$parent.idx){
            $scope.yo = ["produce", "fridge", "organic"]
        }
});
