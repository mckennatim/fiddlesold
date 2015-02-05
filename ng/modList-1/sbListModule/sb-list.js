var sbList = angular.module('sbList', []);

sbList.directive('sbList',[ 'List', '$state', '$filter', 'ioService', function(List, $state, $filter, ioService){
	return{
		restrict: 'E',
		scope: {
       		list: "=list",
       		upd: "&"
       	}, //isolates scope
		templateUrl: "sbListModule/sb-list.html",
		link: function(scope, element, attrs) {
			var io = ioService.socket
			io.on('itemChanged', function(data){
				scope.list.items[scope.list.items.map(function (el){return el.product}).indexOf(data.item.product)]=data.item
				scope.$apply()
			})
			// scope.$watch('list.items', function(newValue, oldValue ){
			// 	console.log('list mmm changed')
			// 	//Lists.lal[activeList]=scope.list;
			// 	//Lists.saveLocal();
			// })            
			scope.ckDone = function(item){
				var message = {action:'modify', item:item}
				console.log(message.item)
				io.emit('message', message)
				scope.upd({message: message})
				//List.saveList(message);
			}
			scope.showList = function(){
				console.log('in showList')
				scope.showlist = scope.list.items
				scope.showls = JSON.parse(localStorage.getItem('s2g_clists'))['Jutebi'].items
			}
			scope.refreshLS =function(){
				console.log('refresh  LS')
				//Lists.saveLocal();
				scope.showls = JSON.parse(localStorage.getItem('s2g_clists'))['Jutebi'].items
			}
		}
	}
}])

sbList.service("ioService", function($q, $timeout) {  
	console.log('the ioservice has started')
	var port = 3000;    
	var socket = io.connect('10.0.1.25:' + port);
	console.log('connected in ioService')
	var service = {
		dog: 'fred',
		socket: socket,
		port: port
	}
	return service;
});


