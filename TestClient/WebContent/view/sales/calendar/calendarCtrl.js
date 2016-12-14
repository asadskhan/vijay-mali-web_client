var calendar = angular.module('calendar', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.select', 'ui.bootstrap.datetimepicker']);

calendar.controller('calendarTabViewCtrl', ['$scope', function ($scope) {
    console.log('calendarTabViewCtrl');
    $scope.calendarTabs = [{
        title: 'Calendar',
        url: 'view/sales/calendar/calendarSchedular.html'
    },
    {
        title: 'All Appointments',
        url: 'view/sales/calendar/allAppointment.html'
    },
    {
        title: 'Pending Tasks',
        url: 'view/sales/calendar/pendingTask.html'
    },
    {
        title: 'All Tasks',
        url: 'view/sales/calendar/allTasks.html'
    }
    ];


    $scope.calendarTabUrl = 'view/sales/calendar/pendingTask.html';
    $scope.onClickTab = function (tab) {
        console.log('onClick');
        $scope.calendarTabUrl = tab.url;
        console.log(tab.url);
    }
    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.calendarTabUrl;
    }
}]);

//controller for calendar -> pending task start

calendar.controller('pendingTaskCtrl', function ($scope, $uibModal, pendingTaskDataServices) {
    console.log('inside pending task controller');



    $scope.upcoming = [];
    $scope.overdue = [];
    $scope.today = [];

    $scope.refresh = function () {
        pendingTaskDataServices.getAccountsDetails().then(function (data) {
            console.log(data);
            $scope.accountData = data;
            $scope.groupBy = data.group_by

            angular.forEach(data.data.records, function (value, key) {

                var currentDate = new Date();
                var formattedCurrentDate = moment(new Date()).format('YYYY-MM-DD hh:mm');
                console.log(formattedCurrentDate);
                console.log(value.t_dueby);
                if (value.t_dueby > formattedCurrentDate) {
                    //upcoming
                    console.log('upcoming');
                    $scope.upcoming.push({
                        t_dueby: value.t_dueby
                    });
                }
                else if (value.t_dueby < formattedCurrentDate) {
                    console.log('overdue');
                    $scope.overdue.push({
                        t_dueby: value.t_dueby
                    });
                }
                else {
                    console.log('today');
                    $scope.today.push({
                        t_dueby: value.t_dueby
                    })
                }


                //$scope.gridOptions1.columnDefs.push(
                //    {
                //        name: value.name, displayName: value.label, visible: value.is_search
                //    }
                //);
            });

            //angular.forEach(data.data.fields, function (value, key) {

            //    $scope.gridOptions1.columnDefs.push(
            //        {
            //            name: value.name, displayName: value.label, visible: value.is_search
            //        }
            //    );
            //});

            // $scope.gridOptions1.data = data.data.records;
        })
        .catch(function () {
            $scope.error = 'data not fount';
        });
    }

    $scope.refresh();


    $scope.addNote = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/pendingTaskAddNote.html',
            controller: 'pendingTaskAddNoteModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });
    }

    $scope.complete = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/pendingTaskComplete.html',
            controller: 'pendingTaskCompleteModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });
    }

    $scope.forward = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/pendingTaskReschedule.html',
            controller: 'pendingTaskRescheduleModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });
    }

    $scope.delete = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/pendingTaskDelete.html',
            controller: 'pendingTaskDeleteModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });
    }

    $scope.createNewTask = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/pendingTaskNewTask.html',
            controller: 'pendingTaskNewTaskCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });
    }

 $scope.floatButtonShowFlag=false;
 $scope.addNoteFloatFlag=false;

    $scope.selectEntity=function(){
        var count=0;
        for(i=0;i<$scope.overdue.length;i++){
            if($scope.overdue[i].isChecked){
                count++;
            }
        }
       
         if(count == 1){
            $scope.addNoteFloatFlag=true;
             $scope.floatButtonShowFlag=true;
        }
        else if(count > 1){
            $scope.floatButtonShowFlag=true;
            $scope.addNoteFloatFlag=false;
        }
       
        else{
           $scope.floatButtonShowFlag=false;   
           $scope.addNoteFloatFlag=false;
       }
   }

});


