var app = angular.module("App", []);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('Interceptor');
});

app.run(function(Factory, $rootScope, $window){
    console.log('running')
    Factory.ckIfOnline();
    var onFocus = function(){
        Factory.ckIfOnline();
    }
    $window.onfocus = onFocus;    
})

app.factory('Factory', function($q, $http, $rootScope){
    var httpLoc = 'http://parleyvale.com:3000/api/'; 
    return{
        ckIfOnline: function(){
            $http.get(httpLoc);                      
        },  
        change: function(){
            return 'duck'
        }  
    }
})

app.factory('Interceptor', function($rootScope){
        var Interceptor ={
            responseError: function(response){
                $rootScope.status = response.status;
                $rootScope.online = false;
                return response;
            },
            response: function(response){
                $rootScope.status = response.status;
                $rootScope.online = true;
                return response;
            }
        };
        return Interceptor;
})

app.controller("AppController", function($scope, Factory, $rootScope, $interval){
    var running;
    $scope.temple='other.html'
    $scope.running='toggle server polling '
    console.log($rootScope.online)
    $scope.online = $rootScope.online =false;
    $scope.dog="fred";
    $scope.change =function(){
        $scope.dog=Factory.change()
    }
    //Factory.ckIfOnline();
    $rootScope.$watch('online', function(newValue, oldValue){
        console.log(newValue)
        if (newValue !== oldValue) {
            $scope.online=$rootScope.online;
            if (newValue){
                console.log('assuming we are online')
            }
        }
    });
    $scope.toggle=function(){
        if (running) {
            $interval.cancel(running);
            running=null;
            $scope.running='not polling server';
        }else{
            $scope.running='polling server';
            running = $interval(function(){
            console.log('running update')
            Factory.ckIfOnline();
        },5000); 
        }
    }
});


