angular.module('uniCoupons.controllers').controller('uniCoupons.controllers.register',
    ['$scope', '$rootScope', 'uniCoupons.services.utenteFactory',
        function ($scope, $rootScope, utenteFactory) {

            $scope.signupForm = {};

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

        }]);