calendar.controller('pendingTaskAddNoteModalInstanceCtrl', function ($scope, $uibModalInstance) {
    console.log('inside pendingTaskAddNoteModalInstanceCtrl');


    $scope.ok = function () {
        $uibModalInstance.close('open');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

calendar.controller('pendingTaskCompleteModalInstanceCtrl', function ($scope, $uibModalInstance) {
    console.log('inside pendingTaskCompleteModalInstanceCtrl');


    $scope.ok = function () {
        $uibModalInstance.close('open');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});


calendar.controller('pendingTaskRescheduleModalInstanceCtrl', function ($scope, $uibModalInstance) {
    console.log('inside pendingTaskRescheduleModalInstanceCtrl');

    $scope.rescheduleTypeOptions = ["Next day", "Next week", "Next month", "Days", "Specific date"];
    $scope.rescheduleType = $scope.rescheduleTypeOptions[0];

    $scope.rescheduleChange = function () {

        if ($scope.rescheduleType == 'Days') {
            $scope.rescheduleDayMode = true;
            $scope.rescheduleSpecificDateMode = false;
        }
        else if ($scope.rescheduleType == 'Specific date') {
            $scope.rescheduleSpecificDateMode = true;
            $scope.rescheduleDayMode = false;
        }
        else {
            $scope.rescheduleSpecificDateMode = false;
            $scope.rescheduleDayMode = false;
        }
    }

    $scope.ok = function () {
        $uibModalInstance.close('open');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});


calendar.controller('pendingTaskDeleteModalInstanceCtrl', function ($scope, $uibModalInstance) {

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});


calendar.controller('pendingTaskNewTaskCtrl', function ($scope, $uibModalInstance, $uibModal) {
    // date and time picker
    $scope.picker3 = {
        date: new Date()
    };
    $scope.openCalendar = function (e, picker) {
        $scope[picker].open = true;
    };

    $scope.reminderType = ["Email", "Pop-up"];
    $scope.reminderIn = ["minutes", "hours", "days", "weeks"];

    $scope.user = {
        isReminderRepeat:false,
        reminder: [{ type: $scope.reminderType[0], duration: 10, timein: $scope.reminderIn[0] }, { type: $scope.reminderType[0], duration: 10, timein: $scope.reminderIn[0] }],
    }

    $scope.addReminder = function () {
        $scope.user.reminder.push({ type: $scope.reminderType[0], duration: 10, timein: $scope.reminderIn[0] });
    }

    $scope.deleteReminder = function (val) {
        $scope.user.reminder.splice(val, 1);
    }

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.openRepeatPopUp = function (isChecked) {

        if (isChecked) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'view/sales/calendar/pendingTaskRepeatReminder.html',
                controller: 'pendingTaskRepeatReminderModalInstanceCtrl',
                size: 'md',
                resolve: {
                    username: function () {
                        return 'kkk';
                        //$scope.username;
                    }
                }
            });
        }
    }

});


calendar.controller('pendingTaskRepeatReminderModalInstanceCtrl', function ($scope, $uibModalInstance) {

    $scope.repeatType = ["Daily", "Weekly", "Monthly", "Yearly"];

    $scope.repeatOn = ["M","T","W","T","F","S","S"];

    $scope.repeat = {repeatType:$scope.repeatType[0],repeatEvery:1,repeatOn:$scope.repeatOn[0]};

    // date and time picker
    $scope.picker3 = {
        date: new Date()
    };
    $scope.openCalendar = function (e, picker) {
        $scope[picker].open = true;
    };


    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.weekMode=false;
    $scope.monthMode=false;

    $scope.changeRepeatType=function(val){
        if(val == 'Weekly'){
            $scope.weekMode=true;
            $scope.monthMode=false;
        }
        else if(val == 'Monthly'){
            $scope.monthMode=true;
            $scope.weekMode=false;
        }
    }

});


//controller for calendar -> pending task end

//controller for calendar -> all appointment start

calendar.controller('allAppointmentCtrl', function ($scope, $uibModal, allAppointmentDataServices, uiGridConstants) {
    $scope.getTableHeight = function () {
        var rowHeight = 30; // your row height
        var headerHeight = 30; // your header height
        return {
            height: ($scope.gridData.data.length * rowHeight + headerHeight) + "px"
        };
    };

    $scope.gridOptions1 = {
        rowHeight: 30,
        multiSelect: true,
        enableFooterTotalSelected: true,
        showGridFooter: true,
        enableSorting: true,
        enableColumnMenus: false,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        enableHorizontalScrollbar: 0,
        enableVerticalScrollbar: 0
    };

    $scope.gridOptions1.columnDefs = [];

    $scope.selectedRows = [];
    $scope.gridOptions1.onRegisterApi = function (gridApi) {
        console.log('onRegisterApi');
        $scope.gridApi = gridApi;
        $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            if (row.isSelected == true) {
                console.log('this row is selected', row);
                $scope.selectedRows.push(row);
                //  console.log($scope.selectedRows);
            } else {
                var index = $scope.selectedRows.indexOf(row);
                console.log(index)
                $scope.selectedRows.splice(index, 1);
                $scope.singleSelect = false;
                console.log('this row is unselected', row);
                //  console.log($scope.selectedRows);
            }
            console.log($scope.selectedRows);
            if ($scope.selectedRows.length == 1) {
                console.log('single row is selected');
                $scope.singleSelect = true;
                $scope.multipleSelect = false;
            } else
            if ($scope.selectedRows.length >= 2) {
                $scope.singleSelect = false;
                $scope.multipleSelect = true;

            }

        })
        var selectAllFlag = false;
        $scope.gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
            if (selectAllFlag == false) {
                $scope.gridApi.selection.getSelectedRows().forEach(function (row) {
                    $scope.multipleSelect = true;
                    $scope.singleSelect = true;
                    $scope.selectedRows.push(row);
                });
                selectAllFlag = true;
                console.log('selectAllFlag:', selectAllFlag);
            } else {
                $scope.gridApi.selection.clearSelectedRows();
                selectAllFlag = false;
                $scope.multipleSelect = false;
                $scope.singleSelect = false;
                $scope.selectedRows = [];
            }
            console.log($scope.selectedRows);

        });
    };

    $scope.getTableHeight = function () {
        var rowHeight = 30; // your row height
        var headerHeight = 30; // your header height
        return {
            height: ($scope.gridOptions1.data.length * rowHeight + headerHeight) + "px"
        };
    };

    // $scope.gridOptions1.columnDefs = [
    // { field: 'first_name', name: 'First Name', cellTemplate: '<div class="ui-grid-cell-contents clickable" ng-click="grid.appScope.accountsDetails(row.entity.id)" >{{ row.entity.first_name}}</div>', width: 100, enableFiltering: false },
    // ];

    // $scope.accountsDetails = function (id) {
    //     alert(id);
    // };

    $scope.refresh = function () {
        allAppointmentDataServices.getAccountsDetails().then(function (data) {
            $scope.accountData = data;
            $scope.groupBy = data.group_by
            angular.forEach(data.data.fields, function (value, key) {

                $scope.gridOptions1.columnDefs.push(
                {
                    name: value.name, displayName: value.label, visible: value.is_search
                }
                );
            });

            $scope.gridOptions1.data = data.data.records;
        })
        .catch(function () {
            $scope.error = 'data not fount';
        });
    }

    $scope.refresh();

    $scope.animationsEnabled = true;

    $scope.setupAppointmentTemplate = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/listSetpu.html',
            controller: 'allAppointmentSetUpModalInstanceCtrl',
            controllerAs: '$scope',
            size: size
        });
    }

    $scope.colnames = ['name', 'category', 'subject'];
    $scope.colnameSelected = function (colname) {
        $scope.columnSort = colname;
    }
    $scope.groupSelected = function (group) {
        $scope.groupSort = group;
    }

    $scope.createNewAppointment = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/createNewAllAppointment.html',
            controller: 'createNewAllAppointmentModalInstanceCtrl',
            controllerAs: '$scope',
            size: 'lg',
        });
    }

    $scope.addNote = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/pendingTaskAddNote.html',
            controller: 'allAppointmentAddNoteModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });
    }

    $scope.complete = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/pendingTaskComplete.html',
            controller: 'allAppointmentCompleteModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });
    }

    $scope.forward = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/pendingTaskReschedule.html',
            controller: 'allAppointmentRescheduleModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });
    }

});



