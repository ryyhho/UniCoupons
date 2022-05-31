angular.module('uniCoupons.controllers').controller('uniCoupons.controllers.coupons',
   ['$scope', '$rootScope', '$filter', '$timeout', 'uniCoupons.services.enteFactory', 'uniCoupons.services.couponFactory',
      function ($scope, $rootScope, $filter, $timeout, enteFactory, couponFactory) {

         $scope.init = function () {
            enteFactory.get().then(function (res) {
               $scope.entiList = res.data;
               $scope.enti = utils.groupArr($scope.entiList, 3);
            });

            couponFactory.get().then(function (res) {
               $scope.couponsList = res.data;
               $scope.coupons = utils.groupArr($scope.couponsList, 2);
            });
         }

         $scope.init();

         $scope.getEnte = function (id_ente) {
            return $filter('filter')($scope.entiList, { id_ente: id_ente }, true)[0];
         }

         $scope.filterCoupons = function (ente) {
            if ($scope.enteSelected == ente)
               $scope.enteSelected = {};
            else
               $scope.enteSelected = ente;
            $scope.coupons =
               utils.groupArr($filter('filter')($scope.couponsList, { id_ente: $scope.enteSelected.id_ente }, true));

            $([document.documentElement, document.body]).animate({
               scrollTop: $("#couponsSection").offset().top
            }, 100);
         }

         $scope.copyCode = function (coupon) {
            coupon.copied = true;
            navigator.clipboard.writeText(coupon.codice).then(function () {
               $timeout(function () { delete coupon.copied; }, 2000);
            });
         }

         $scope.classCardActive = function (ente) {
            return { 'card-active': ente == $scope.enteSelected };
         }

         $scope.isCouponValid = function (date) {
            return moment(date).isSameOrAfter(moment());
         }

      }]);