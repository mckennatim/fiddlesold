var websocks = angular.module('websocks',[]);

websocks.service("WsService", function($q, $timeout) {   
    var service = {dog:'fred'}
    return service;
});