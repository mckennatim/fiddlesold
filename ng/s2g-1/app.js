/*

*/
var app = angular.module("App", [
    'ui.bootstrap',
    'ui.router',
    's2gListPg',
    //'s2gListDd',
    //'s2gList',
    //'s2gStoreSort',
    'Users',
    'Lists', 
    'Other'
    ]);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
    $stateProvider.state('list', {
        url: '/list/:lid', 
        templateUrl: 'list.html', 
        controller: 'ListCtrl as  listCtrl'
    });
    $stateProvider.state('register',{
        url:'/register',
        template: '<h1>Register</h1>'
    })
    $urlRouterProvider.otherwise('/register');    
}])

app.controller('ListCtrl', ['$stateParams','$state', 'TokenService', function($stateParams, $state, TokenService){
    if (TokenService.tokenExists()){
        this.dog = 'Kazzy'
        this.lid = $stateParams.lid; 
    } else{
        var message = 'you seem to be lacking a token';
        console.log(message);
        //Users.setRegState('Get token');
        $state.go('register');
    };     
}])


