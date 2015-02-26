var s2gList = angular.module('s2gList', []);

s2gList.directive('s2gList',[ '$filter', 'ioService', function( $filter, ioService){
	return{
		restrict: 'E',
		scope: {
       		list: "=list",
       		upd: "&",
       		lid: "@"
       	}, //isolates scope
		templateUrl: "modules/list/s2g-list.html",
		link: function(scope, element, attrs) {
			var io = ioService.socket
			scope.showLoc=true;
			scope.showTags=true;
			io.emit('switchLid',scope.lid);
			var replace = function(item,oldProduct){
				if (scope.list){
					var idx = find(oldProduct);
					if(idx==-1){
						scope.list.items.push(item);					
					}else{
						rep4idx(idx, item);
					}					
				}else{
					console.log('there is no list on this machine')
				}

			}
			var del =function(item){
				if (scope.list){
					var idx = find(item.product);
					scope.list.items.splice(idx,1);
				}else{
					console.log('there is no list on this machine')
				}				
			}
			var ad = function(item){
				if (scope.list){
					scope.list.items.push(item);
				}else{
					console.log('there is no list on this machine')
				}				
			}			
			var find = function(product){
				return scope.list.items.map(function (el){return el.product}).indexOf(product)
			}
			var rep4idx = function(idx,item){
				scope.list.items[idx]=item
			}
			var tstampIt = function(message){
				var ts = Date.now();
				message.timestamp=ts;
				scope.list.timestamp = ts;
				console.log(ts)
				return message
			}			
			io.on('itemChanged', function(data){
				scope.list.timestamp = data.timestamp;
				console.log(data.action +  '; ' + data.oldProduct + ' with:');
				console.log(data.item);
				switch (data.action){
					case 'modify':
						//modify(data.item);
						replace(data.item, data.item.product)
						break;
					case 'add':
						ad(data.item);
						break;
					case 'delete':
						del(data.item);
						break;                                             
					case 'replace':
						replace(data.item, data.oldProduct)
						break;                                             
				}
				scope.$apply();
				scope.upd({message:'from remote'})
			})
			scope.ckDone = function(item){
				var message = {action:'modify', item:item}
				message = tstampIt(message);
				console.log(message.item)
				io.emit('message', message)
				scope.upd({message:'from local ckUpd'})
			}
			scope.remove= function(item){
				var message = {action:'delete', item:item}
				message = tstampIt(message);
				del(message.item)
				console.log(message.item)
				io.emit('message', message)
				scope.upd({message:'from local remove'})
			}; 
			scope.rubmit= function(item){
				var item;
				if (scope.query) {
					item={product: this.query, done:false};
					ad(item)				
					var message = {action:'add', item:item}
					message = tstampIt(message);
					console.log(message.item)
					io.emit('message', message)
					scope.upd({message:'from local ad'})
					scope.query = '';
				}				
			}  	
			scope.editBuffer={} 
			var editedItem ={}
			scope.editItem = function(item){
				console.log(item)
				scope.editedItem= item;
				scope.buffer = JSON.parse(JSON.stringify(item));
				console.log(scope.buffer)
			};
			scope.doneEditing = function(buffer){
				console.log('in doneEditing')  
				console.log(buffer)      
				var oldProduct =   scope.editedItem.product; 
				scope.editedItem.product = buffer.product.trim();
				if(buffer.loc){scope.editedItem.loc = buffer.loc.trim();}
				console.log(buffer.tags)
				if(buffer.tags){scope.editedItem.tags = buffer.tags;}
				console.log(buffer.amt);
				if (buffer.amt){
					scope.editedItem.amt = {qty:0, unit:''}
					if(buffer.amt.qty){
						scope.editedItem.amt.qty = buffer.amt.qty.trim()
					};
					if(buffer.amt.unit){
						scope.editedItem.amt.unit = buffer.amt.unit.trim()
					};        
				}
				console.log(scope.editedItem)
				var message={action:'replace', item:scope.editedItem, oldProduct:oldProduct}
				message = tstampIt(message);
				console.log(message.item)
				io.emit('message', message)
				scope.upd({message:'from local doneEditng'})				
				scope.editedItem = null;
			};
			scope.revertEdit = function(item){
				console.log('escaped into revertEdit')
				scope.editedItem = null;
			}; 					
		}
	}
}])

s2gList.service("ioService", function($q, $timeout) {  
	console.log('the ioservice has started')
	var port = 3000;    
	var socket = io.connect('localhost:' + port);
	console.log('connected in ioService')
	var service = {
		dog: 'fred',
		socket: socket,
		port: port
	}
	return service;
});


