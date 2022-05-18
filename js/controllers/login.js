angular.module('uniCoupons.controllers').controller('uniCoupons.controllers.login',
    ['$scope', 'uniCoupons.services.utenteFactory',
        function ($scope, utenteFactory) {

            $scope.loginForm = {};

            $scope.signIn = function () {

                utenteFactory.login($scope.loginForm).then(
                    function (res) {
                        $scope.utente = res.data;
                    },
                    function (err) {

                        if (err.status == 0) {
                        } else {
                        }
                        console.log('Errore:', err);
                    });

            };

        }]);