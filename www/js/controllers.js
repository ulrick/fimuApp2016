angular.module('fimu.controllers', [])

.controller('ProgramsCtrl', function($scope, $state) {
	
	$scope.nowProgramDetails = function(){
		console.log("je vais au détails");
		$state.go('tab.programsDetails');
	}
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})




.controller('NavController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
	$ionicSideMenuDelegate.toggleLeft();
  };
})


.controller('EventPageController', function($scope, $rootScope, $stateParams, Event, $ionicSideMenuDelegate) {
  var query = Event.query();
  query.$promise.then(function(data) {
     $scope.events = data;
  });
})

.controller('EventDetailCtrl', function($scope, $stateParams, Event) {
  $scope.event = Event.get($stateParams.id);
  
  var query = Event.query();
  var singleEvent;
  query.$promise.then(function(data) {
    angular.forEach(data, function(datum, key){
      $scope.singleEvent = datum;
    });
     $scope.events = data;
      
  });

})


.controller('SndChatPageController', function($scope, $ionicSideMenuDelegate) {
})
.controller('SndChatSinglePageController', function($scope, $ionicSideMenuDelegate) {
})
.controller('SndDrinkPageController', function($scope, $ionicSideMenuDelegate) {
})
.controller('SndPolicyPageController', function($scope, $ionicSideMenuDelegate) {
})
