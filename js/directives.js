var directives = angular.module('uniCoupons.directives',[]);

directives.directive('onErrorSrc', function() {
    return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src != attrs.onErrorSrc) {
              attrs.$set('src', attrs.onErrorSrc);
            }
          });
        }
    }
}).directive("ngFileRead", [function () {
  return {
      scope: {
          ngFileRead: "="
      },
      link: function (scope, element, attributes) {
          element.bind("change", function (changeEvent) {
              scope.$apply(function () {
                  scope.ngFileRead = changeEvent.target.files[0];
              });
          });
      }
  }
}]);
