Checking online status in AngularJS app
----------------------------------------
Often apps can do useful work while offline. While online and connected to the server additional functionality is enabled. It is helpful to know if a device is connected to the internet and if its server is available.

You might as well check online status every time your app makes an http request. If you wanted to periodically update your online status you could make a simple http request and intercept its response to set the state of a $rootScope variable that could then be watched by any controller. 

Intercepting http calls, setting some rootScope variables and watching them from a controller is described below. Checking if online is the first thing the app does. Other online checks are triggered by polling the server periodically or checking every time the browser window gains focus.

## Intercepting http calls
Interceptors are set up in the app.config and coded in a factory.

      var app = angular.module("App", []);
    
      app.config(function ($httpProvider) {
          $httpProvider.interceptors.push('Interceptor');
      });


Inject $rootScope and set variables:


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


btw: $window.navigator.onLine would tell you if your device is online but not if the server is.

### watching $rootScope variables
You can watch rootscape variables for your controller and use it to modify something in the contorller's scope.


      $rootScope.$watch('online', function(newValue, oldValue){
          if (newValue !== oldValue) {
              $scope.online=$rootScope.online;
          }
      });

### check ifOnline
Any http call will tell you if your device is online or not. A simple call to your rest server will tell you if you are online and if your server is online. A factory is a good place for this function.


        app.factory('Factory', function($q, $http, $rootScope){
            var httpLoc = 'http://google.com'; 
            return{
                ckIfOnline: function(){
                    $http.get(httpLoc);                      
                },  
            }
        })

You don't need any callbacks or promises for the http calls or the interceptor. Whenever they do come back they will set the $rootScope variable and whenever they get set the local watchers will react.

### interval polling of the server
The fiddle has a button that toggles the $interval timer either on or off. When on it runs ckIfOnline every 5 seconds.


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

### ckeck if online on window.focus

The app.run function seems to be a good place to check if online at startup and whenever the browser window get focus. 

    app.run(function(Factory, $rootScope, $window){
        console.log('running')
        Factory.ckIfOnline();
        var onFocus = function(){
            Factory.ckIfOnline();
        }
        $window.onfocus = onFocus;    
    })

  ### demo
[plnkr](http://plnkr.co/edit/8Q0kmA5Db9glOfveH5Kx?p=info). [gist](https://gist.github.com/mckennatim/b60629760aebd2081a5f). [jsbin](http://jsbin.com/lesoru/1/edit) In 'Factory' you can set the url for any server you want. Otherwise just take your browser offline while polling and you should see the app go offline.

tags: interceptors, polling, $interval, $watch, $rootScope, $httpProvider
