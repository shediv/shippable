'use strict';

/* Controllers */

angular.module('angularRestfulAuth')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function($rootScope, $scope, $location, $localStorage, Main) {

        //Login User
        $scope.signin = function() {
            $scope.url = $scope.url.replace("https://github.com/", "");           

            Main.signin($scope.url, function(res) {
                    console.log(res.last7daysDataCount);                    
                    $scope.above7daysData = res.above7daysData;
                    $scope.last7daysData = res.last7daysData;
                    $scope.last24hoursData = res.last24hoursData;

                    $scope.above7days = res.above7daysDataCount;
                    $scope.last7days = res.last7daysDataCount;
                    $scope.last24hours = res.last24hoursDataCount;
                    $scope.count = res.count;                                      
                    $location.path('/')                                
            }, function() {
                $rootScope.error = 'Failed to signin';
            })
        };
    }])

.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function($rootScope, $scope, $location, Main) {

        Main.me(function(res) {
            $scope.myDetails = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        })
}]);
