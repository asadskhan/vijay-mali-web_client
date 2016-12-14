(function () {

     'use strict';
      // Service for get GET API
     angular.module('reports').factory('reportsDataServices', reportsDataServices);

     function reportsDataServices($q, $http, config,  $sessionStorage) {
      
        var obj = {};

        var configHeader = {
          headers: {
              Authentication: JSON.stringify($sessionStorage.SessionToken)
          }
        }

        obj.getReportDetails = function(){
            
    	    var deferred = $q.defer();

            $http.get(config.apiSalesReports, configHeader).success(function(data) {
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