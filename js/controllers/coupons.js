angular.module('uniCoupons.controllers').controller('uniCoupons.controllers.coupons', 
   [ '$scope', '$rootScope', '$filter', 'uniCoupons.services.enteFactory', 'uniCoupons.services.couponFactory',
   function($scope, $rootScope, $filter, enteFactory, couponFactory) {

      enteFactory.get().then(function (res) {
         $scope.entiList = res.data;
         $scope.enti = utils.groupArr($scope.entiList, 3);
      });

      couponFactory.get().then(function (res) {
         $scope.couponsList = res.data;
         $scope.coupons = utils.groupArr($scope.couponsList, 2);
      });

      $scope.getEnte = function(id_ente) {
         return $filter('filter')($scope.entiList, {id_ente: id_ente}, true)[0];
      }

}]);