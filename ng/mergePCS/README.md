#Syncing lists from multiple users using set algebra.

###use case
In an app in which multiple people create and edit the same list, How to sync them together? 

An app needs to be able to function to a certain extent even when not connected to the internet. How do you synchronize with other users who may have changed the list while you were making offline changes?

###setup
The app keeps two lists in local storage. One is the Current(C) list which reflects what the app screen shows. The second is the Prior(P) list which reflects the list as it existed after the last update. It has a timestamp.

The Server(S) has the shared list with its own timestamp.

###update
Local updates when offline only change the Current list.

When the app is online it checks with the server. There are two possibilities for state.
1. The Server has not changed since the last update (S.timestamp <= P.timestamp)
* Update by copying the current list to server and to prior, and update timestamps
2. The Server has changed since the last update (somebody else changed the list)(S.timestamp > P.timestamp)
* Synch the lists by merging current, prior and server.

###problem
Figure out a slick way to sych, merging the current, prior and server lists. It looks like a set algebra problem. As you can see from the table below... 
Since the last update the user has added anise and frog legs but has gotten the dog-food. Meanwhile somebody got the apples and the fennel and added diapers fish sticks and gerkins to the list.

So the updated list should include the things added by the other user, but delete the things the other user got. It should also reflect the things added by the user and delete things they got.


###solution
In short: the merged list M=(C\(P\S))U(S\(P\C)) where <br>
P\C is the relative complement of P in C<br>
P\C = items contained in P that are not in C


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


First I took the current list and just kept operating on them with union, intersection, and relative complement operations until I got to the merge list I was after. Then I took that page of relations and intersecting circles and reduced them using set algebra rules. 

 <a href="http://johnmacfarlane.net/pandoc/try/" title="">http://johnmacfarlane.net/pandoc/try/</a>


