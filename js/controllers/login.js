angular.module('uniCoupons.controllers').controller('uniCoupons.controllers.login',
    ['$scope', '$rootScope', 'uniCoupons.services.utenteFactory',
        function ($scope, $rootScope, utenteFactory) {

            $scope.loginForm = {};
            $scope.signupForm = {};

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

            $scope.signUp = function () {

                $scope.error = false;
                $scope.errorMsg = "";

                $scope.loading = true;

                utenteFactory.signup($scope.signupForm).then(
                    function (res) {
                        $rootScope.utente = res.data;
                        $scope.signupForm = {};
                        $('#registerModal').modal('hide');
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

        }]);