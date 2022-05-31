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

//     		//controllo preliminare: se l'utente non è abilitato, può navigare solo utilizzando link/pulsanti presenti nella pagina
//     		//vanno bloccate le navigazioni tramite url
//     		//per fare questo, in tutti i cambi di stato definiti a livello applicativo deve essere impostato il parametro 'autorizzaSeAppNonAbilitata' a true
//     		//se il parametro non è true, la transizione verso lo stato è bloccata
//     		if ($rootScope.appAbilitata === false && !toParams.autorizzaSeAppNonAbilitata) {
//     			event.preventDefault();
// 				return;
//     		}
   
//     		//controllo sugli stati non previsti per il flusso applicativo di un utente abilitato (es. registrazione e richiesta)
// 			if (toState.data && toState.data.bloccaSeAppAbilitata) {
// 				if ($rootScope.appAbilitata === true) {
// 					//l'applicazione è abilitata, l'utente è già loggato e sta navigando: non può passare in uno di questi stati, transizione bloccata
//     				event.preventDefault();
//     				return;
//     			} else if ($rootScope.appAbilitata === undefined) {
//     				//l'abilitazione è in uno stato indefinito: l'utente è entrato nel sito direttamente con l'url corrispondente a uno di questi stati
//     				//redirect sulla homepage, poi in base allo stato di abilitazione dell'utente comparirà la pag. corretta
//     				event.preventDefault();
//     				$state.go('base.home');
//     			}
//     		}

// 			var toStatePermitted = true;

//     		if (toState.data && toState.data.idFunzione && $rootScope.notPermitted) {
//     			if (toState.data.idFunzione === '@runtime') {
//     				//controllo a runtime nel controller specifico
//     			} else {
//     				toStatePermitted = $rootScope.isPermittedRecursive(toState.data.idFunzione);
//     			}
// 			}

// 			if (!toStatePermitted) {
//     			event.preventDefault();
// 				$state.go(STATO_ACCESSO_NEGATO);
// 			}
// 			else if (toState.name === 'base.operazioni') {
//     			if ($rootScope.paginaOperazioni && $rootScope.paginaOperazioni.visited) {
//         			event.preventDefault();
//         			$state.go($rootScope.paginaOperazioni.defaultPage);
//     			}
//     		}
// //    		} /*else if(toState.name === 'base.operazioni.operazioni') { 
// //    			event.preventDefault();
// //    			$state.go('base.operazioni.operazioni.inCorso');
// //    		} else if(toState.name === 'base.operazioni.missione') { 
// //    			event.preventDefault();
// //    			$state.go('base.operazioni.missione.inserimento');
// //    		} else if(toState.name === 'base.operazioni.modelli') { 
// //    			event.preventDefault();
// //    			$state.go('base.operazioni.modelli.operazione');
//     		else if (toState.name === 'base.comunicazioni') {
//     			if ($rootScope.paginaComunicazioni && $rootScope.paginaComunicazioni.visited) {
//         			event.preventDefault();
//         			$state.go($rootScope.paginaComunicazioni.defaultPage);
//     			}
//     		}
//     		else if (toState.name === 'base.terraBordo') {
//     			if ($rootScope.paginaTerraBordo && $rootScope.paginaTerraBordo.visited) {
//         			event.preventDefault();
//         			$state.go($rootScope.paginaTerraBordo.defaultPage);
//     			}
//     		}
//     		else if (toState.name === 'base.sdm') {
//     			if ($rootScope.paginaSdm && $rootScope.paginaSdm.visited) {
//         			event.preventDefault();
//         			$state.go($rootScope.paginaSdm.defaultPage);
//     			}
//     		}
//     		else if (toState.name === 'base.bancheDati') {
//     			if ($rootScope.paginaBancheDati && $rootScope.paginaBancheDati.visited) {
//         			event.preventDefault();
//         			$state.go($rootScope.paginaBancheDati.defaultPage);
//     			}
//     		}
// //    		else if(toState.name === 'base.bancheDati.mezzi') { 
// //    			event.preventDefault();
// //    			$state.go('base.bancheDati.mezzi.ricerca');
//     		else if (toState.name === 'base.utenze') {
//     			if ($rootScope.paginaUtenze && $rootScope.paginaUtenze.visited) {
//         			event.preventDefault();
//         			$state.go($rootScope.paginaUtenze.defaultPage);
//     			}
//     		}
//     		else if (toState.name === 'base.documenti') {
//     			if ($rootScope.paginaDocumenti && $rootScope.paginaDocumenti.visited) {
//         			event.preventDefault();
//         			$state.go($rootScope.paginaDocumenti.defaultPage);
//     			}
//     		}
//     		else if(toState.name === 'base.mezziSospetti') { 
//     			if ($rootScope.paginaMezziSospetti && $rootScope.paginaMezziSospetti.visited) {
//         			event.preventDefault();
//         			//$state.go($rootScope.paginaMezziSospetti.defaultPage);
//         			$state.go($rootScope.paginaMezziSospetti.defaultPage, $rootScope.paginaMezziSospetti.defaultPageParams);
//     			}
//     		} 	    		
    	});
    	$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
    	    $rootScope.previousState = from.name;
    	});
    	// $rootScope.$on('$viewContentLoaded', function(ev) {
    	// 	//Evento lanciato al caricamento completo della pagina 'html'
    	// 	//forzo l'apertura di tutti gli accordian come richiesto dal cliente
    	// 	$('.corpo .collapse').collapse({hide: false});
    	// });

    	//fix caso in cui la modale con l'icona loading.gif è sovrapposta a un'altra modale
    	//se alla chiusura di loading.gif c'è una modale aperta (condizione in if), si aggiunge manualmente la classe 'modal-open' al body
    	//altrimenti la modale perderebbe focus
    	// $('#loading').on('hidden.bs.modal', function (e) {
    	// 	if ($('.modal:visible').length) {
    	// 		$('body').addClass('modal-open');
    	//     }
    	// });
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