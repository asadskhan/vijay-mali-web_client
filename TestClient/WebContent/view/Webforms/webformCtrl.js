(function () {

	'use strict';

	// Controller for get GET API
	angular.module('soffrontApp').controller('webformCtrl',  webformCtrl);

	function webformCtrl($scope, $rootScope, $http, $q, $state, config) {
		$rootScope.tabs = [
            
            {
                title: 'Webforms',
                url: 'view\Webforms\webform.html'
            }
        ];

		$rootScope.currentTab = 'view\Webforms\webform.html';

		$scope.onClickTab = function (tab) {
			$rootScope.currentTab = tab.url;

		}

		$scope.isActiveTab = function (tabUrl) {
			return tabUrl == $rootScope.currentTab;
		}
		$scope.removeTab = function (index) {
			$rootScope.tabs.splice(index, 1);
			if($rootScope.tabs.lenght==0){
				$rootScope.currentTab =' view\Webforms\webform.html';    	
			}            
			$rootScope.currentTab = $rootScope.tabs[0].url;
		};

		$scope.addTab = function (tab) {
			
				var keepGoing=true;
				var pushMe=true;
				angular.forEach($rootScope.tabs,function(value,key){
					if(keepGoing){
						if(!angular.equals(value.title,tab.title)){
							pushMe=true;
						}else{
							keepGoing=false;
							pushMe=false;
						}
					}
				});

			if(pushMe){
				$rootScope.tabs.push(
						{
							title: tab.title,
							url: tab.url
						} 
				);
			}
		};

	}

})();