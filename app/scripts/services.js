'use strict';

angular.module('angularRestfulAuth')
    .factory('Main', ['$http', '$localStorage', function($http, $localStorage){
        return {
            //Create User
            signin: function(data, success, error) {
                $http.get('/issues?urlSlug='+data).
                    success(success).error(error)
            }            
        };
    }
]);