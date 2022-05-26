angular.module('uniCoupons.controllers').controller('uniCoupons.controllers.nuovoEnte',
    ['$scope', '$rootScope', 'uniCoupons.services.enteFactory', 'uniCoupons.services.imageFactory',
        function ($scope, $rootScope, enteFactory, imageFactory) {

            $scope.nuovoEnteForm = {};

            $scope.insertEnte = function () {

                $scope.error = false;
                $scope.errorMsg = "";

                $scope.loading = true;

                enteFactory.post($scope.nuovoEnteForm).then(
                    function (res) {
                        if ($scope.enteImg)
                            imageFactory.upload($scope.enteImg, "ente/"+res.data.id_ente).then(
                                function (res1) {
                                    $scope.init();
                                    $scope.nuovoEnteForm = {};
                                    delete $scope.enteImg;
                                    $('#nuovoEnteModal').modal('hide');
                                },
                                function (err) {

                                    if (err.status == 0) {
                                    } else {
                                        $scope.error = true;
                                        $scope.errorMsg = err.data.msg;
                                    }
                                    console.log('Errore:', err);
                                })['finally'](function (res) {
                                    $scope.loading = false;
                                });
                        else {
                            $scope.init();
                            $scope.nuovoEnteForm = {};
                            $('#nuovoEnteModal').modal('hide');
                        }
                    },
                    function (err) {

                        if (err.status == 0) {
                        } else {
                            $scope.error = true;
                            $scope.errorMsg = err.data.msg;
                        }
                        console.log('Errore:', err);
                        $scope.loading = false;
                    });
            };

            $scope.selectImage = function () {
                $('#enteImg').click();
            }

            $scope.$watch('enteImg', function (newValue, oldValue) {
                if (newValue) {
                    $("#inputImg").attr("src", URL.createObjectURL(newValue));
                }
            });

        }]);