angular.module('uniCoupons.services').factory('uniCoupons.services.utenteFactory', ['$http',
	function($http) {
		var urlBase = PHP_SERVER_URL + '/utente';
		return {
			login: function (obj) {
				return $http.get(urlBase + '/login' + PHP_EXT + utils.params(obj));
			}
	  	};
	}
]);