

/*
Write an algorithm that will find the first duplicate in a list on the page.
For example we would return 4, for the list above.
*/
var app = angular.module("SyncApp", []);

app.controller("SyncCtrl", function($scope, SyncService, $filter){
    var filter = $filter('filter');
    SyncService.s2().then(function(data){
        console.log('sts= '+data.timestamp)
        var c2 = $scope.c2 = filter(SyncService.c2(), {done:false}) ;
        var c2t = $scope.c2t = filter(SyncService.c2(), {done:true}) ;
        console.log(JSON.stringify(c2t))
        var s2= $scope.s2 = filter(data.items,  {done:false}) ;
        var s2t= $scope.s2t = filter(data.items,  {done:true}) ;
        var p2 = $scope.p2 = filter(SyncService.p2(), {done:false}) ;
        var p2t = $scope.p2t = filter(SyncService.p2(), {done:true}) ;
        $scope.timest = SyncService.timest; 
        $scope.ftimest = _.map($scope.timest, function(n){
            var dt= new Date(n);
            return dt.getDay()+' '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();
        } )
        console.log($scope.ftimest)
        var ps = $scope.ps = SyncService.difference(p2,s2, 'product');
        var pc = $scope.pc = SyncService.difference(p2,c2, 'product');
        var spc = $scope.spc = SyncService.difference(s2,pc, 'product');    
        var cps = $scope.cps = SyncService.difference(c2, ps, 'product');
        var mo2 = $scope.mo2 =  SyncService.mergeObjs(p2, c2, s2);
        var c2tc;
        c2tc = angular.copy(c2t);
        console.log(JSON.stringify(c2tc))
        SyncService.union(c2tc, p2t, 'product')
        SyncService.union(c2tc, s2t, 'product')
        SyncService.union(c2tc, mo2, 'product')
        var com =  $scope.com =c2tc;
        //console.log(JSON.stringify(com))                
        var sortCom = $scope.sortCom = _.sortBy(com, ["done", "product"]);
        //console.log(JSON.stringify(sortCom))        
        var comf = $scope.comf = filter(sortCom, {done:false})
        var comt = $scope.comt = filter(sortCom, {done:true})
        $scope.jmo2 = JSON.stringify(sortCom, undefined, 2);
    });
});

app.factory("SyncService", function($http, $q){
    var listInfo = {lid: 'Jutebi', shops: 'groceries'}
    var httpLoc = 'http://10.0.1.25:3000/api/';
    var tok = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGltIn0.LmoK1Nr8uA4hrGr25L2AlKXs6U832Z_lE6JGznHJfFs";
    var timest =[];
    return {
        timest:timest,
        s2: function(){
            var s;
            var deferred = $q.defer();
            var url=httpLoc + 'lists/'+listInfo.lid; 
            $http.defaults.headers.useXDomain = true;
            delete $http.defaults.headers.common['X-Requested-With'];
            $http.defaults.headers.common.Authorization = 'Bearer ' + tok;
            console.log(JSON.stringify($http.defaults.headers))
            $http.get(url).   
                success(function(data, status) {
                    console.log('GET list from server: '+status)
                    s=data;
                    timest[2]=data.timestamp
                    deferred.resolve(data)
                });
            return deferred.promise;
        },
        c2: function(){
            var key = 's2g_clists';
            var pal=JSON.parse(localStorage.getItem(key)) || {};
            var list = pal[listInfo.lid];
            if(!list){
                list = {lid: listInfo.lid, shops: listInfo.shops, timestamp: 0, items: [], users: []}
                pal[list.lid]=list;
                localStorage.setItem(key, JSON.stringify(pal));
            }
            timest[0]=list.timestamp
            console.log('cts= '+list.timestamp)
            return list.items;        
        },
        p2: function(){
            var key = 's2g_plists';
            var pal=JSON.parse(localStorage.getItem(key)) || {};
            var list = pal[listInfo.lid];
            if(!list){
                list = {lid: listInfo.lid, shops: listInfo.shops, timestamp: 0, items: [], users: []}
                pal[list.lid]=list;
                localStorage.setItem(key, JSON.stringify(pal));
            }
            timest[1]=list.timestamp
            console.log('pts= '+list.timestamp)
            return list.items;
        },        
        merge: function(p,c,s){
            // (C\(P\S))U(S\(P\C))
            var ps = _.difference(p,s);
            var pc = _.difference(p,c);
            var cps = _.difference(c,ps);
            var spc = _.difference(s,pc);
            var u = _.union(cps, spc);
            return u
        },
        a2o: function(arr){
            var obj = _.map(arr, function(x){
                return {product: x, done: false}
            })
            return obj
        },
        difference: function(array){
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
        },
        union: function (arr1, arr2, prop) {
            _.each(arr2, function(arr2obj) {
                var arr1obj = _.find(arr1, function(arr1obj) {
                    return arr1obj[prop] === arr2obj[prop];
                });

                arr1obj ? _.extend(arr1obj, arr2obj) : arr1.push(arr2obj);
            });
        },       
        mergeObjs: function(p,c,s){
            // (C\(P\S))U(S\(P\C))
            var ps = this.difference(p,s, 'product');
            var pc = this.difference(p,c, 'product' );
            var cps = this.difference(c,ps, 'product');
            var spc = this.difference(s,pc, 'product');
            this.union(spc, cps, 'product');
            return spc
        }       
    }
})