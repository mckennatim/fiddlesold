var s2gStoreSort = angular.module('s2gStoreSort', []);

s2gStoreSort.directive('s2gStoreSort',['Stores', '$filter', function( Stores, $filter){
	return{
		restrict: 'E',
		scope: {
       		list: "=list"
       	},
       	templateUrl: "modules/storeSort/s2g-store-sort.html",
       	link: function(scope,el,attr){
       		scope.stores=Stores;
       		scope.sortBy = 'alpha';
       		var orderBy = $filter('orderBy');
       		var filter = $filter('filter');  
       		scope.aisleOrder = function(item){
       			if(!item.loc){
       				return 0 
       			}else {
       				return scope.stores.st[store.id].aisles.indexOf(item.loc); 
       			}  
       		};              
       		scope.orderByStore= function(store){
       			scope.sortBy=store.name;
       			var aisleOrder = function(item){
       				if(!item.loc){
       					return 0 
       				}else {
       				}  
       			};            
       			var items= scope.list.items;
       			scope.list.items = orderBy(items, aisleOrder);
       			var message={action:'doNothing', item:{product:'none', done:false}}
       			console.log(message)
       			//Lists.saveList(message); 
       		};
       		scope.reverse = false;
       		scope.sort = function(){
       			scope.sortBy='alpha';
       			var items= scope.list.items;
       			scope.list.items = orderBy(items, "product", scope.reverse);
       			scope.reverse = !scope.reverse
       			var message={action:'doNothing', item:{product:'none', done:false}}
       			console.log(message)
       			//Lists.saveList(message); 
       		};			
       	}
       }
}]);

