(function () {

    'use strict';

    angular.module('reports', []);

})();
(function () {
    'use strict';
    angular.module('reports').controller('reportMenuCtrl', reportMenuCtrl);
    function reportMenuCtrl($scope, $rootScope, reportsDataServices) {

        $scope.reportData = function () {
            reportsDataServices.getReportDetails().then(function (data) {
                $scope.data = data.data;
                $scope.reportNames = data.data.report_names;
                console.log($scope.reportNames);
                // console.log($scope.data);
            })
                .catch(function () {
                    $scope.error = 'data not fount';
                });
        }
        $scope.reportData();

        $scope.reportData = reportsDataServices.getReportDetails();
        // $scope.reportData.data;



        $rootScope.reportTabs = [
            {
                title: 'Activity Report',
                url: 'view/sales/reports/activityReport.html'
            },
            {
                title: 'Conversion Report',
                url: 'view/sales/reports/conversionReport.html'
            },

            {
                title: 'Pipeline Report',
                url: 'view/sales/reports/pipelineReport.html'
            },
            {
                title: 'Call Report',
                url: 'view/sales/reports/callReport.html'
            },
            {
                title: 'Forcast Report',
                url: 'view/sales/reports/forcastReport.html'
            }
        ];

        $rootScope.reportCurrentTab = 'view/sales/reports/activityReport.html';

        $scope.onClickTab = function (tab) {
            $rootScope.reportCurrentTab = tab.url;

        }

        $scope.isActiveTab = function (tabUrl) {
            return tabUrl == $rootScope.reportCurrentTab;
        }
        // $scope.reportData=reportsDataServices.data;
        // console.log($scope.reportData);


    }


})();
(function () {
    'use strict';
    angular.module('reports').controller('activityReportCtrl', activityReportCtrl);
    function activityReportCtrl($scope, $rootScope, reportsDataServices) {

 $scope.myJson = {
      type : 'line',
      series : [
        { values : [54,23,34,23,43] },
        { values : [10,15,16,20,40] },
      ]
  };







        // date and time picker
        $scope.picker3 = {
            date: new Date()
        };
        $scope.picker4 = {
            date: new Date()
        };
        $scope.openCalendar = function (e, picker) {
            $scope[picker].open = true;
        };
        $scope.reportData = function () {
            reportsDataServices.getReportDetails().then(function (data) {
                $scope.data = data.data;
                $scope.reportNames = data.data.report_names;
                // console.log($scope.data);
            })
                .catch(function () {
                    $scope.error = 'data not fount';
                });
        }
        $scope.reportData();

        $scope.reportData = reportsDataServices.getReportDetails();


    }


})();