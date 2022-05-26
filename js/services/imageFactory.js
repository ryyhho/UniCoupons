angular.module('uniCoupons.services').factory('uniCoupons.services.imageFactory', ['$http',
	function($http) {
		var urlBase = PHP_SERVER_URL + '/image';
		return {
			upload: function (image, path) {
				var form_data = new FormData();  
				form_data.append('image', image);
				form_data.append('path', path);

				return $http.post(urlBase + '/upload' + PHP_EXT, form_data,  
				{  
					 transformRequest: angular.identity,  
					 headers: {'Content-Type': undefined,'Process-Data': false}  
				});
			}
	  	};
	}
]);