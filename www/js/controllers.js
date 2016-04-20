angular.module('fimu.controllers', [])

.controller('NavController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
	   $ionicSideMenuDelegate.toggleRight();
  };
})

.controller('EventPageController', function($scope, $rootScope, $stateParams, EventFactory, $ionicSideMenuDelegate) {
  var query = EventFactory.query();
  var eventsPromiseList = [];
  $scope.events = [];
  //$scope.thisevent = {};
  var dateFestivalStart = "2016-05-13";
  query.$promise.then(function(data) {
    angular.forEach(data, function(event) {
      event.day = moment(event.date_start).format('dddd');;
      event.startTime = moment(event.date_start).format('HH:mm');
      event.endTime = moment(event.date_end).format('HH:mm');
      eventsPromiseList.push(event);
    });
    $scope.events = data;
    console.log("controller ", eventsPromiseList);
  });
  $rootScope.decompte = moment().countdown(dateFestivalStart).toString();
  console.log($rootScope.decompte);
})

.controller('EventDetailCtrl', function($scope, $stateParams, EventFactory) {
  console.log("state param ",$stateParams.id);
  $scope.event = EventFactory.get({id:$stateParams.id});
  console.log("single event ",$scope.event);
  //$scope.event = Event.singleEvent($stateParams.event_id);
  /*$scope.chat = Chats.get($stateParams.chatId);*/
})

.controller('SndChatPageController', function($scope, $rootScope, $stateParams, SceneFactory, $ionicSideMenuDelegate) {
  var query = SceneFactory.query();
  var scenesPromiseList = [];
  $scope.scenes = [];
  query.$promise.then(function(data) {
    angular.forEach(data, function(scene) {
      scenesPromiseList.push(scene);
    });
    $scope.scenes = data;
    console.log("controller ", scenesPromiseList);
  });
})

.controller('SndChatSinglePageController', function($scope, $ionicSideMenuDelegate) {
})

.controller('SndDrinkPageController', function($scope, $ionicSideMenuDelegate) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('SndPolicyPageController', function($scope, $ionicSideMenuDelegate) {
})
