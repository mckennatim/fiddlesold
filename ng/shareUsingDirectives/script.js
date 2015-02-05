var app = angular.module("App", ['ui.bootstrap']);

app.directive("sbFirstDrctv", ['Users', 'Lists', function(Users, Lists){
    return{
      restrict: 'E',
      templateUrl: "sb-first-drctv.html",
      link: function(scope, element, attrs){
        scope.lists = Lists;
        scope.users=Users;
        scope.makeActive=function(name){
            Users.makeActive(name);
        }
        scope.makeDefListInfo =function(def){
            Users.makeDefLid(def.lid);
        }         
      }
    }
}]);

app.directive('sbUserListLid', ['Users','Lists', function(Users,Lists){
  return{
    restrict:'E',
    templateUrl: 'sb-user-list-lid.html',
    link: function(scope, element, attrs){
      scope.lal = Lists.lal;
      scope.al=Users.al;      
    }  
  }
}]);

app.directive('sbZeroDrctv', function(){
  return{
    restrict: 'E',
    //template: 'hi, im inline template a directive </br></br'
    templateUrl: 'sb-zero-drctv.html'
  }
})

app.controller("SecondCtrl", function($scope, Users, Lists){    
    $scope.lists = Lists;
    $scope.users= Users;
    $scope.active = Users.al.activeUser;
    $scope.makeActive=function(name){
        Users.makeActive(name);
    }
    $scope.makeDefListInfo =function(def){
        Users.makeDefLid(def.lid);   
    }
    $scope.online=true;
    $scope.join = function(){
        console.log($scope.listsInput)
    }     
});

app.controller("ThirdCtrl", function($scope, Users, Lists){
    $scope.lists = Lists;
    var users = $scope.users= Users;
    $scope.defListInfo = Users.al[Users.al.activeUser].lists[0]
    console.log($scope.defListInfo)   
    $scope.makeDefListInfo =function(def){
        Users.makeDefLid(def.lid);
    }
    $scope.reset = function(){
        Users.reset();
        Lists.reset();
    }
})

app.factory('Lists', function(){
    var clistsStr = localStorage.getItem('s2g_clists')
    var lal = !clistsStr ? {} : JSON.parse(clistsStr);
    //if not undefined parse else {}
    console.log(lal)
    return{ 
        lal: lal,
        makeDefLid: function(lid){
            console.log(lid)
            lal.activeList = lid;
            localStorage.setItem('s2g_clists', JSON.stringify(lal));
        },
        reset: function(){
            localStorage.setItem('s2g_clists', JSON.stringify(lists));
            var newLal = JSON.parse(localStorage.getItem('s2g_clists'));
            angular.copy(newLal, lal);
        },
    }   
})

app.factory('Users', function(Lists){
    var al = JSON.parse(localStorage.getItem('s2g_users'))
    return{
        al:al,
        makeDefLid: function(lid){
            console.log(lid)
            al[al.activeUser].defaultLid = lid;
            localStorage.setItem('s2g_users', JSON.stringify(al));
            Lists.makeDefLid(lid);
        },
        makeActive: function(name){
            al.activeUser=name;
            Lists.makeDefLid(al[al.activeUser].defaultLid)
            localStorage.setItem('s2g_users', JSON.stringify(al)); 
        },
        reset: function(){
            localStorage.setItem('s2g_users', JSON.stringify(users));
        },

   }
})



var tokens = {"userList":["tim","tim7"],"tim":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGltIn0.LmoK1Nr8uA4hrGr25L2AlKXs6U832Z_lE6JGznHJfFs","tim7":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGltNyJ9.puFMhr9kjiRfyRzlYDLdD7rOveQO5KgR6TkDqLmMYk0"}

var users = {"activeUser":"tim7","regState":"Authenticated","regMessage":"all set you are authorized and have token","userList":["tim","tim7"],"tim":{"_id":"5409c803d7a626d671297331","apikey":"Natacitipavuwunexelisaci","defaultLid":"Kidoju","defaultList":2,"email":"mckenna.tim@gmail.com","id":1,"lists":[{"lid":"Tamaki","shops":"down center"},{"lid":"Jutebi","shops":"groceries"},{"lid":"Kidoju","shops":"hardware"}],"name":"tim","role":"admin","timestamp":1409936908725},"tim7":{"_id":"5409ee0cc4cd771572c29335","apikey":"Qemavohegoburuxosuqujoga","defaultList":1,"email":"tim@sitebuilt.net","id":5,"lists":[{"lid":"Jutebi","shops":"groceries"},{"lid":"Woduvu","shops":"drugs"}],"name":"tim7","role":"user","timestamp":1410027284251,"defaultLid":"Jutebi"},"lastLive":0}

