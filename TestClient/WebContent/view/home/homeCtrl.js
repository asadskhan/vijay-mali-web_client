(function () {

    'use strict';

      // Controller for get GET API
    angular.module('soffrontApp').controller('homeCtrl',  homeCtrl);

    function homeCtrl($scope, $rootScope, $http, $q, $state, config) {
		 $rootScope.tabs = [
            {
                title: 'Home',
                url: 'view/home/home.html'
            }, 
            /*{
                title: 'Sales Template',
                url: 'view/sales/sales-template/sales.html'
            }, */
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
        ];

        $rootScope.currentTab = 'view/home/home-content.html';

        $scope.onClickTab = function (tab) {
            $rootScope.currentTab = tab.url;

        }

        $scope.isActiveTab = function (tabUrl) {
            return tabUrl == $rootScope.currentTab;
        }
         $scope.removeTab = function (index) {
            $rootScope.tabs.splice(index, 1);
           $rootScope.currentTab = 'view/home/home-content.html';
            $scope.tabs.splice(x, 1);
        };

         $scope.addTab = function (tab) {
            $rootScope.tabs.push(
                {
                    title: tab.title,
                    url: tab.url
                } 
            );
        };

    }

})();