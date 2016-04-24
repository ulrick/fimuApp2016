angular.module('fimu.controllers', [])

.controller('NavController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
	   $ionicSideMenuDelegate.toggleRight();
  };
})

.controller('EventPageController', function($scope, $rootScope, $stateParams, EventFactory, $ionicSideMenuDelegate, $state) {
  
  var query = EventFactory.query();
  var eventsPromiseList = [];
  $scope.events = []; 
  var dateFestivalStart = "2016-05-13"; //Date de début du festival
  $scope.todayDay = moment(new Date()).format('dddd');//Affiche Le jour d'aujourd'hui en lettre "lundi"
  $scope.isVisibleRemaningTime = false;


  console.log("est visible ", $scope.isVisibleRemaningTime);

  query.$promise.then(function(data) {
    angular.forEach(data, function(event) {
      event.day = moment(event.date_start).format('dddd'); //dddd affiche le nom complet du jour
      event.startTime = moment(event.date_start).format('HH:mm');
      event.endTime = moment(event.date_end).format('HH:mm');
      eventsPromiseList.push(event);
    });

    if(moment(new Date()) <= moment(dateFestivalStart) ){
      $scope.isVisibleRemaningTime = true;
    }
    

    $scope.events = data;
    console.log("controller ", eventsPromiseList);

    /*currentEvent contient la liste des évènement qui ont lieu le jour en cours et dont */
    var currentEvent = _.chain(eventsPromiseList)
      .where({day: $scope.todayDay})
      .filter(function(eventList){
          //console.log("heure event",moment().diff(eventList.date_end,'hours'));
          return moment().diff(eventList.date_end) < 0;
      }).value();
      $scope.events = currentEvent;
      console.log("Actuellement ", currentEvent);
  });
 
  
  /*var youngest = _.chain(eventsPromiseList)
    .sortBy(function(stooge){ return stooge.age; })
    .map(function(stooge){ return stooge.name + ' is ' + stooge.age; })
    .first()
    .value();*/

  /* Afficahe du nombre de jour restant avant le début du festival */
  var remaningDays = moment(dateFestivalStart).diff(moment(new Date()));
  $rootScope.duration = {};
  setInterval(
    function () {
      remaningDays = remaningDays-1000; //soustraire une seconde du temps restant
      $rootScope.duration.days = moment.duration(remaningDays).days()
      $rootScope.duration.hours = moment.duration(remaningDays).hours();
      $rootScope.duration.minutes = moment.duration(remaningDays).minutes();
      $rootScope.duration.seconds = moment.duration(remaningDays).seconds();
      $scope.$apply();
    }, 
    1000
  );
  /*Fin nombre de jour restant*/

  $scope.calendarAgendaFormat = function(){
    $state.go('fimu.event-agenda');
  }

})

.controller('EventDetailController', function($scope, $stateParams, EventFactory) {
  $scope.event = EventFactory.get({id:$stateParams.id});
})

.controller('ScenePageController', function($scope, $rootScope, $stateParams, SceneFactory) {
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

.controller('SceneDetailController', function($scope, $rootScope, $stateParams, SceneFactory) {
  $scope.scene = SceneFactory.get({id:$stateParams.id});
  console.log($scope.scene);
})

.controller('SndDrinkPageController', function($scope, $ionicSideMenuDelegate) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('SndPolicyPageController', function($scope, $ionicSideMenuDelegate) {
})