var lists = {
  "activeList": "Jutebi",       
  "Jutebi": {
    "lid": "Jutebi",
    "shops": "groceries",
    "timestamp": 1410019842776,
    "items": [
      {
        "product": "butter",
        "done": false,
        "tags": [],
        "amt": {
          "qty": ""
        }
      },
      {
        "product": "coffee",
        "done": false,
        "tags": [],
        "amt": {
          "qty": "1",
          "unit": "lb"
        }
      },
      {
        "product": "milk",
        "done": false,
        "tags": [
          "orgainic",
          "dairy"
        ],
        "amt": {
          "qty": "3",
          "unit": "1/2 gal"
        }
      },
      {
        "product": "frog legs",
        "done": false,
        "amt": {
          "qty": "2"
        }
      },
      {
        "product": "apples",
        "done": false,
        "tags": [
          "produce"
        ],
        "amt": {
          "qty": "",
          "unit": "3lb bag"
        }
      },
      {
        "product": "seltzer",
        "done": true,
        "amt": {
          "qty": ""
        }
      },
      {
        "product": "banana",
        "done": true,
        "tags": [],
        "amt": {
          "qty": ""
        }
      },
      {
        "product": "cat food",
        "done": true,
        "amt": {
          "qty": ""
        }
      },
      {
        "product": "teff flour",
        "done": true,
        "tags": [],
        "amt": {}
      }
    ],
    "stores": [
      {
        "id": "s_Bereti",
        "name": "Stop&Shop"
      }
    ],
    "users": [
      "tim"
    ]
  },
  "Guvupa": {
    "lid": "Guvupa",
    "shops": "groceries",
    "timestamp": 1395763172175,
    "items": [],
    "users": []
  },
  "Kidoju": {
    "lid": "Kidoju",
    "shops": "hardware",
    "timestamp": 1409966611033,
    "items": [
      {
        "product": "12-2",
        "done": false
      },
      {
        "product": "pipe hangers",
        "done": true,
        "amt": {
          "qty": ""
        }
      },
      {
        "product": "fuzz balls",
        "done": true,
        "tags": [],
        "amt": {}
      }
    ],
    "users": [
      "tim7",
      "tim"
    ]
  },
  "Woduvu": {
    "lid": "Woduvu",
    "shops": "drugs",
    "timestamp": 1395763172175,
    "items": [
      {
        "product": "dental floss",
        "done": true,
        "amt": {
          "qty": ""
        }
      },
      {
        "product": "hydrogen peroxide",
        "done": true,
        "tags": [],
        "amt": {}
      }        
    ],
    "users": []
  },
  "Tamaki": {
    "lid": "Tamaki",
    "shops": "down center",
    "timestamp": 1410011606582,
    "items": [
      {
        "product": "coffee",
        "done": false
      }
    ],
    "users": [
      "tim"
    ]
  }
}









var dog = {"Jutebi":{"lid":"Jutebi","shops":"groceries","timestamp":1410019842776,"items":[{"product":"butter","done":false,"tags":[],"amt":{"qty":""}},{"product":"coffee","done":false,"tags":[],"amt":{"qty":""}},{"product":"milk","done":false,"tags":["orgainic","dairy"],"amt":{"qty":"","unit":"1/2 gal"}},{"product":"frog legs","done":false,"amt":{"qty":""}},{"product":"apples","done":false,"tags":["produce"],"amt":{"qty":"","unit":"3lb bag"}},{"product":"seltzer","done":true,"amt":{"qty":""}},{"product":"banana","done":true,"tags":[],"amt":{"qty":""}},{"product":"cat food","done":true,"amt":{"qty":""}},{"product":"teff flour","done":true,"tags":[],"amt":{}}],"stores":[{"id":"s_Bereti","name":"Stop&Shop"}],"users":["tim"]},"Guvupa":{"lid":"Guvupa","shops":"groceries","timestamp":1395763172175,"items":[],"users":[]},"Kidoju":{"lid":"Kidoju","shops":"hardware","timestamp":1409966611033,"items":[{"product":"12-2","done":false},{"product":"pipe hangers","done":true,"amt":{"qty":""}},{"product":"fuzz balls","done":true,"tags":[],"amt":{}}],"users":["tim7","tim"]},"Woduvu":{"lid":"Woduvu","shops":"drugs","timestamp":1395763172175,"items":[],"users":[]},"Tamaki":{"lid":"Tamaki","shops":"down center","timestamp":1410011606582,"items":[{"product":"coffee","done":false}],"users":["tim"]}}

