var sbMd = angular.module("sbMd", []);

sbMd.directive('sbMd', function () {
    var converter = new Showdown.converter();
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var htmlText = '<div class="md">'+converter.makeHtml(element.text()) +'</div>';
            console.log(htmlText)
            element.html(htmlText);
        }
    };
});