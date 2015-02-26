'use strict';
//var httpLoc = 'http://parleyvale.com:3000/api/';
var httpLoc = 'http://localhost:3000/api/';
//var httpLoc = 'http://sitebuilt.net:3000/api/';

var app = angular.module("App", [
    'ui.bootstrap',
    'ui.router',
    's2gListDd',
    's2gAisleDd',
    's2gList', 
    's2gStoreSort',
    'Users',
    'Lists', 
    'Other',
    'Stores',
    's2gUsers',
    'Register'
    ]);

app.constant('cfg', {
    serverUrl: 'http://localhost:3000/api/',
    // 'http://parleyvale.com:3000/api/'  'http://sitebuilt.net:3000/api/'
    LSpre: 's2g_'
})

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
    $stateProvider.state('list', {
        url: '/list/:lid', 
        templateUrl: 'list.html', 
        controller: 'ListCtrl as  listCtrl'
    });
    $stateProvider.state('users', {
        url: '/users', 
        templateUrl: 'users.html', 
    });    
    $urlRouterProvider.otherwise('/register');    
}])

app.controller('ListCtrl', ['$stateParams', '$state', 'TokenService', 'Lists', function($stateParams, $state, TokenService, Lists){
    var activeUser = JSON.parse(localStorage.getItem('s2g_users')).activeUser
    if (TokenService.tokenExists(activeUser)){
        this.dog = 'Kazzy'
        this.lid = $stateParams.lid; 
        this.list = Lists.lal[this.lid];
        this.upd = function(message){
            Lists.saveLocal(this.lid)
            console.log(message)
        }
    } else{
        var message = 'you seem to be lacking a token';
        console.log(message);
        //Users.setRegState('Get token');
        $state.go('register');
    };     
}])


