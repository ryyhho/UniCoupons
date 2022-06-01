angular.module('uniCoupons.controllers').controller('uniCoupons.controllers.home', ['$scope', '$rootScope', 'uniCoupons.services.utenteFactory',
    function ($scope, $rootScope, utenteFactory) {

        utenteFactory.isLoggedIn().then(
            function (res) {
                $rootScope.utente = res.data;
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

        $(window).scroll(function () {
            if ($(document).scrollTop() > $("#header").outerHeight()) {
                $("#nav").removeClass("res-nav")
            } else {
                $("#nav").addClass("res-nav");
            }
        });

    }]);