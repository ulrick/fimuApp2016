// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('fimu', ['ionic', 'ngResource', 'notifications','ngMap', 'fimu.controllers', 'fimu.services', 'fimu.factory'])

.run(function($ionicPlatform, $rootScope, EventFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
		
		
		if(true){//faire ceci si internet est detecté
			$rootScope.allEvents = EventFactory.query();
			//console.log("Tous les events ", $rootScope.allEvents);
		}
		else{
			//Todo il n'y a pas internet
		}
		

    moment.locale('fr', {
      week : {
        dow : 1 // Monday is the first day of the week
      }
    });

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

	.state('fimu', {
		url : '/fimu',
		templateUrl : 'templates/fimu-abstract.html',
		abstract : true
	})
	.state('fimu.home', {
		url: '/home',
		views: {
			'fimu': {
				templateUrl: 'templates/fimu-home.html',
				controller : 'EventPageController'
			}
		}
	})
  .state('fimu.event-detail', {
      url: '/home/:id',
      views: {
        'fimu': {
          templateUrl: 'templates/event-detail.html',
          controller: 'EventDetailController'
        }
      }
    })

  .state('fimu.event-agenda', {
    url: '/agenda',
    views: {
      'fimu': {
        templateUrl: 'templates/fimu-eventAgenda.html',
        controller : 'EventPageController'
      }
    }
  })

	.state('fimu.scene', {
		url: '/scene',
		views: {
			'fimu': {
				templateUrl: 'templates/fimu-scenes.html',
				controller : 'ScenePageController'
			}
		}
	})
	.state('fimu.scene-detail', {
	  url: '/scene/:id',
	  views: {
		'fimu': {
		  templateUrl: 'templates/scene-detail.html',
		  controller : 'SceneDetailController'
		}
	  }
	})
	.state('fimu.sceneEvents', {
	  url: '/scene/:id/events',
	  views: {
		'fimu': {
		  templateUrl: 'templates/fimu-sceneEvents.html',
		  controller : 'SceneEventsController'
		}
	  }
	})
	.state('fimu.map', {
		url: '/map',
		views: {
			'fimu': {
				templateUrl: 'templates/fimu-map.html',
				controller : 'MapPageController'
			}
		}
	})
	.state('fimu.policy', {
		url: '/policy',
		views: {
			'fimu': {
				templateUrl: 'templates/snd-policy.html',
				controller : 'SndPolicyPageController'
			}
		}
	})
	.state('fimu.accueil', {
		url: '/accueil',
		views: {
			'fimu': {
				templateUrl: 'templates/accueil.html',
				controller : 'AccueilPageController'
			}
		},
		onEnter: function($rootScope) {
				//$rootScope.evenement();
		}
	})
	;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/fimu/accueil');

})

.constant('apiUrl', 'http://fimu.shalomaku.fr/api')
.constant('googleMapsUrl', "https://maps.googleapis.com/maps/api/js?key=AIzaSyCPJjYAUvTVhK1bWLi3aUHCO13FRr4FDV4&language=fr&region=FR")
.constant('festivalDates', {
	dateStart : '2016-05-13 18:00:00',
	dateEnd : '2016-05-16'
})
/*.constant('jazzStyle', {
	name : 'Jazz',
	details : 'Rock, Hip-Hop, Blues, Electro...'
})*/

;
