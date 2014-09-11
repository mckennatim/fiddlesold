Setting default select value in AngularJS
----

### what doesn`t work

It would seem easy to fill in the default value of a select list. 

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

You would expect the list to come up with 'TraderJoes' as default. but it doesn`t even though the model gets updated just fine. Every time the page loads the defualt is blank.

### what works

Had you chosen the default by picking a member of the stores list you would have been fine. 

    This does fill in a default value: <br>
    <select ng-model="currentStore" ng-options="store.name for store in stores" ng-change="updateOrder(currentStore)"></select><br>

    $scope.currentStore = $scope.stores[2];
    console.log($scope.currentStore)

I wish I knew why this is different. Their console.logs look the same. The object in the second example must keep where it came from???

#### finding the index of an object on an array by one of its property values

I want some service to keep track of my default value objects and then be able to load those defaults into my controllers and views. Another service might keep a list of stores updated from a database. I don't  want to carry around a bunch of indexes because who knows whats been pushed or popped or reordered.

So the controller is going to have to deal.

#### step1: turn an array of objects into and array of properties

    $scope.stores=  [
            {"id" : "s_Bereti","name" : "Stop&Shop"},
            {"id" : "s_Bereto","name" : "WholeFoods"},
            {"id" : "s_Bereta","name" : "TraderJoes"}
    ]

    console.log($scope.stores.map(function(e) { return e.name; }));//returns
    ["Stop&Shop", "WholeFoods", "TraderJoes"] 

#### step2: use indexOf (sorry IE)

The index of the property array is the same as the index of the object in the array
 
    $scope.stores.map(function(e) { return e.name; }).indexOf($scope.currentStore.name)];

and if you set the default value of the select list from that then everything works

#### two functions
The first is to find the index of the first object contained in an array of objects by the value of a property.

    var idxOfObjByPropVal = function(objArr, property, value){
        return objArr.map(function(e){return e[property]}).indexOf(value)
    } 

The second function sets a default value for a select box. It then continues to work as the model.

    var defSelect = function(objArr, obj, property){
        return objArr[idxOfObjByPropVal(objArr, property, obj[property] )]
    }

You would use it like this:

    $scope.theStore= defSelect($scope.stores, $scope.theStore, 'name');

 <a href="http://johnmacfarlane.net/pandoc/try/" title="">http://johnmacfarlane.net/pandoc/try/</a>