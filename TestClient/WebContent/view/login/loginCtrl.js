(function () {

    'use strict';

      // Controller for get GET API
    angular.module('soffrontApp').controller('loginCtrl', loginCtrl);

    function loginCtrl($scope, $rootScope , $http, $q, $state, config, $localStorage, $sessionStorage, $window) {
		
		$scope.submitForm = function(isValid) {

			 console.log($scope.user);

	
			if (isValid) { 
				
				var configHeader = {
					headers: {
	                    dataType: 'josnp',
	                    contentType: 'application/json; charset=utf-8',
	                    Authentication: JSON.stringify($scope.user)
	                }
				}

				var deferred = $q.defer();

				$http.get(config.api +"get", configHeader).success(function(data) {
		            deferred.resolve(data);	            

		            if (data.status==0) {		            
                		$sessionStorage.SessionToken = {token: data.data.token };  
	                    $state.go('home');
		            }

		        })
		        .error(function() {
		            deferred.reject();
		        });
			    
			    return deferred.promise;

			}

		};
    	
    }

})();