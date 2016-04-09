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
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.programs', {
    url: '/programs',
    views: {
      'tab-programs': {
        templateUrl: 'templates/tab-home.html',
        controller: 'ProgramsCtrl'
      }
    }
  })
  
  .state('tab.programsDetails', {
    url: '/programs/details',
    views: {
      'tab-programs': {
        templateUrl: 'templates/tab-programs.html',
        controller: 'ProgramsCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })


	.state('snd', {
		url : '/snd',
		templateUrl : 'templates/fimu-abstract.html',
		abstract : true
	})
	.state('snd.home', {
		url: '/home',
		views: {
			'snd': {
				templateUrl: 'templates/fimu-home.html',
				controller : 'EventPageController'
			}
		}
	})
.state('snd.event-detail', {
      url: '/home/:id',
      views: {
        'snd': {
          templateUrl: 'templates/event-detail.html',
          controller: 'EventDetailCtrl'
        }
      }
    })

	.state('snd.chat', {
		url: '/chat',
		views: {
			'snd': {
				templateUrl: 'templates/snd-chat.html',
				controller : 'SndChatPageController'
			}
		}
	})
	.state('snd.chat-single', {
	  url: '/chat-single',
	  views: {
		'snd': {
		  templateUrl: 'templates/snd-chat-single.html',
		  controller : 'SndChatSinglePageController'
		}
	  }
	})
	.state('snd.drink', {
		url: '/drink',
		views: {
			'snd': {
				templateUrl: 'templates/snd-drink.html',
				controller : 'SndDrinkPageController'
			}
		}
	})
	.state('snd.policy', {
		url: '/policy',
		views: {
			'snd': {
				templateUrl: 'templates/snd-policy.html',
				controller : 'SndPolicyPageController'
			}
		}
	});

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/programs');

})

.constant('apiUrl', 'http://manasse-yawo.com')

;
