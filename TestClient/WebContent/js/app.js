(function () {

     'use strict';
     
      angular.module('soffrontApp', [ 'ui.router','zingchart-angularjs', 'ngAnimate', 'ngSanitize',  'ui.bootstrap', 'account', 'ngStorage', 'angular-loading-bar', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'salesTemplate','calendar','opportunities','reports']);

 })();

 (function () {

    'use strict';
     
    angular.module('soffrontApp').run(function($rootScope, $state) {
        $rootScope.$on('$stateChangeError', console.log.bind(console));
        $rootScope.$state = $state;
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
    })

 })();

  (function () {

    'use strict';
     
    angular.module('soffrontApp').config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	    cfpLoadingBarProvider.includeBar = false;
    }])

 })();


  (function () {

    'use strict';
     
    angular.module('soffrontApp').directive('ckEditor', function () {
      return {
        require: '?ngModel',
        link: function (scope, elm, attr, ngModel) {
          var ck = CKEDITOR.replace(elm[0]);
          if (!ngModel) return;
          ck.on('instanceReady', function () {
            ck.setData(ngModel.$viewValue);
          });
          function updateModel() {
            scope.$apply(function () {
              ngModel.$setViewValue(ck.getData());
            });
          }
          ck.on('change', updateModel);
          ck.on('key', updateModel);
          ck.on('dataReady', updateModel);

          ngModel.$render = function (value) {
            ck.setData(ngModel.$viewValue);
          };
        }
      };
    });


 })();
