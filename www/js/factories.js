angular.module('fimu.factory', [])

    .factory('LoaderService', function($ionicLoading, $document, $timeout) {
        return {
            show: function() { //code de la doc ionic
                // Show the loading overlay and text
                $ionicLoading.show({
                    // intitulé
                    templateUrl: "views/partials/loader/_loader.html",
                    // animation à prendre
                    animation: 'fade-in',
                    // l'overlay de fond
                    showBackdrop: true,//false,
                    // Taille max
                    // Le text est coupé si plus long que maxWidth
                    maxWidth: 200,
                    // délai avant l'afficage de l'indicateur
                    showDelay: 100
                });
            },
            hide: function() {
                $ionicLoading.hide();
                //pour pallier au bug de la class loading-active qui ne part pas quand on switch trop vite de state etc...
                $timeout(function() {
                    $document[0].body.classList.remove('loading-active');
                }, 3000);
            }
        };
    })

    /*** /End Loading Factory ***/


    /*** Camera factory ***/
    .factory('Camera', ['$q', function($q) {
            return {
                getPicture: function(options) {
                    var q = $q.defer();

                    navigator.camera.getPicture(function(result) {
                        q.resolve(result);
                    }, function(err) {
                        q.reject(err);
                    }, options);

                    return q.promise;
                }
            };
        }])
    /*** /End camera factory ***/

    /*** Email factory ***/
    .factory('EmailComposer', ['$q', function($q) {
            return {
                sendMail: function(options) {
                    var q = $q.defer();

                    if (window.plugin && window.plugin.email) {
                        window.plugin.email.isServiceAvailable(function(isAvailable) {
                            if (!isAvailable) {
                                q.reject(true);
                            }

                            window.plugin.email.open(options, function() {
                                q.resolve();
                            }, this);
                        });
                    } else {
                        q.reject(false);
                    }

                    return q.promise;
                }
            };
        }]);
/*** /End Email factory ***/