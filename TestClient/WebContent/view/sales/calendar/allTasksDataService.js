(function () {

    'use strict';
    // Service for get GET API
    angular.module('calendar').factory('allTasksDataServices', allTasksDataServices);

    function allTasksDataServices($q, $http, config, $sessionStorage) {

        var obj = {};

        var configHeader = {
            headers: {
                Authentication: JSON.stringify($sessionStorage.SessionToken)
            }
        }

        obj.getAccountsDetails = function () {

            var deferred = $q.defer();

            $http.get(config.apiAllTask + "get/listview", configHeader).success(function (data) {
                deferred.resolve(data);
            })
            .error(function () {
                deferred.reject();
            });

            return deferred.promise;

        }

        return obj;
    }

})();