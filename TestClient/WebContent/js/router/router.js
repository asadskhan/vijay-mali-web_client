 (function () {

     'use strict';

      // Controller for get GET API
     angular.module('soffrontApp').config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/login');
      
      $stateProvider          
          // HOME STATES AND NESTED VIEWS ========================================
          .state('home', {
              url: '/home',
              templateUrl: 'view/home/home.html',
              controller  : 'homeCtrl',
          })          
          .state('login', {
              url: '/login',
              templateUrl: 'view/login/login.html',
              controller  : 'loginCtrl',
          })
          //  All Sales------ >>  sales Template related states will be here
          .state('accounts', {
              url: '/accounts',
              templateUrl: 'view/sales/accounts/accounts.html',
              controller  : 'accountsCtrl',
          })
         .state('viewSaleTemplate', {
             url: '/viewSalesTemplate',
             templateUrl: 'view/sales/sales-template/viewSalesTemplate.html',
             controller: 'viewSalesTemplateCtrl'
         })
        .state('editSalesTemplate', {
            url: '/sales/sales-template/editSalesTemplate',
            templateUrl: 'view/sales/sales-template/editSalesTemplate.html',
            controller: 'editSalesTemplateCtrl'
        })

              //All Calendar --- >> calendar related states will be here

        .state('pendingTask', {
            url: '/sales/calendar/pendingTask',
            templateUrl: 'view/sales/calendar/pendingTask.html',
            controller: 'calendarCtrl'
        });

          
      });   

 })();



