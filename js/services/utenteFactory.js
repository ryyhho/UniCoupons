angular.module('uniCoupons.services').factory('uniCoupons.services.utenteFactory', ['$http',
	function($http) {
		var urlBase = PHP_SERVER_URL + '/utente';
		return {
			login: function (obj) {
				return $http.get(urlBase + '/login' + PHP_EXT + utils.params(obj));
			},
			isLoggedIn: function () {
				return $http.get(urlBase + '/isLoggedIn' + PHP_EXT);
			},
			logout: function () {
				return $http.get(urlBase + '/logout' + PHP_EXT);
			},
			signup: function (obj) {
				return $http.post(urlBase + '/signup' + PHP_EXT, obj);
			}
	  	};
	}
]);