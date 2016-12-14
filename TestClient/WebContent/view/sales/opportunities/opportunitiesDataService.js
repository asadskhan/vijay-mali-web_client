(function () {

     'use strict';
      // Service for get GET API
     angular.module('opportunities').factory('opportunitiesDataServices', opportunitiesDataServices);

     function opportunitiesDataServices($q, $http, config,  $sessionStorage) {
      
        var obj = {};

        var configHeader = {
          headers: {
              Authentication: JSON.stringify($sessionStorage.SessionToken)
          }
        }

        obj.getAccountsDetails = function(){
            
    	    var deferred = $q.defer();

            $http.get(config.apiOpportunities +"get/listview", configHeader).success(function(data) {
              deferred.resolve(data);
            })
            .error(function() {
              deferred.reject();
            });
            
            return deferred.promise;

        }

        return obj; 
     }    

 })();