var PHP_EXT = ".php";
var PHP_SERVER_URL = "php";

var utils = {};
utils.params = function(form) {
	 return '?' + Object.keys(form)
	.filter(function (el) { return (form[el] !== null && form[el] !== "" && form[el] !== undefined);})
	.map(function(k) {
			if (form[k] instanceof Date) {
		        return k + '=' + encodeURIComponent(moment(form[k]).format(FORMATO_DATA));
		    }
			if (form[k].constructor.toString().indexOf("Array") > -1) {
				var queryString = '';
				for(var i=0; i< form[k].length; i++){
					queryString+=k+'='+encodeURIComponent(form[k][i]);
					if(i!=form[k].length -1){
						queryString+='&';
					}
				}
				
		        return queryString;
		    }
		    else {
		    	return k + '=' + encodeURIComponent(form[k]);
		    }
		})
	.join('&');
};