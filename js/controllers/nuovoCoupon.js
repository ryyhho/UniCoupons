angular.module('uniCoupons.controllers').controller('uniCoupons.controllers.nuovoCoupon',
    ['$scope', '$rootScope', 'uniCoupons.services.enteFactory', 'uniCoupons.services.couponFactory',
        function ($scope, $rootScope, enteFactory, couponFactory) {

            $scope.nuovoCouponForm = {
                euro_perc: false,
                data_inizio: moment().toDate()
            };

            enteFactory.get().then(function (res) {
                $scope.entiList = res.data;
            });

            $scope.updateImporto = function () {
                if ($scope.gratis) {
                    $scope.nuovoCouponForm.titolo = 0;
                    delete $scope.nuovoCouponForm.euro_perc;
                } else {
                    delete $scope.nuovoCouponForm.titolo;
                    $scope.nuovoCouponForm.euro_perc = false;
                }
            }

            $scope.insertCoupon = function () {

                $scope.error = false;
                $scope.errorMsg = "";

                $scope.loading = true;

                couponFactory.post($scope.nuovoCouponForm).then(
                    function (res) {
                        $scope.init();
                        $scope.nuovoCouponForm = {
                            euro_perc: false,
                            data_inizio: moment().toDate()
                        };
                        $('#nuovoCouponModal').modal('hide');
                    },
                    function (err) {

                        if (err.status == 0) {
                        } else {
                            $scope.error = true;
                            $scope.errorMsg = err.data.msg;
                        }
                        console.log('Errore:', err);
                    })['finally'](function(res) {
                        $scope.loading = false;
                    });

            };

        }]);