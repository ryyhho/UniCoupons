angular.module('uniCoupons.controllers').controller('uniCoupons.controllers.nuovoEnte',
    ['$scope', '$rootScope', 'uniCoupons.services.enteFactory', 'uniCoupons.services.couponFactory',
        function ($scope, $rootScope, enteFactory, couponFactory) {

            $scope.nuovoEnteForm = {};

            $scope.insertEnte = function () {

                $scope.error = false;
                $scope.errorMsg = "";

                $scope.loading = true;

                enteFactory.post($scope.nuovoEnteForm).then(
                    function (res) {
                        $scope.init();
                        $scope.nuovoEnteForm = {};
                        $('#nuovoEnteModal').modal('hide');
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

            $scope.selectImage = function() {
                $('#enteImg').click();
            }

            $scope.$watch('enteImg', function(newValue, oldValue) {
                if (newValue) {
                    $("#inputImg").attr("src",URL.createObjectURL(newValue));
                }
            });

        }]);