calendar.controller('allAppointmentAddNoteModalInstanceCtrl', function ($scope, $uibModalInstance) {
    console.log('inside allAppointmentAddNoteModalInstanceCtrl');


    $scope.ok = function () {
        $uibModalInstance.close('open');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

calendar.controller('allAppointmentCompleteModalInstanceCtrl', function ($scope, $uibModalInstance) {
    console.log('inside allAppointmentCompleteModalInstanceCtrl');


    $scope.ok = function () {
        $uibModalInstance.close('open');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});


calendar.controller('allAppointmentRescheduleModalInstanceCtrl', function ($scope, $uibModalInstance) {
    console.log('inside allAppointmentRescheduleModalInstanceCtrl');

    $scope.rescheduleTypeOptions = ["Next day", "Next week", "Next month", "Days", "Specific date"];
    $scope.rescheduleType = $scope.rescheduleTypeOptions[0];

    $scope.rescheduleChange = function () {

        if ($scope.rescheduleType == 'Days') {
            $scope.rescheduleDayMode = true;
            $scope.rescheduleSpecificDateMode = false;
        }
        else if ($scope.rescheduleType == 'Specific date') {
            $scope.rescheduleSpecificDateMode = true;
            $scope.rescheduleDayMode = false;
        }
        else {
            $scope.rescheduleSpecificDateMode = false;
            $scope.rescheduleDayMode = false;
        }
    }

    $scope.ok = function () {
        $uibModalInstance.close('open');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.picker3 = {
        date: new Date()
    };
    $scope.openCalendar = function (e, picker) {
        $scope[picker].open = true;
    };

});


calendar.controller('createNewAllAppointmentModalInstanceCtrl', function ($scope, $uibModalInstance,$uibModal) {
    console.log('inside createNewAllAppointmentModalInstanceCtrl');

    $scope.picker3 = {
        date: new Date()
    };
    $scope.openCalendar = function (e, picker) {
        $scope[picker].open = true;
    };

    $scope.reminderType = ["Email", "Pop-up"];
    $scope.reminderIn = ["minutes", "hours", "days", "weeks"];

    $scope.user = {
        isReminderRepeat:false,
        reminder: [{ type: $scope.reminderType[0], duration: 10, timein: $scope.reminderIn[0] }, { type: $scope.reminderType[0], duration: 10, timein: $scope.reminderIn[0] }],
    }

    $scope.addReminder = function () {
        $scope.user.reminder.push({ type: $scope.reminderType[0], duration: 10, timein: $scope.reminderIn[0] });
    }

    $scope.deleteReminder = function (val) {
        $scope.user.reminder.splice(val, 1);
    }

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.openRepeatPopUp = function (isChecked) {

        if (isChecked) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'view/sales/calendar/pendingTaskRepeatReminder.html',
                controller: 'pendingTaskRepeatReminderModalInstanceCtrl',
                size: 'md',
                resolve: {
                    username: function () {
                        return 'kkk';
                        //$scope.username;
                    }
                }
            });
        }
    }
    
});


calendar.controller('allAppointmentSetUpModalInstanceCtrl', function ($scope, $uibModalInstance) {
    console.log('inside allAppointmentSetUpModalInstanceCtrl');

    $scope.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];
    $scope.people = [
    { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States', selected: true },
    { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina' },
    { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
    { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador' },
    { name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador' },
    { name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States' },
    { name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia' },
    { name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador' },
    { name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia' },
    { name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia' }
    ];


    $scope.ok = function () {
        $uibModalInstance.close('open');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

//controller for calendar -> all appointment start

//controller for calendar -> schedular start
calendar.controller('calendarSchedularCtrl', function ($scope) {
    console.log('inside calendarSchedularCtrl');
    $scope.events = [
    {
     id: 1, text: "Task A-12458",
     start_date: new Date(2013, 10, 12),
     end_date: new Date(2013, 10, 16)
 },
 {
     id: 2, text: "Task A-83473",
     start_date: new Date(2013, 10, 22),
     end_date: new Date(2013, 10, 24)
 }
 ];

 $scope.scheduler = { date: new Date(2013, 10, 1) };
});

//Directive for calendar schedular start

calendar.directive('dhxScheduler', function () {
    return {
        restrict: 'A',
        scope: false,
        transclude: true,
        template: '<div class="dhx_cal_navline" ng-transclude></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',



        link: function ($scope, $element, $attrs, $controller) {
            //default state of the scheduler
            if (!$scope.scheduler)
                $scope.scheduler = {};
            $scope.scheduler.mode = $scope.scheduler.mode || "month";
            $scope.scheduler.date = $scope.scheduler.date || new Date();

            //watch data collection, reload on changes
            $scope.$watch($attrs.data, function (collection) {
                scheduler.clearAll();
                scheduler.parse(collection, "json");
            }, true);

            //mode or date
            $scope.$watch(function () {
                return $scope.scheduler.mode + $scope.scheduler.date.toString();
            }, function (nv, ov) {
                var mode = scheduler.getState();
                if (nv.date != mode.date || nv.mode != mode.mode)
                    scheduler.setCurrentView($scope.scheduler.date, $scope.scheduler.mode);
            }, true);

            //size of scheduler
            $scope.$watch(function () {
                return $element[0].offsetWidth + "." + $element[0].offsetHeight;
            }, function () {
                scheduler.setCurrentView();
            });

            //styling for dhtmlx scheduler
            $element.addClass("dhx_cal_container");

            //init scheduler
            scheduler.init($element[0], $scope.scheduler.date, $scope.scheduler.mode);
        }
    }
});

calendar.directive('dhxTemplate', ['$filter', function ($filter) {
    scheduler.aFilter = $filter;

    return {
        restrict: 'AE',
        terminal: true,

        link: function ($scope, $element, $attrs, $controller) {
            $element[0].style.display = 'none';

            var template = $element[0].innerHTML;
            template = template.replace(/[\r\n]/g, "").replace(/"/g, "\\\"").replace(/\{\{event\.([^\}]+)\}\}/g, function (match, prop) {
                if (prop.indexOf("|") != -1) {
                    var parts = prop.split("|");
                    return "\"+scheduler.aFilter('" + (parts[1]).trim() + "')(event." + (parts[0]).trim() + ")+\"";
                }
                return '"+event.' + prop + '+"';
            });
            var templateFunc = Function('sd', 'ed', 'event', 'return "' + template + '"');
            scheduler.templates[$attrs.dhxTemplate] = templateFunc;
        }
    };
}]);
//Directive for calendar schedular end

//controller for calendar -> schedular end
calendar.controller('allTasksCtrl', function ($scope, $uibModal, allTasksDataServices, uiGridConstants) {
    console.log('inside allTasksCtrl');
    $scope.getTableHeight = function () {
        var rowHeight = 30; // your row height
        var headerHeight = 30; // your header height
        return {
            height: ($scope.gridData.data.length * rowHeight + headerHeight) + "px"
        };
    };

    $scope.gridOptions1 = {
        rowHeight: 30,
        multiSelect: true,
        enableFooterTotalSelected: true,
        showGridFooter: true,
        enableSorting: true,
        enableColumnMenus: false,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        enableHorizontalScrollbar: 0,
        enableVerticalScrollbar: 0
    };

    $scope.gridOptions1.columnDefs = [];
    $scope.selectedRows = [];

    $scope.gridOptions1.onRegisterApi = function (gridApi) {
        console.log('onRegisterApi');
        $scope.gridApi = gridApi;
        $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            if (row.isSelected == true) {
                console.log('this row is selected', row);
                $scope.selectedRows.push(row);
                //  console.log($scope.selectedRows);
            } else {
                var index = $scope.selectedRows.indexOf(row);
                console.log(index)
                $scope.selectedRows.splice(index, 1);
                $scope.singleSelect = false;
                console.log('this row is unselected', row);
                //  console.log($scope.selectedRows);
            }
            console.log($scope.selectedRows);
            if ($scope.selectedRows.length == 1) {
                console.log('single row is selected');
                $scope.singleSelect = true;
                $scope.multipleSelect = false;
            } else
            if ($scope.selectedRows.length >= 2) {
                $scope.singleSelect = false;
                $scope.multipleSelect = true;

            }

        })
        var selectAllFlag = false;
        $scope.gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
            if (selectAllFlag == false) {
                $scope.gridApi.selection.getSelectedRows().forEach(function (row) {
                    $scope.multipleSelect = true;
                    $scope.singleSelect = true;
                    $scope.selectedRows.push(row);
                });
                selectAllFlag = true;
                console.log('selectAllFlag:', selectAllFlag);
            } else {
                $scope.gridApi.selection.clearSelectedRows();
                selectAllFlag = false;
                $scope.multipleSelect = false;
                $scope.singleSelect = false;
                $scope.selectedRows = [];
            }
            console.log($scope.selectedRows);

        });
    };


    $scope.getTableHeight = function () {
        var rowHeight = 30; // your row height
        var headerHeight = 30; // your header height
        return {
            height: ($scope.gridOptions1.data.length * rowHeight + headerHeight) + "px"
        };
    };

    // $scope.gridOptions1.columnDefs = [
    // { field: 'first_name', name: 'First Name', cellTemplate: '<div class="ui-grid-cell-contents clickable" ng-click="grid.appScope.accountsDetails(row.entity.id)" >{{ row.entity.first_name}}</div>', width: 100, enableFiltering: false },
    // ];

    // $scope.accountsDetails = function (id) {
    //     alert(id);
    // };

    $scope.refresh = function () {
        allTasksDataServices.getAccountsDetails().then(function (data) {
            $scope.accountData = data;
            $scope.groupBy = data.group_by
            angular.forEach(data.data.fields, function (value, key) {

                $scope.gridOptions1.columnDefs.push(
                {
                    name: value.name, displayName: value.label, visible: value.is_search
                }
                );
            });

            $scope.gridOptions1.data = data.data.records;
        })
        .catch(function () {
            $scope.error = 'data not fount';
        });
    }

    $scope.refresh();



    $scope.animationsEnabled = true;

    //$scope.setupAppointmentTemplate = function (size) {
    //    var modalInstance = $uibModal.open({
    //        animation: $scope.animationsEnabled,
    //        ariaLabelledBy: 'modal-title',
    //        ariaDescribedBy: 'modal-body',
    //        templateUrl: 'view/sales/calendar/listSetpu.html',
    //        controller: 'allAppointmentSetUpModalInstanceCtrl',
    //        controllerAs: '$scope',
    //        size: size
    //    });
    //}


    $scope.colnames = ['name', 'category', 'subject'];
    $scope.colnameSelected = function (colname) {
        $scope.columnSort = colname;
    }
    $scope.groupSelected = function (group) {
        $scope.groupSort = group;
    }

    $scope.setupAppointmentTemplate = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/listSetpu.html',
            controller: 'allTasksSetUpModalInstanceCtrl',
            controllerAs: '$scope',
            size: size
        });
    }

    $scope.addNote = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/pendingTaskAddNote.html',
            controller: 'allTasksAddNoteModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });
    }

    $scope.complete = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/pendingTaskComplete.html',
            controller: 'allTasksCompleteModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });
    }

    $scope.forward = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/pendingTaskReschedule.html',
            controller: 'allTasksRescheduleModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });
    }

    $scope.delete = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'view/sales/calendar/pendingTaskDelete.html',
            controller: 'pendingTaskDeleteModalInstanceCtrl',
            size: 'lg',
            resolve: {
                username: function () {
                    return 'kkk';
                    //$scope.username;
                }
            }
        });
    }

});



