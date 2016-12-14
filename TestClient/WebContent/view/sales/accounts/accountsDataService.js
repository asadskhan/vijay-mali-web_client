(function () {

     'use strict';
      // Service for get GET API
     angular.module('account').factory('accountsDataServices', accountsDataServices);

     function accountsDataServices($q, $http, config,  $sessionStorage) {
      
        var obj = {};

        var configHeader = {
          headers: {
              Authentication: JSON.stringify($sessionStorage.SessionToken)
          }
        }

        obj.getAccountsDetails = function(){
            
    	    var deferred = $q.defer();

            $http.get(config.apiAccount +"get/listview", configHeader).success(function(data) {
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