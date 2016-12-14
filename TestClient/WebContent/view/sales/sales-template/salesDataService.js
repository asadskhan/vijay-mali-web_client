(function () {

     'use strict';
      // Service for get GET API
     angular.module('account').factory('salesDataServices', salesDataServices);

     function salesDataServices($q, $http, config,  $sessionStorage) {
      
        var obj = {};

        var configHeader = {
          headers: {
              Authentication: JSON.stringify($sessionStorage.SessionToken)
          }
        }

        obj.getSalesDetails = function(){
            
          var deferred = $q.defer();

            $http.get(config.apiSales +"get/listview", configHeader).success(function(data) {
              deferred.resolve(data);
            })
            .error(function() {
              deferred.reject();
            });
            
            return deferred.promise;

        }

        obj.createSalesDetails = function(){
            
          var deferred = $q.defer();

            $http.get(config.salesAccount +"new", configHeader).success(function(data) {
              deferred.resolve(data);
            })
            .error(function() {
              deferred.reject();
            });
            
            return deferred.promise;

        }

        obj.saveSalesDetails = function(data){
            
           console.log(data);

          var deferred = $q.defer();

            $http.post(config.salesAccount +"save", data, configHeader).success(function(data) {
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