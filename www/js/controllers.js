angular.module('fimu.controllers', [])
  /**
   * Controlleur du menu de droite
   */
  .controller('NavController', function ($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function () {
      //$ionicSideMenuDelegate.toggleRight();
    };
  })

  
  /**
   * Controlleur de la page d'accueil
   */
  .controller('AccueilPageController', function ($scope, $rootScope, $interval, $timeout, $ionicModal, $ionicSideMenuDelegate, festivalDates, $ionicSlideBoxDelegate, $notification) {
    
     //Home video
    $scope.clipSrc = 'img/fimu_video2.webm';
    $scope.myPreviewImageSrc = 'img/visuel_fimu_2016.jpg';
    var vid = document.getElementById("fimuVideo");
    $rootScope.stopVideo = function () {
      vid.pause();
    }
    $rootScope.playVideo = function () {
      vid.play();
    }
    
    var dateFestivalStart = festivalDates.dateStart;
    var dateFestivalEnd = festivalDates.dateEnd;
    $scope.isVisibleRemaningTime = false;
    $scope.isFestivalEnd = false;
    
    if (moment(new Date()) < moment(dateFestivalStart)) {
      $scope.isVisibleRemaningTime = true;
      /* Afficahe du nombre de jour restant avant le début du festival */
      var remaningDays = moment(dateFestivalStart).diff(moment(new Date()));
      var stop;
      $rootScope.duration = {};
      stop = $interval(
        function () {
          remaningDays = remaningDays - 1000; //soustraire une seconde du temps restant
          $rootScope.duration.days = moment.duration(remaningDays).days()
          $rootScope.duration.hours = moment.duration(remaningDays).hours();
          $rootScope.duration.minutes = moment.duration(remaningDays).minutes();
          $rootScope.duration.seconds = moment.duration(remaningDays).seconds();
          console.log("date ",remaningDays);
          if(remaningDays < 0) {
            $scope.isVisibleRemaningTime = false;
            $ionicSlideBoxDelegate.start();
            $ionicSlideBoxDelegate.slide(0);
            $ionicSlideBoxDelegate.update();
            $scope.evenementActuel();
            $scope.stopCountTime();
          }
          //$scope.$apply();
        },
        1000
      );
    }
    else if(moment(new Date()) > moment(dateFestivalEnd)){
      $scope.isVisibleRemaningTime = false;
      $scope.isFestivalEnd = true;
    }
    
    $scope.stopCountTime = function() {
      if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        stop = undefined;
      }
    };

    $scope.evenementActuel = function(){
      var query = $rootScope.allEvents; //Récupération des ressources du webSevice
      $scope.todayDay = moment(new Date()).format('dddd');//Affiche Le jour d'aujourd'hui en lettre "lundi"
      query.$promise.then(function (data) {
        angular.forEach(data, function (event) {
          event.day = moment(event.date_start).format('dddd'); //dddd affiche le nom complet du jour
          event.startTime = moment(event.date_start).format('HH:mm');
          event.endTime = moment(event.date_end).format('HH:mm');
          event.startHours = moment(event.date_start).format('HH');
          event.endHours = moment(event.date_end).format('HH');
          event.style = event.artiste.style;
        });
        
        $scope.events = data;
        /*currentEvent contient la liste des évènement qui ont lieu le jour en cours et dont */
        var currentEvents = _.chain($scope.events)
          .where({ day: $scope.todayDay })
          .filter(function (eventList) {
            return (moment(eventList.date_start) <= moment(new Date())) 
                      && (moment(new Date()) < moment(eventList.date_end));
          })
          .sortBy('date_start')
          .value();
        $scope.events = currentEvents;
        console.log("En cours ", currentEvents);
        
        
        /* Liste des prochains concerts dans l'heure*/
        var nextEvents = _.chain(data)
          .where({ day: $scope.todayDay })
          .filter(function (eventList) {
            return (moment(eventList.date_start) > moment(new Date()))
                    &&(moment(eventList.date_start) <= moment(new Date()).add(1,'hours')) 
                    && (moment(new Date()) < moment(eventList.date_end));
          })
          .sortBy('date_start')
          .value();
        $scope.nextEvents = nextEvents;
        console.log("Dans l'heure3 ", nextEvents);
        
        /*Gestion de la slide box */
        //$timeout(function () {
          $ionicSlideBoxDelegate.start();
          $ionicSlideBoxDelegate.slide(0);
          $ionicSlideBoxDelegate.update();
          //$scope.$apply();
        //},500);
        // $notification.info('Info', 'Glissez pour faire défiler automatiquement les concerts en cours');
      });
    }
    
    $scope.evenementActuel();
    $interval(function(){
      $ionicSlideBoxDelegate.start();
      $scope.evenementActuel();
    },150000);

    
    $scope.doRefresh = function() {
        $scope.evenementActuel();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply();
    };
  })




  /**
   * Controlleur de la page des programmes
   */
  .controller('EventPageController', function ($scope, $rootScope, $interval, $timeout, $stateParams, EventFactory, $ionicSideMenuDelegate, $state, festivalDates) {

    var dateFestivalStart = festivalDates.dateStart; //Date de début du festival
    var dateFestivalEnd = festivalDates.dateEnd;
    $scope.todayDay = moment(new Date()).format('dddd');//Affiche Le jour d'aujourd'hui en lettre "lundi"
    $scope.isVisibleRemaningTime = false;
    //console.log(new Date());

    if (moment(new Date()) <= moment(dateFestivalStart)) {
      $scope.isVisibleRemaningTime = true;
      // Afficahe du nombre de jour restant avant le début du festival
      var remaningDays = moment(dateFestivalStart).diff(moment(new Date()));
      var stop;
      $rootScope.duration = {};
      stop = $interval(
        function () {
          remaningDays = remaningDays - 1000; //soustraire une seconde du temps restant
          $rootScope.duration.days = moment.duration(remaningDays).days()
          $rootScope.duration.hours = moment.duration(remaningDays).hours();
          $rootScope.duration.minutes = moment.duration(remaningDays).minutes();
          $rootScope.duration.seconds = moment.duration(remaningDays).seconds();
          if(remaningDays < 0) {
            $scope.isVisibleRemaningTime = false;
            $scope.comingEvents();
            $scope.stopCountTime();
          }
          //$scope.$apply();
        },
        1000
      );
      //Fin nombre de jour restant
    }
    else if(moment(new Date()) > moment(dateFestivalEnd)) {
      $scope.isVisibleRemaningTime = false;
      $scope.isFestivalEnd = true;
    }
    
    $scope.stopCountTime = function() {
      if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        stop = undefined;
      }
    };
    
    $scope.comingEvents = function(){
      var query = EventFactory.query();
      var eventsPromiseList = [];
      $scope.events = [];
      query.$promise.then(function (data) {
        angular.forEach(data, function (event) {
          event.day = moment(event.date_start).format('dddd'); //dddd affiche le nom complet du jour
          event.startTime = moment(event.date_start).format('HH:mm');
          event.endTime = moment(event.date_end).format('HH:mm');
          event.style = event.artiste.style;
          eventsPromiseList.push(event);
        });
        $scope.events = data;

        /*currentEvent contient la liste des évènement qui ont lieu le jour en cours et dont */
        var todayComingEvents = _.chain(eventsPromiseList)
          .where({ day: $scope.todayDay })
          .filter(function (eventList) {
            //console.log("heure event",moment().diff(eventList.date_end,'hours'));
            return moment().diff(eventList.date_end) < 0;
          }).value();
        $scope.events = todayComingEvents;
        console.log("A venir ", todayComingEvents);
      });
    }
    $scope.comingEvents();
    
    $interval(function(){
      $scope.comingEvents();
    },900000); //exécuter toutes les 
    
    $scope.doRefresh = function() {
        $scope.comingEvents();
        $scope.$broadcast('scroll.refreshComplete');
        //$scope.$apply();
    };

    $scope.calendarAgendaFormat = function () {
      $state.go('fimu.event-agenda');
    }

  })

  .controller('EventDetailController', function ($scope, $stateParams, EventFactory) {
    $scope.event = EventFactory.get({ id: $stateParams.id });
  })

  .controller('ScenePageController', function ($scope, $rootScope, $stateParams, SceneFactory) {
    var query = SceneFactory.query();
    var scenesPromiseList = [];
    $scope.scenes = [];
    query.$promise.then(function (data) {
      angular.forEach(data, function (scene) {
        scenesPromiseList.push(scene);
      });
      $scope.scenes = data;
      console.log("controller ", scenesPromiseList);
    });

  })

  .controller('SceneDetailController', function ($scope, $rootScope, $stateParams, SceneFactory) {
    $scope.scene = SceneFactory.get({ id: $stateParams.id });
    //console.log($scope.scene);
  })


  .controller('SceneEventsController', function ($scope, $rootScope, $stateParams, SceneEventsFactory) {
    var query = SceneEventsFactory.query();
    console.log("tevent 2 ", query);
    var sceneEventsPromiseList = [];
    $scope.sceneEvents = [];
    //$scope.todayDay = moment(new Date()).format('dddd');//Affiche Le jour d'aujourd'hui en lettre "lundi"
    query.$promise.then(function (data) {
      angular.forEach(data, function (scene) {
        scene.day = moment(scene.date_start).format('dddd'); //dddd affiche le nom complet du jour
        scene.startTime = moment(scene.date_start).format('HH:mm');
        scene.endTime = moment(scene.date_end).format('HH:mm');
        scene.style = scene.artiste.style;
        sceneEventsPromiseList.push(scene);
      });
      $scope.sceneEvents = data;
      console.log("tevent 2 ", $scope.sceneEvents);
      // _.groupBy(data, function(scene){return $scope.sceneEvents.scene.name});
      //console.log("tevent 2 ", $scope.sceneEvents);
    });
  })



  .controller('MapPageController', function ($scope, NgMap, googleMapsUrl, $ionicSideMenuDelegate, SceneFactory) {
    $scope.googleMapsUrl = googleMapsUrl;
    var query = SceneFactory.query();

    //$scope.todayDay = moment(new Date()).format('dddd');//Affiche Le jour d'aujourd'hui en lettre "lundi"
    
    $scope.positionsGPS = new Array();
   
    var coordonneGPS = {
        position: [47.6, 6.8],
        name: "Belfort",
        id:null
      };

    query.$promise.then(function (data) {
      angular.forEach(data, function (scene) {
        scene.position = [];
        scene.position[0] = scene.latitude;
        scene.position[1] = scene.longitude;
        scene.name = scene.name;
        scene.id = scene.id;
        coordonneGPS = scene;
        $scope.positionsGPS.push(coordonneGPS);      
      });
    
      console.log("positions ", $scope.positionsGPS);

      NgMap.getMap().then(function (map) {
        $scope.pos = $scope.positionsGPS[0];
        
        $scope.showDetail = function (e, pos) {
          $scope.pos = pos;
          map.showInfoWindow('foo-iw', $scope.pos.id);
        };
        
        $scope.hideDetail = function () {
          map.hideInfoWindow('foo-iw');
        };
      });
    });

  })

  .controller('SndPolicyPageController', function ($scope, $ionicSideMenuDelegate) {
  })
