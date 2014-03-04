'use strict'
app.value('toastr', toastr);

app.value('identity', {}); // pt login

app.factory('contacts', function(){
    return[
        {"firstName": "Angelica", "lastName": "Britt", "phone": "183-123-53"},
        {"firstName": "Angelica", "lastName": "Britt", "phone": "183-123-53"},
        {"firstName": "Angelica", "lastName": "Britt", "phone": "183-123-53"},
        {"firstName": "Angelica", "lastName": "Britt", "phone": "183-123-53"},
        {"firstName": "Angelica", "lastName": "Britt", "phone": "183-123-53"},
        {"firstName": "Angelica", "lastName": "Britt", "phone": "183-123-53"},
        {"firstName": "Angelica", "lastName": "Britt", "phone": "183-123-53"}
    ]
})

    .factory('accountService', function($http, $resource, $q){
        var resource = $resource('/ExampleMaven/rest/account');
        return{
            getAll: function(){
                var deferred = $q.defer();
                resource.query(
                    function(data){
                        deferred.resolve(data);
                    },
                    function(response){
                        deferred.reject(response);
                    }
                );
                console.log('resource - array :: ', resource.query());
                console.log('q-promise - then(data) :: ', deferred.promise);
                console.log('http - success(data) :: ', $http.get('/ExampleMaven/rest/account'));
//                return deferred.promise;
                return resource.query();
            },
            save: function(data){
                var deferred = $q.defer();
                resource.save(data,
                    function(response){
                        deferred.resolve(response);
                    },
                    function(response){
                        deferred.reject(response);
                    }
                )
                return deferred.promise;
            }
        }
    })

    .factory('personService', function(Restangular){
        console.log('Restangular.all  :: ',Restangular.all('person'));
        return Restangular.all('person');
    })

    .factory('notifier', function(toastr){
        return{
            notify: function(msg){
                toastr.success(msg);
            },
            notifyDelete: function(msg){
                toastr.warning(msg);
            }
        }
    })

