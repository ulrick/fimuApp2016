angular.module('fimu.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [
	{
		id: 0,
		name: 'Ben Sparrow',
		lastText: 'You on your way?',
		face: 'img/ben.png'
	}, 
	{
		id: 1,
		name: 'Max Lynx',
		lastText: 'Hey, it\'s me',
		face: 'img/max.png'
	}, 
	{
		id: 2,
		name: 'Adam Bradleyson',
		lastText: 'I should buy a boat',
		face: 'img/adam.jpg'
	}, 
	{
		id: 3,
		name: 'Perry Governor',
		lastText: 'Look at my mukluks!',
		face: 'img/perry.png'
	}, 
	{
		id: 4,
		name: 'Mike Harrington',
		lastText: 'This is wicked good ice cream.',
		face: 'img/mike.png'
	}
  ];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('EventFactory', function($resource, apiUrl){
	var data = $resource(apiUrl+'/events/:id', {id: '@id'}, {
      	update:{
          	method:'PUT'
        }
    });

    //var events = data.query();
    return data;

    /*return {

	    allEvents : function() {
	    	return data;
	    },

	    singleEvent : function(event_id){
		    console.log("tet ",data.get(1));
		    return data.get(event_id);
	    },
	    remove: function(event) {
	      events.splice(events.indexOf(event), 1);
	    }
	};*/
})


.factory('SceneFactory', function($resource, apiUrl){
	var data = $resource(apiUrl+'/scenes/:scene_id', {event_id: '@scene_id'}, {
      	update:{
          	method:'PUT'
        }
    });
    return data;
   /* var scenes = data.query();
    return {
	    allScenes : function() {
	    	return data;
	    },

	    singleScene : function(event_id){
		    console.log("tet ",data.get(1));
	    },
	    remove: function(event) {
	      events.splice(events.indexOf(event), 1);
	    }
	};*/
})


;
