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
    's2gUsers'
    ]);

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
    $stateProvider.state('register',{
        url:'/register',
        template: '<h1>Register</h1>'
    })
    $urlRouterProvider.otherwise('/register');    
}])

app.controller('ListCtrl', ['$stateParams', '$state', 'TokenService', 'Lists', function($stateParams, $state, TokenService, Lists){
    if (TokenService.tokenExists()){
        this.dog = 'Kazzy'
        this.lid = $stateParams.lid; 
        this.list = Lists.lal[this.lid];
        console.log(this.list.timestamp)
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