calendar.controller('allTasksAddNoteModalInstanceCtrl', function ($scope, $uibModalInstance) {
    console.log('inside allTasksAddNoteModalInstanceCtrl');


    $scope.ok = function () {
        $uibModalInstance.close('open');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

calendar.controller('allTasksCompleteModalInstanceCtrl', function ($scope, $uibModalInstance) {
    console.log('inside allTasksCompleteModalInstanceCtrl');


    $scope.ok = function () {
        $uibModalInstance.close('open');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});


calendar.controller('allTasksRescheduleModalInstanceCtrl', function ($scope, $uibModalInstance) {
    console.log('inside allTasksRescheduleModalInstanceCtrl');

    $scope.rescheduleTypeOptions = ["Next day", "Next week", "Next month", "Days", "Specific date"];
    $scope.rescheduleType = $scope.rescheduleTypeOptions[0];

    $scope.rescheduleChange = function () {

        if ($scope.rescheduleType == 'Days') {
            $scope.rescheduleDayMode = true;
            $scope.rescheduleSpecificDateMode = false;
        }
        else if ($scope.rescheduleType == 'Specific date') {
            $scope.rescheduleSpecificDateMode = true;
            $scope.rescheduleDayMode = false;
        }
        else {
            $scope.rescheduleSpecificDateMode = false;
            $scope.rescheduleDayMode = false;
        }
    }

    $scope.ok = function () {
        $uibModalInstance.close('open');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.picker3 = {
        date: new Date()
    };
    $scope.openCalendar = function (e, picker) {
        $scope[picker].open = true;
    };

});



calendar.controller('allTasksSetUpModalInstanceCtrl', function ($scope, $uibModalInstance) {
    console.log('inside allTasksSetUpModalInstanceCtrl');

    $scope.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];
    $scope.people = [
    { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States', selected: true },
    { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina' },
    { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
    { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador' },
    { name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador' },
    { name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States' },
    { name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia' },
    { name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador' },
    { name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia' },
    { name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia' }
    ];


    $scope.ok = function () {
        $uibModalInstance.close('open');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

//controller for calendar all Tasks end

//range filter for creating 1 to 30 for example numbers in selectbox
calendar.filter('range', function () {
    return function (input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i = min; i <= max; i++)
            input.push(i);
        return input;
    };
});