

/*
Write an algorithm that will find the first duplicate in a list on the page.
For example we would return 4, for the list above.
*/
var app = angular.module("SyncApp", []);

app.controller("SyncCtrl", function($scope, SyncService){
    var c = $scope.c = SyncService.c() ;
    var c2 = $scope.c2 = SyncService.c2() ;
    //console.log( c2);
    var s = $scope.s = SyncService.s() ;
    var s2 = $scope.s2 = SyncService.s2() ;
    var p2 = $scope.p2 = SyncService.p2() ;
    var p = $scope.p = SyncService.p() ;
    //var m = $scope.m = SyncService.merge(p,c,s);
    //console.log(m)
    var oc = $scope.oc = SyncService.a2o(c)
    var os = $scope.os = SyncService.a2o(s)
    var op = $scope.op = SyncService.a2o(p)
    var ps = $scope.ps = SyncService.difference(op,s2, 'product');
    var pc = $scope.pc = SyncService.difference(op,c2, 'product');
    var spc = $scope.spc = SyncService.difference(s2,pc, 'product');    
    var cps = $scope.cps = SyncService.difference(c2, ps, 'product');
    var mo2 = $scope.mo2 =  SyncService.mergeObjs(op, c2, s2);
    $scope.jmo2 = JSON.stringify(mo2, undefined, 2);
});

app.factory("SyncService", function(){
    return {
        s2: function(){
            return [{"product":"bananas", "done" : false},
                {"product":"cantelope", "done" : false},
                {"product":"daipers", "done" : false},
                {"product":"dog food", 
                    "done" : false,
                    "tags" : [
                            "produce"
                    ],
                    "amt" : {
                            "qty" : 3,
                            "unit" : "3lb bag"
                    }
                },
                {"product":"fish sticks", "done" : false},
                {"product":"gerkins", "done" : false}] 
        },
        c2: function(){
            return [{"product":"anise", "done" : false},
                {"product":"apples", "done" : false},
                {"product":"bananas", 
                    "done" : false,
                    "tags" : [
                            "produce"
                    ],
                    "amt" : {
                            "qty" : 3,
                            "unit" : "3lb bag"
                    }
                },
                {"product":"cauliflower", "done" : false},
                {"product":"fennel", "done" : false},
                {"product":"frogs legs", "done" : false}]                 
        },
        c: function(){
            return ['anise', 
            'apples',
            'bananas',
            'cauliflower',
            'fennel',
            'frogs legs',
            ]
        },
        p2: function(){
            return  [{"product":"apples", "done" : false},
               {"product":"bananas", "done" : false},
               {"product":"cantelope", "done" : false},
               {"product":"dog food", "done" : false},
               {"product":"fennel", "done" : false}
                ]
        },        
        p: function(){
            return  ['apples',
                'bananas',
                'cantelope',
                'dog food',
                'fennel'
                ]
        },
        s: function(){
            return ['bananas',
            'cantelope',
            'daipers',
            'dog food',
            'fish sticks',
            'gerkins'
            ]
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
            // difference(op,s2, 'product'
            var prop =arguments[2];//product
            var rest = arguments[1];//s2
            var containsEquals = function(obj, target) {
                // used on each value of the array being filtered(op), 
                // compares product name to each element in obj(s2)
                if (obj == null) return false;
                return _.any(obj, function(value) {
                    return value[prop] === target[prop];
                });
            };
            // filter with the containsEquals function
            // include only those array(op) elements not in the rest(s2) array
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