sbList.factory('List', ['$http', '$q', '$rootScope', 'ioService', function($http, $q, $rootScope, ioService){
	var lal = JSON.parse(localStorage.getItem('s2g_clists')) || {activeList:''};
	var io= ioService.socket;
	io.emit('switchLid', 'Jutebi');
	var modify = function(item){
		//var items = lal[lal.activeList].items
		var idx = find(item);
		rep4idx(idx, item);
		console.log(lal[lal.activeList].items[idx])
	}
	var find = function(item){
		return lal[lal.activeList].items.map(function (el){return el.product}).indexOf(item.product)
	}
	var rep4idx = function(idx,item){
		lal[lal.activeList].items[idx]=item
	}
	var saveLocal = function(){
		lal[lal.activeList].timestamp = Date.now();
		console.log(lal[lal.activeList].timestamp)
        //console.log(JSON.stringify(lal[lal.activeList].items));
        localStorage.setItem('s2g_clists', JSON.stringify(lal));
        var newLal = JSON.parse(localStorage.getItem('s2g_clists'));
        angular.copy(newLal, lal);
    }   
    var difference= function(array){
      var prop =arguments[2];
      var rest = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
      var containsEquals = function(obj, target) {
         if (obj == null) return false;
         return _.any(obj, function(value) {
            return value[prop] === target[prop];
        });
     };
     return _.filter(array, function(value){
         return ! containsEquals(rest, value); 
     });
 };
 var union= function (arr1, arr2, prop) {
  var sa1= JSON.stringify(arr1);
  var arr3 = JSON.parse(sa1);
  _.each(arr2, function(arr2obj) {
     var arr1obj = _.find(arr1, function(arr1obj) {
        return arr1obj[prop] === arr2obj[prop];
    });
     arr1obj ? _.extend(arr3, arr2obj) : arr3.push(arr2obj);
 });
  return arr3
};   
var merge= function(pz2,cz2,sz2){
        // (C\(P\S))U(S\(P\C))
        var condT = {'done': true};
        var condF = {'done': false};
        var p = _.filter(pz2, condF);
        var c = _.filter(cz2, condF);
        var s = _.filter(sz2, condF);
        var sT = _.filter(sz2, condT);
        var ps = difference(p,s, 'product');
        var pc = difference(p,c, 'product' );
        var cps = difference(c,ps, 'product');
        var spc = difference(s,pc, 'product');
        var arr3 = union(spc, cps, 'product');
        //(MERGED{'done':false}) U (Server,{'done': true})
        var arr4 = union(arr3, sT, 'product');
        return arr4
    };
    var getPlist= function(listInfo){
      var key = 's2g_plists';
      var pal=JSON.parse(localStorage.getItem(key)) || {};
      var list = pal[listInfo.lid];
      if(!list){
         list = {lid: listInfo.lid, shops: listInfo.shops, timestamp: 0, items: [], users: []}
         pal[list.lid]=list;
         localStorage.setItem(key, JSON.stringify(pal));
     }
     return list;
 }
 var setPlist= function(list){
  var key = 's2g_plists'
  var pal=JSON.parse(localStorage.getItem(key)) || {};
  pal[list.lid]=list;
  localStorage.setItem(key, JSON.stringify(pal));
}    
var setClist= function(list){
  var key = 's2g_clists'
  var pal=JSON.parse(localStorage.getItem(key)) || {};
  pal[list.lid]=list;
  localStorage.setItem(key, JSON.stringify(pal));
}               
return{ 
  io: io,
  lal: lal,
  saveLocal: saveLocal,
  makeChange: function(data){
      console.log(JSON.stringify(data))
      switch (data.action){
         case 'modify':
         console.log(data.action);
         modify(data.item);
         break;
         case 'add':
         console.log(data.action);
         break;
         case 'delete':
         console.log(data.action);
         break;                                             
         case 'replace':
         console.log(data.action);
         break;                                             
     }
 },      	
 delete: function(lid){
     if(lal[lid].users.length<2){
        delete lal[lid];
        if (lal.activeList==lid){
           lal.activeList='';
       }
       localStorage.setItem('s2g_clists', JSON.stringify(lal));                
   }
},
add: function(listInfo){
 console.log('in Lists.add');
 lal.activeList = listInfo.lid;
 if (lal[listInfo.lid]){
    lal[listInfo.lid].users.push(listInfo.user);
    lal[listInfo.lid].users = _.uniq(lal[listInfo.lid].users);                
    console.log('list exists, adding user to it')
}else{
    console.log('list isnt on this device')
    var nl = {lid: listInfo.lid, shops: listInfo.shops, stores:[], items:[], users: listInfo.users, timestamp:0};
    lal[listInfo.lid]=nl;                
}
localStorage.setItem('s2g_clists', JSON.stringify(lal));
},
makeDefLid: function(lid){
 lal.activeList = lid;
 io.emit('switchLid', lal.activeList);
 localStorage.setItem('s2g_clists', JSON.stringify(lal));
},
makeDefListInfo: function(listInfo){
 lal.activeList = listInfo.lid;
 io.emit('switchLid', lal.activeList);
 if(lal[lal.activeList]==undefined){
    var nl = {lid: listInfo.lid, shops: listInfo.shops, stores:[], items:[], users: listInfo.users, timestamp:0};
    lal[listInfo.lid]=nl;
}
this.updList(lal[lal.activeList]);
localStorage.setItem('s2g_clists', JSON.stringify(lal));
},
reset: function(){
 console.log(JSON.stringify(lists))
 localStorage.setItem('s2g_clists', JSON.stringify(lists));
 localStorage.setItem('s2g_plists', JSON.stringify(lists));            
},
      saveList: function(message){
            //saveLocal();
            //console.log(message)
            if (message.action != 'doNothing'){
            	console.log(message.action)
            	io.emit('message', message)
            } 
            //this.updList(lal[lal.activeList]);
        },
        dBget: function(lid){
          var deferred =$q.defer();
          var url=httpLoc + 'lists/'+lid; 
          $http.get(url).   
          success(function(data, status) {
             console.log('GET list from server: '+status);
             lal[lid]= data;
             localStorage.setItem('s2g_clists', JSON.stringify(lal));
             deferred.resolve(data)
         }) .
          error(function(data, status){
             deferred.reject(data)
         });
          return deferred.promise                          
      },
      updList: function(list){
          var deferred =$q.defer();
          var listInfo = {lid: list.lid, shops: list.shops}
          console.log('in updList, $rootScope.online: ' +$rootScope.online)
          if(!$rootScope.online){
             deferred.resolve(list)
         }else{  
             var c, p, s, cts, sts, pts, nts, updItems, stores;
             c = list;
             cts = c.timestamp;
                //console.log(JSON.stringify(c))
                p = getPlist(listInfo);
                pts = p.timestamp;
                var url=httpLoc + 'lists/'+listInfo.lid; 
                //console.log(JSON.stringify($http.defaults.headers))
                $http.get(url).   
                success(function(data, status) {
                	console.log('GET list from server: '+status)
                	var putIt=false;
                	s=data;
                	delete s.users;
                	stores = s.stores;
                	sts = s.timestamp
                	console.log(c.lid)
                	console.log('pts: '+pts +' ' + new Date(pts))
                	console.log('cts: '+cts +' ' + new Date(cts))
                	console.log('sts: '+sts +' ' + new Date(sts))                        
                        if (sts > pts){ //if server has been updated since prior LS
                        	console.log('merging')
                        	updItems=merge(p.items, c.items, s.items);
                        	nts=Date.now();
                        	c.items=updItems;
                        	c.timestamp =nts;
                        	c.stores=stores;
                        	setClist(c);
                        	putIt=true
                        } else if(cts==pts && cts==sts){
                        	console.log('timestamps =, doing nothing')   
                        } else {
                        	console.log('just sending c ')
                        	updItems=c.items;
                        	c.stores=stores;
                        	setClist(c);
                        	nts=cts;
                        	putIt=true
                        }
                        if (putIt){
                        	p.items = updItems;
                        	p.timestamp = nts;
                        	p.stores = stores;
                        	setPlist(p);
                        	$http.put(url, {timestamp:nts, items: updItems}).
                        	success(function(data, status) {
                        		console.log('PUT updated list on server: ' +status)
                        		console.log(data)
                        	}).                
                        	error(function(data, status){
                        		console.log(status)
                        	});
                        	deferred.resolve(p); 
                        }                                                                          
                    }).
error(function(data, status){
	deferred.reject(data)
});
}
return deferred.promise
}           
}   
}])
