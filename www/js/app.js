// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('fimu', ['ionic', 'ngResource', 'fimu.controllers', 'fimu.services'])

.run(function($ionicPlatform) {
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

    moment.locale('fr', {
      week : {
        dow : 1 // Monday is the first day of the week
      }
    });


  });
})

.config(function($stateProvider, $urlRouterProvider) {

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
	.state('fimu.drink', {
		url: '/drink',
		views: {
			'fimu': {
				templateUrl: 'templates/fimu-setting.html',
				controller : 'SndDrinkPageController'
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
	});

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/fimu/home');

})

.constant('apiUrl', 'http://fimu.shalomaku.fr/api')

;
