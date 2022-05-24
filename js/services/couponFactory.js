angular.module('uniCoupons.services').factory('uniCoupons.services.couponFactory', ['$http',
	function($http) {
		var urlBase = PHP_SERVER_URL + '/coupon';
		return {
			get: function () {
				return $http.get(urlBase + '/get' + PHP_EXT);
			},
			search: function (obj) {
				return $http.get(urlBase + '/search' + PHP_EXT + utils.params(obj));
			}
	  	};
	}
]);