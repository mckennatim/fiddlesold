var s2gUsers = angular.module('s2gUsers', []);

s2gUsers.directive('s2gUsers',['Users', '$state', function(Users, $state){
  return{
    restrict: 'E',
    scope: {}, //isolates scope
    templateUrl: "modules/users/s2g-users.html",
    link: function(scope, element, attrs){
      scope.users = Users.al;
      scope.makeActive=function(name){
        //scope.users.activeUser=name;
        console.log(name)
        Users.makeActive(name);
        //$state.go('lists');
      };
      scope.goRegister =function(){
        $state.go('register');
      };
      scope.remove = function(user){
        alert('removing user ' + user);
        //Users.LSdel(user);
      };
    }
  }
}])

