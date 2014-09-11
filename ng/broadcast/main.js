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

app.factory('Factory', function($q, $http, $rootScope, Inet){
    var httpLoc = 'http://parleyvale.com:3000/api/'; 
    return{
        ckIfOnline: function(){
            $http.get(httpLoc);                      
        },  
        change: function(){
            return 'duck'
        },
        update2: function(){
            console.log('in Factory.update2')
            console.log($rootScope.online)
            if ($rootScope.online){
                return {message:'We are online', dog:'bulterOn'};
            }else{
                return {message:'We are alone', dog:'rustyOff'};
            }
        },        
        update: function(){
            console.log('in Factory.update')
            console.log(Inet.inet)
            if (Inet.inet.online){
                return {message:'We are online', dog:'bulterOn'};
            }else{
                return {message:'We are alone', dog:'rustyOff'};
            }
        } 
    }
})

app.factory('Inet', function($q, $rootScope){
    var httpLoc = 'http://parleyvale.com:3000/api/'; 
    return{
        inet: 'dog',
        setInet: function(inet){
            this.inet=inet
            $rootScope.$broadcast('handleIsOnline',inet);
        }
    }
})

app.factory('Interceptor', function(Inet, $rootScope){
        var Interceptor ={
            responseError: function(response){
                var inet = {}
                inet.status = response.status;
                inet.online= false;
                Inet.setInet(inet);
                $rootScope.online=false
                return response;
            },
            response: function(response){
                var inet = {}
                inet.status = response.status;
                inet.online= true;
                Inet.setInet(inet);
                $rootScope.online=true;
                return response;
            }
        };
        return Interceptor;
})

app.controller("AppController", function($scope, Factory, $rootScope, $interval, Inet){
    var running;
    $scope.temple='other.html'
    $scope.running='toggle server polling '
    $scope.inet={status:-1,online: false};
    $scope.dog="fred";
    $scope.message2=Factory.update();

    $scope.change =function(){
        $scope.dog=Factory.update().dog;
    }
    $scope.change2 =function(){
        $scope.message2=Factory.update2();
    }
    $scope.message = Factory.update();
    $scope.$on('handleIsOnline', function(events,inet){
        console.log(inet)
        $scope.inet=inet;
        $scope.online=inet.online;
        $scope.message = Factory.update();
    })
    $scope.$watch('online', function(newValue,oldValue){
        if (newValue!=oldValue){
            //$scope.message = Factory.update();
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


