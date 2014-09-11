Promises between service and controller in AngularJS
----------------------------------------
Calls to $http belong in a service. SinceAJAX calls are asynchronous you have to return a promise that will be deferred until the callback. You can setup the promise in the service by including $q and then act on it when it returns in the controller.



### using $q in the service

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

### short circuit and return promise quick

This example includes an interceptor that sets \$rootScope.online&status on any AJAX call to http. Rather than making another call if we already know we are offline, we can check if \$rootScope.online = true  and quickly resolve and return the promise.

### then act on the promise deferred

    $scope.getPromise =function(){
        Factory.ckIfOnlineQ().then(function(result){
            $scope.dog=result.status;
        })
    }

The rest of this code takes the approach of intercepting any http request and setting $rootScope online

