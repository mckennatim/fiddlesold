var app = angular.module("App", []);

app.directive('sbMd', function (md) {
	var converter = new Showdown.converter();
	return {
		restrict: 'E',
		scope: {
			mdfile: "@"
		},
		link: function (scope, element, attrs) {
			var mdText = element.text();
			if(scope.mdfile){
				console.log(scope.mdfile)
				md.getMd(scope.mdfile).then(function(txt){
					console.log(txt)
					mdText = txt + mdText;
					console.log(mdText)
					convertMd(mdText)
				});
			}else{
				convertMd(mdText)
			}
			function convertMd(str){
				console.log(str)
				console.log(str)
				var htmlText = '<div class="md">'+converter.makeHtml(str) +'</div>';
				console.log(htmlText)
				element.html(htmlText);
			}
		}
	};
});

app.factory('md', ['$http', '$q', function($http, $q){
	return{
		getMd: function(mdfile){
			var deferred =$q.defer();
			$http.get(mdfile).success(function(txt, status){
				console.log(txt)
				deferred.resolve(txt)
			}).error(function(err, status){
				deferred.reject(err)
			})
			return deferred.promise
		}
	}
}])