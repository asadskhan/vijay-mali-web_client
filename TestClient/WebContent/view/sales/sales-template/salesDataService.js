(function () {

     'use strict';
      // Service for get GET API
     angular.module('account').factory('salesDataServices', salesDataServices);

     function salesDataServices($q, $http,$httpParamSerializer, config,  $sessionStorage) {
      
        var obj = {};

        var configHeader = {
          headers: {
              		Authentication: JSON.stringify($sessionStorage.SessionToken)
          		}
        }

        obj.getSalesDetails = function(){
            
          var deferred = $q.defer();
          $http.get(config.apiMarketinTemplate +"get/listview", configHeader).success(function(data) {
              deferred.resolve(data);
            })
            .error(function() {
              deferred.reject();
            });          
            return deferred.promise;
        }

      
        /*marketing template list view api call with parameter start*/
        obj.getListViewByFieldName = function(fieldName){
       	var dataField = $httpParamSerializer(
        			{
        				input_param:{
        					"group_by_field_name": fieldName.label
        				}
        			}
        			);
            var deferred = $q.defer();
            $http.get(config.apiMarketinTemplate +"get/listview?"+dataField,configHeader).success(function(data) {
                deferred.resolve(data);
              })
              .error(function() {
                deferred.reject();
              });          
              return deferred.promise;
          }
        
    /*    parameter call end here*/
        
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