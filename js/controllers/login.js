angular.module('uniCoupons.controllers').controller('uniCoupons.controllers.login',
    ['$scope', '$rootScope', '$timeout', 'uniCoupons.services.utenteFactory',
        function ($scope, $rootScope, $timeout, utenteFactory) {

            $scope.loginForm = {};

            $scope.signIn = function () {

                $scope.error = false;
                $scope.errorMsg = "";

                $scope.loading = true;

                utenteFactory.login($scope.loginForm).then(
                    function (res) {
                        $rootScope.utente = res.data;
                        $scope.loginForm = {};
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

            $scope.logOut = function () {

                $scope.error = false;
                $scope.errorMsg = "";

                $scope.loading = true;

                utenteFactory.logout().then(
                    function (res) {
                        delete $rootScope.utente;
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

            $scope.toggleLoginDropdownMenu = function() {
                $('#loginDropdownMenu').dropdown('toggle');
                $scope.loginForm = {};
            };

            $timeout(function () {
                if(!$rootScope.utente) {
                    $('#nav-item-login').tooltip('show');
                    $timeout(function () {
                        $('#nav-item-login').tooltip('hide');
                        $timeout(function () {
                            $('#nav-item-login').tooltip('dispose');
                        }, 100);
                    }, 5000);
                }
             }, 3000);

        }]);