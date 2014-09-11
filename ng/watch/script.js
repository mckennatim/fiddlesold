/*

*/
var app = angular.module("App", []);

app.controller("AppController", function($scope, $filter, Factory){   
    var list = Factory.getClist()
    var filter=$filter('filter')

    $scope.items=list.items;
    $scope.cnt=filter($scope.items, ({done:false})).length
    $scope.showTags=true
    $scope.showLoc=true
    $scope.rubmit = function(){
        if ($scope.query) {
            console.log($scope.query)
            $scope.items.push({product:this.query, done:false});
            console.log($scope.items);
            $scope.query = '';
         }
    };
    $scope.remove= function(item){
        console.log(item.product);
        var idx = $scope.items.indexOf(item);
        $scope.items.splice(idx,1);
        console.log(idx);
    }; 
    $scope.reset = Factory.reset();
    $scope.$watch('items', function(newValue,oldValue){
        console.log('items changed')
        $scope.cnt=filter($scope.items, ({done:false})).length
    }, 
    true
    )
});

app.factory('Factory', function(){
    return{
        reset: function(){
            localStorage.setItem(key, JSON.stringify(lists)); 
        },
        getClist: function(){
            var al=JSON.parse(localStorage.getItem(key)) || {};
            return al['Jutebi']
        }
    }
})

var key = 's2g_clists';
var lists ={"Jutebi":{"lid":"Jutebi","shops":"groceries","timestamp":1395763172175,"items":[{"product":"banana","done":false,"tags":[],"amt":{}},{"product":"coffee","done":false,"tags":[],"amt":{}},{"product":"apples","done":true,"tags":["produce"],"amt":{"qty":3,"unit":"3lb bag"}},{"product":"milk","done":false,"tags":["orgainic","dairy"],"amt":{"qty":1,"unit":"1/2 gal"}},{"product":"butter","done":false,"tags":[],"amt":{}},{"product":"teff flour","done":true,"tags":[],"amt":{}}],"stores":[{"id":"s_Bereti","name":"Stop&Shop"}],"users":["tim"]},"Guvupa":{"lid":"Guvupa","shops":"groceries","timestamp":1395763172175,"items":[],"users":[]},"Kidoju":{"lid":"Kidoju","shops":"hardware","timestamp":1395763172175,"items":[{"product":"duck tape","done":false,"tags":[],"amt":{}},{"product":"duck tape","done":false,"tags":[],"amt":{}},{"product":"screws","done":false,"tags":[],"amt":{}},{"product":"fuzz balls","done":true,"tags":[],"amt":{}}],"users":["tim7","tim"]},"Woduvu": {"lid":"Woduvu","shops":"drugs","timestamp":1395763172175,"items":[],"users":[]}}
