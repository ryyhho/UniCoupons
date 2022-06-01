var uniCoupons = angular.module('uniCoupons.app', [
    'ui.router',
    'ui.mask',
    'ui.bootstrap',
    'uniCoupons.controllers',
    'uniCoupons.services',
    'uniCoupons.directives',
    'angular.filter'
]);

angular.module('uniCoupons.controllers', []);
angular.module('uniCoupons.services', ['ngStorage']);

uniCoupons.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
    	$rootScope.$state = $state;
    	$rootScope.$stateParams = $stateParams;
    	
    	$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
              		
    	});
    	$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
    	    $rootScope.previousState = from.name;
    	});
    }
]);

uniCoupons.config(function(
    $stateProvider, 
    $urlRouterProvider, 
    $locationProvider, 
    $httpProvider, 
    $compileProvider) {

        $urlRouterProvider
            .when('/', '/coupons')
            .when('', '/coupons')
            .when('/index.php', '/coupons');
        
        $stateProvider.state('home', {
            url: '/',
            views: {
                '@': {
                    template: '<ui-view/>',
                    controller: 'uniCoupons.controllers.home'
                },
                'login': {
                    templateUrl: 'partials/login.html',
                    controller: 'uniCoupons.controllers.login'
                },
                'register': {
                    templateUrl: 'partials/register.html',
                    controller: 'uniCoupons.controllers.register'
                }
            }
        }).state('home.coupons', {
            url: 'coupons',
            views: {
                '' : {
                    templateUrl : 'partials/coupons.html',
                    controller : 'uniCoupons.controllers.coupons'
                },
                'nuovoCoupon@home.coupons' : {
                    templateUrl : 'partials/nuovo-coupon.html',
                    controller : 'uniCoupons.controllers.nuovoCoupon'
                },
                'nuovoEnte@home.coupons' : {
                    templateUrl : 'partials/nuovo-ente.html',
                    controller : 'uniCoupons.controllers.nuovoEnte'
                }

            }
        }).state('home.searchCoupons', {
            url: 'searchCoupons?v',
            templateUrl : 'partials/search-coupons.html',
            controller : 'uniCoupons.controllers.searchCoupons'

        }).state('home.mineCoupons', {
            url: 'mineCoupons',
            templateUrl : 'partials/mine-coupons.html',
            controller : 'uniCoupons.controllers.mineCoupons'
        });


});