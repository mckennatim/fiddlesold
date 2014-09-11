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

app.factory('Factory', function($q, $http, $rootScope){
    var httpLoc = 'http://parleyvale.com:3000/api/'; 
    return{
        ckIfOnline: function(){
            $http.get(httpLoc);                      
        },  
        ckIfOnlineQ: function(){
            var deferred = $q.defer();
            var result;
            if(!$rootScope.online){//avoid another http call
                var status = $rootScope.status-1
                var data = 'is offline'
                result={data:data, status:status}
                console.log(result)
                deferred.resolve(result)
            }else{
                $http.get(httpLoc).
                    success(function(data, status, headers, config) {
                        result={data:data, status:status}
                        deferred.resolve(result)
                        //success also includes status = 0, which I'd call a failure                        
                    }).
                    error(function(data, status, headers, config) {
                        //not sure how to trigger the error
                        deferred.reject({data:data, status:status, error:'mystery error'})
                    });                
            }
            return deferred.promise
        }  
    }
})


app.controller("AppController", function($scope, Factory, $rootScope, $interval, $q){
    var running;
    $scope.temple='other.html'
    $scope.running='toggle server polling '
    console.log($rootScope.online)
    $scope.online = $rootScope.online =false;
    $scope.dog="status";
    $scope.getPromise =function(){
        Factory.ckIfOnlineQ().then(function(result){
            $scope.dog=result.status;
        })
    }
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


