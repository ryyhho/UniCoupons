angular.module('uniCoupons.services').factory('uniCoupons.services.enteFactory', ['$http',
	function($http) {
		var urlBase = PHP_SERVER_URL + '/ente';
		return {
			get: function () {
				return $http.get(urlBase + '/get' + PHP_EXT);
			}
	  	};
	}
]);