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

app.factory('Factory', function($q, $http){
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

app.factory('Con', function(){
    return{
        online: false,
        status: true        
    }
})

app.factory('Interceptor', function($injector, Con){
        var Interceptor ={
            responseError: function(response){
                Con.status = response.status;
                Con.online = false;
                return response;
            },
            response: function(response){
                Con.status = response.status;
                Con.online = true;
                return response;
            }
        };
        return Interceptor;
})

app.controller("AppController", function($scope, Con, $interval){
    var running;
    $scope.temple='other.html'
    $scope.running='toggle server polling '
    console.log(Con.online)
    $scope.online = Con.online =false;
    $scope.dog="fred";
    $scope.change =function(){
        $scope.dog=Con.change()
    }
    //Con.ckIfOnline();
    Con.$watch('online', function(newValue, oldValue){
        console.log(newValue)
        if (newValue !== oldValue) {
            $scope.online=Con.online;
            if (newValue){
                console.log('off assuming we are online')
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


