(function () {

	'use strict';

	// Controller for get GET API
	angular.module('soffrontApp').controller('homeCtrl',  homeCtrl);

	function homeCtrl($scope, $rootScope, $http, $q, $state, config) {
		/*$rootScope.tabs = [
            {
                title: 'Home',
                url: 'view/home/home.html'
            }, 
            {
                title: 'Sales Template',
                url: 'view/sales/sales-template/sales.html'
            }, 
            // {
            //     title: 'Edit Template',
            //     url: 'sales/sales-template/editSalesTemplate.html'
            // },
            // {
            //     title: 'create Sales Template',
            //     url: 'sales/sales-template/addSalesTemplate.html'
            // },
            // {
            //     title: 'Calendar /Tasks',
            //     url: 'sales/calendar/calendarModuleView.html'
            // }
            // {
            //     title: 'Accounts',
            //     url: 'view/sales/accounts/account.html'
            // } 
        ];*/

		$rootScope.currentTab = 'view/home/home-content.html';

		$scope.onClickTab = function (tab) {
			$rootScope.currentTab = tab.url;

		}

		$scope.isActiveTab = function (tabUrl) {
			return tabUrl == $rootScope.currentTab;
		}
		$scope.removeTab = function (index) {
			$rootScope.tabs.splice(index, 1);
			if($rootScope.tabs.lenght==0){
				$rootScope.currentTab = 'view/home/home-content.html';    	
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