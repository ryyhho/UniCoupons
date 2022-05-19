angular.module('uniCoupons.controllers').controller('uniCoupons.controllers.coupons', 
   [ '$scope', '$rootScope', 'uniCoupons.services.enteFactory', 
   function($scope, $rootScope, enteFactory) {

      enteFactory.get().then(
         function (res) {
             $scope.enti = utils.groupArr(res.data, 3);
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

}]);