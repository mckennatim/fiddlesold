var Register = angular.module('Register', []);

Register.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
	$stateProvider.state('register',{
		url:'/register',
		template: '<h1>Register</h1><register></register>'
	});
	$urlRouterProvider.otherwise('/register');    
}])

Register.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$httpProvider.interceptors.push('TokenInterceptor');
}])

Register.directive('register', ['$state', 'Users', 'TokenService', 'AuthService', 'cfg', function($state, Users, TokenService, AuthService,cfg){
	var lsus = cfg.LSpre+'users';
	return{
		restrict: 'E',
		scope: {}, 
		templateUrl: "modules/register/register.html",
		controller: function(){
		},
		controllerAs: 'registerCtrl',
		link: function(scope, element, attrs){
			scope.users=Users.al;
			scope.nameValid =/^\s*\w*\s*$/
			scope.grey=false;
			if (TokenService.tokenExists(scope.users.activeUser)){
				var message = 'all set you are authorized and have token';
				console.log(scope.users.activeUser)
				scope.username = scope.users.activeUser;
				scope.email = scope.users[scope.users.activeUser].email
				Users.setRegState('Authenticated, go to Lists');
				Users.setRegMessage(message);
			} else {
				var message = 'you seem to be lacking a token';
				Users.setRegMessage(message);
			}			
			if (scope.users.regState=='Enter apikey'){
				Users.setRegMessage('will give you token when we check your apikey');
			} 
			scope.doesNameExist =function(){
				Users.setRegMessage('will check status...')
				if (TokenService.tokenExists(scope.username)){
					Users.setRegMessage( 'all set you are authorized and have token');
					Users.makeActive(scope.username);
					Users.setRegState('Authenticated, go to Lists');
				} else {
					AuthService.isUser(scope.username).then(function(data){
						nameStatus(data)
					}).catch(function(data){
						nameStatus(data)
					})	
															
				}
			}
			var nameStatus =function(resp){
				console.log(resp)
				switch (resp.message){
					case ' available':
						Users.setRegMessage(resp.message + '. Enter email to register');
						break;
					case ' already registered':
						if (scope.users[scope.username] && scope.users[scope.username].email) {
							scope.email = scope.users[scope.username].email;
							if (scope.users[scope.username].apikey) {
								scope.apikey = scope.users[scope.username].apikey;
								Users.setRegState('Get token');
								Users.setRegMessage(resp.message + '. Click to renew token');
							}else {
								Users.setRegState('Get apikey');
								Users.setRegMessage(resp.message + '. Click and apikey will be emailed to you');
							}
						}else {
							Users.setRegMessage(resp.message + ' on server. Enter email then get apikey');							
							Users.setRegState('Get apikey');
						}
						break;
					case 'server is down':
						Users.setRegMessage(resp.message + '. App will work offline for authenticated users');
						scope.grey=true
						break;
					default:
						Users.setRegMessage(' unidentified problem - contact Tim');
				}
			}
			scope.onChange = function(){
				scope.users.regMessage = "";
				scope.users.regState = "Register"
			}
			scope.submit = function(){
				switch (true){
					case scope.users.regState=='Register' || scope.users.regState=='Get apikey' :
						AuthService.isMatch(scope.username, scope.email)
							.then(function(data){
								afterRegAttempt(data.message);
							})
							.catch(function(data){
								afterRegAttempt(data.message);
							})
						break;
					case scope.users.regState=='Get token' || scope.users.regState=='Enter apikey':
						AuthService.auth(scope.apikey, scope.username)
							.then(function(data){
								afterAuth(scope.username, data);
							})
							.catch(function(data){
								afterAuth(scope.username, data);
							})						
						break;
					case scope.users.regState== 'Authenticated, go to Lists':
						var name = scope.users.activeUser;
						Users.dBget(name)
							.then(function(data){
								scope.users[name]=data.items;
								Users.LSsave()
								console.log(data);
							})
							.catch(function(data){
								scope.users.regMessage = ' server is down, cannot get servers user record now'
								console.log(data);
							})						
						break;
					default:
						Users.setRegMessage(' unidentified problem - contact Tim');
				}
			}
			var afterRegAttempt = function(response){
				switch (true){
					case response=='available' || response=='match':
						//save name and email to local storage
						scope.users.userList.push(scope.username);
						scope.users.userList=_.uniq(scope.users.userList)
						scope.users[scope.username]= {name: scope.username, email: scope.email}
						Users.LSsave();
						scope.users.regState = 'Get token';
						scope.users.regMessage = response+': Check email for apikey and enter here to get token be finished registration'
						break;
					case response=='conflict':
						scope.users.regMessage = response+': Email does not match username or has already been associated with another username' 
						break;
					case response=='server is down':
						scope.users.regMessage = response+': App will only work offline for authenticated users' 
						break;
					default:
						Users.setRegMessage(' unidentified problem - contact Tim');
				}
			}
			var afterAuth = function(name, response){
				var mes= response.message;
				switch (true){
					case mes=='token here':
						TokenService.setToken(name, response.token);
						Users.makeActive(name);
						Users.dBget(name)
							.then(function(data){
								Users.LSsave();
								console.log(data);
							})
							.catch(function(data){
								console.log(data);
							})						
						break;
					case mes=='Authorization failed, try re-entering apikey' || mes== '404, try re-entering apikey':
						scope.users.regMessage = mes;
						scope.users.regState = 'Get apikey';
						break;
					case mes=='server is down':
						scope.users.regMessage = response+': App will only work offline for authenticated users' 
						break;					
					default:
						Users.setRegMessage(' unidentified problem - contact Tim');
				}
			}						
		}
	}
}])

