angular.module('uniCoupons.controllers').controller('uniCoupons.controllers.coupons',
   ['$scope', '$rootScope', '$filter', '$timeout', '$interval', 'uniCoupons.services.enteFactory', 'uniCoupons.services.couponFactory',
      function ($scope, $rootScope, $filter, $timeout, $interval, enteFactory, couponFactory) {

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

         $scope.$watchCollection(
            "coupons",
            function (newValue, oldValue) {
               $timeout(function () {
                  // ATTIVO TUTTI I TOOLTIP NELLA VIEW
                  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                     return new bootstrap.Tooltip(tooltipTriggerEl)
                  })

                  //ATTIVO SLIDE NEXT ENTI
                  $('#next-slide').click();
               }, 1000);
            }
         );

         var words = [
            'pubblicare ',
            'cercare ',
            'approfittare de',
            'trovare '
         ], i = 0;

         var intervalSpan = $interval(function () {
            $('#header-span').fadeOut(function () {
               $(this).html(words[i = (i + 1) % words.length]).fadeIn();
            });
         }, 2000);

         $scope.$on('$destroy', function () {
            $interval.cancel(intervalSpan);
         });

      }]);