angular.module('fimu.controllers', [])

.controller('NavController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
	   //$ionicSideMenuDelegate.toggleRight();
  };
})

.controller('AccueilPageController', function($scope, $rootScope, $ionicModal, $ionicSideMenuDelegate, FestivalDateStart, $ionicSlideBoxDelegate, $notification) {
  var dateFestivalStart = FestivalDateStart;
  $scope.todayDay = moment(new Date()).format('dddd');//Affiche Le jour d'aujourd'hui en lettre "lundi"
  
  $scope.isVisibleRemaningTime = false;
  
  if(moment(new Date()) <= moment(dateFestivalStart) ){
    $scope.isVisibleRemaningTime = true;
    
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
  }
  else{
    $scope.isVisibleRemaningTime = false;
  }
  
  /**
   * Home video controller
   */
  $scope.clipSrc = 'img/fimu_video2.webm';
  $scope.myPreviewImageSrc = 'img/visuel_fimu_2016.jpg';
  var vid = document.getElementById("fimuVideo");
  $rootScope.stopVideo = function() {
      vid.pause();
  }
  
  $rootScope.playVideo = function() {
      vid.play();
  }
  /*Fin video controller*/
  
  var query = $rootScope.allEvents;  
  
  query.$promise.then(function(data) {
    angular.forEach(data, function(event) {
      event.day = moment(event.date_start).format('dddd'); //dddd affiche le nom complet du jour
      event.startTime = moment(event.date_start).format('HH:mm');
      event.endTime = moment(event.date_end).format('HH:mm');
      event.startHours = moment(event.date_start).format('HH');
      event.endHours = moment(event.date_end).format('HH');
    });
   
    $scope.events = data;
    //console.log("controller ", eventsPromiseList);
    var currentHour = moment(new Date()).format('HH');
    console.log("hourre  ", currentHour);
    /*currentEvent contient la liste des évènement qui ont lieu le jour en cours et dont */
    var currentEvents = _.chain($scope.events)
      .where({day: $scope.todayDay})
      .filter(function(eventList){
        var heureDebut = parseInt(eventList.startHours);
        var heureFin = parseInt(eventList.endHours);
        var heureActuel = parseInt(currentHour);
        console.log("heure event",heureFin);
        return (heureDebut <= heureActuel) && (heureActuel < heureFin);
      })
      .value();
      $scope.events = currentEvents;
      console.log("Dans l'heure ", currentEvents);
      
      setTimeout(function() {
          $ionicSlideBoxDelegate.slide(0);
          $ionicSlideBoxDelegate.update();
          $scope.$apply();
      });
      
      $notification.info('Info', 'Glissez pour faire défiler automatiquement les concerts en cours');
  });
  
})

.controller('EventPageController', function($scope, $rootScope, $stateParams, EventFactory, $ionicSideMenuDelegate, $state, FestivalDateStart) {
  
  var query = EventFactory.query();
  /*$scope.keys = [];
  $scope.cache = $cacheFactory('cacheId');
  $scope.put = function(key, value) {
    if (angular.isUndefined($scope.cache.get(key))) {
      $scope.keys.push(key);
    }
    $scope.cache.put(key, angular.isUndefined(value) ? null : value);
  };
  console.log("cache 2", $scope.cache)*/
  
  var eventsPromiseList = [];
  $scope.events = []; 
  var dateFestivalStart = FestivalDateStart; //Date de début du festival
  $scope.todayDay = moment(new Date()).format('dddd');//Affiche Le jour d'aujourd'hui en lettre "lundi"
  $scope.isVisibleRemaningTime = false;
  console.log(new Date());
  
  if(moment(new Date()) <= moment(dateFestivalStart) ){
    $scope.isVisibleRemaningTime = true;
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
  }
 
  query.$promise.then(function(data) {
    angular.forEach(data, function(event) {
      event.day = moment(event.date_start).format('dddd'); //dddd affiche le nom complet du jour
      event.startTime = moment(event.date_start).format('HH:mm');
      event.endTime = moment(event.date_end).format('HH:mm');
      eventsPromiseList.push(event);
    });
    $scope.events = data;

    /*currentEvent contient la liste des évènement qui ont lieu le jour en cours et dont */
    var todayComingEvents = _.chain(eventsPromiseList)
      .where({day: $scope.todayDay})
      .filter(function(eventList){
          //console.log("heure event",moment().diff(eventList.date_end,'hours'));
          return moment().diff(eventList.date_end) < 0;
      }).value();
      $scope.events = todayComingEvents;
      console.log("Actuellement ", todayComingEvents);
  });

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


.controller('SceneEventsController', function($scope, $rootScope, $stateParams, SceneEventsFactory) {
  var query = SceneEventsFactory.query();
  console.log("tevent 2 ", query);
  var sceneEventsPromiseList = [];
  $scope.sceneEvents = [];
  $scope.todayDay = moment(new Date()).format('dddd');//Affiche Le jour d'aujourd'hui en lettre "lundi"
  query.$promise.then(function(data) {
    angular.forEach(data, function(scene) {
      scene.day = moment(scene.date_start).format('dddd'); //dddd affiche le nom complet du jour
      scene.startTime = moment(scene.date_start).format('HH:mm');
      scene.endTime = moment(scene.date_end).format('HH:mm');
      sceneEventsPromiseList.push(scene);
    });
    $scope.sceneEvents = data;
   // _.groupBy(data, function(scene){return $scope.sceneEvents.scene.name});
    //console.log("tevent 2 ", $scope.sceneEvents);
  });
})

.controller('SndDrinkPageController', function($scope, $ionicSideMenuDelegate) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('SndPolicyPageController', function($scope, $ionicSideMenuDelegate) {
})
