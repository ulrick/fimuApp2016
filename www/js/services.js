angular.module('fimu.services', [])

.factory('EventFactory', function($resource, $cacheFactory, apiUrl){
	var EventFactoryCache = $cacheFactory('EventFactory');
	var data = $resource(apiUrl+'/events/:id', {id: '@id'}, {
      	update:{
          method:'PUT'
        },
				get: { 
					method:'GET', 
					cache: EventFactoryCache
				},
				query:{
					method : 'GET', 
					cache: EventFactoryCache, 
					isArray:true
				}
				
    });
		console.log("cache : ",EventFactoryCache);
    return data;
})


.factory('SceneFactory', function($resource, $cacheFactory, apiUrl){
	var SceneFactoryCache = $cacheFactory('SceneFactory');
	var data = $resource(apiUrl+'/scenes/:id', {id: '@id'}, {
      	update:{
          	method:'PUT'
        },
				get: { 
					method:'GET', 
					cache: SceneFactoryCache
				},
				query:{
					method : 'GET', 
					cache: SceneFactoryCache,
					isArray:true
				}
    });
    return data;
})


;
