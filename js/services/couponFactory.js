angular.module('uniCoupons.services').factory('uniCoupons.services.couponFactory', ['$http',
	function($http) {
		var urlBase = PHP_SERVER_URL + '/coupon';
		return {
			get: function () {
				return $http.get(urlBase + '/get' + PHP_EXT);
			}
	  	};
	}
]);