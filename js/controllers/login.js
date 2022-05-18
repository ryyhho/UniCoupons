angular.module('uniCoupons.controllers').controller('uniCoupons.controllers.login',
    ['$scope', 'uniCoupons.services.utenteFactory',
        function ($scope, utenteFactory) {

            $scope.loginForm = {};

            $scope.signIn = function () {

                $scope.error = false;
                $scope.errorMsg = "";

                $scope.loading = true;

                utenteFactory.login($scope.loginForm).then(
                    function (res) {
                        $scope.utente = res.data;
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