Register.factory('AuthService', ['$http', '$q',  function($http, $q) {
	return {
		auth: function(apikey, name) {
			var url=httpLoc + 'authenticate/' + name;
			var deferred = $q.defer();
			$http.post(url, {apikey:apikey}, {withCredentials:true}).   
			success(function(data, status) {
				//console.log(data);
				//console.log(status);
				deferred.resolve(data);
			}).
			error(function(data, status){
				console.log(data || "Request failed");
				console.log(status);
				if (status==0){
					deferred.reject({message: 'server is down'})
				} else if(status==401){
					deferred.reject({message: 'Authorization failed, try re-entering apikey'})               
				} else if(status==404){
					deferred.reject({message: '404, try re-entering apikey'})
				}else{
					deferred.reject({message: 'no clue on what is wrong'})
				}
			});
			return deferred.promise;
		},
		isUser: function(name) {
			var url=httpLoc + 'isUser/'+name;
			var deferred = $q.defer();
			$http.get(url).   
			success(function(data, status) {
				console.log(data);
				console.log(status);
				deferred.resolve(data);
			}).
			error(function(data, status){
				console.log(data || "Request failed");
				console.log(status)
				if (status==0){
					console.log('status==0')
					deferred.reject({message: 'server is down'});
				}
			});
			return deferred.promise;
		},
		isMatch: function(name, email) {
			var url=httpLoc + 'isMatch/?user='+name+'&email='+email;      
			var deferred = $q.defer();
			$http.get(url).   
			success(function(data, status) {
				console.log(data);
				console.log(status);
				deferred.resolve(data);
			}).
			error(function(data, status){
				console.log(data || "Request failed");
				console.log(status);
				deferred.reject({message: 'server is down'})
			});
			return deferred.promise;
		}    
	}
}]);

Register.factory('TokenService', ['cfg', function( cfg){
	var lstok = cfg.LSpre+'tokens';
	var lsus =  cfg.LSpre+'users';
	return{
		setToken: function(name, token){
			var tokens = JSON.parse(localStorage.getItem(lstok)) 
			tokens[name]=token;
			localStorage.setItem(lstok, JSON.stringify(tokens));
        }, 
		tokenExists: function(user){
			var token =JSON.parse(localStorage.getItem(lstok))[user]
			if (token && token.length>40) {
				return true;	
			}else {
				return false;
			}
		},
		getActiveToken: function(){
			var user = JSON.parse(localStorage.getItem(lsus)).activeUser;
			return JSON.parse(localStorage.getItem(lstok))[user]
		},
		deleteActiveToken: function(){
			var user = JSON.parse(localStorage.getItem(lsus)).activeUser;
			var tokens = JSON.parse(localStorage.getItem(lstok)) 
			delete tokens[user];
			localStorage.setItem(lstok, JSON.stringify(tokens));
		}		
	}
}])

Register.factory('TokenInterceptor', ['$q', '$injector', 'cfg', function ($q, $injector, cfg) {
    var TokenService = $injector.get('TokenService');
    var key = cfg.LSpre+'tokens';
    var blankTokens= {userList:[]};
    return { 
        request: function (config) {
            var blankTokens= {userList:[]};
            var tok = TokenService.getActiveToken();
            //var tok = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGltIn0.LmoK1Nr8uA4hrGr25L2AlKXs6U832Z_lE6JGznHJfFd'; //broken token should cause error
            //console.log(tok);
            config.headers = config.headers || {};
            if (tok) {
                    config.headers.Authorization = 'Bearer ' + tok
            }
            return config;
        },
        requestError: function(rejection) {
            return $q.reject(rejection);
        },
        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            return response || $q.when(response);
        },
        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            var tok = TokenService.getActiveToken();
            if (tok) {
                
                if (rejection != null && rejection.status === 401) {
                    TokenService.deleteActiveToken();
                    //$state.go('register');
                }else{
                    console.log('server is offline, proceed anyway')
                    rejection.message = 'server is down'
                    console.log(rejection)
                    return $q.reject(rejection);
                }
            }         
            return $q.reject(rejection);               
        }
    };
}]);
