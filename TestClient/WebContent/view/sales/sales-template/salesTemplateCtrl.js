(function () {

    'use strict';

    angular.module('salesTemplate', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.grid', 'ui.grid.autoResize', 'ui.grid.pagination', 'ui.grid.selection']);

})();


(function () {

	var rowData = [];
    'use strict';

    angular.module('salesTemplate').controller('salesTemplatesCtrl', salesTemplatesCtrl);

    function salesTemplatesCtrl($scope, $uibModal, uiGridConstants, salesDataServices, $rootScope, $state) {


        $scope.refresh = function () {
            salesDataServices.getSalesDetails().then(function (data) {
            	 //menu items
            	$scope.menuData=[
            	               {label:'Category',name:'category'},
            	               {label:'Owner',name:'owner'},
            	               {label:'Status',name:'status'}
            	];
                $scope.salesData = data;
                $scope.gridOptions1.data = data.data.records;
            })
                .catch(function () {
                    $scope.error = 'data not fount';
                });
        }
        
        
        /*delete market template code - to delete row of table*/
        $scope.deleteMarketTemplate = function(){
        	var arr=[];
        	
        	console.log("before for loop"+rowData.length);
        	
        	for(var i=0;i<rowData.length;i++)
        		{
        			console.log(" i"+i+"  "+rowData[i].entity.id)
        			arr.push(rowData[i].entity.id);
        		}
        	 rowData.splice(0);
            console.log("after for loop"+rowData.length);
        	salesDataServices.deleteMarketTemplate(arr).then(function(data){
        			$scope.refresh();
        	})
        	 .catch(function () {
                 $scope.error = 'data not fount';
             });
        }
        
 $scope.anotherRefresh = function (group)
        {
        			
        			salesDataServices.getListViewByFieldName(group).then(function (data) {
        				 $scope.salesData = data;
        				 $scope.gridOptions1.data = data.data.records;
              })
                  .catch(function () {
                      $scope.error = 'data not fount';
                  });
        };
        
     // view template according to vikash sir.
        $scope.clickEvent= function(templateName){
        if(templateName==="creatingtemplates"){
        	$state.go('creatingtemplates');
        }else if(templateName==="create_marketing_template_preview_Banner_Promotion_Multiple_Column"){
        	$state.go('create_marketing_template_preview_Banner_Promotion_Multiple_Column');
        }
         
        }
        
        $scope.filterByFieldName = function (fieldName,condition)
        {
        	
        	var groupByCondition = {
        			menu : fieldName,
        			condition : condition
        	};
        	
        	console.log(groupByCondition);
        	salesDataServices.getListViewByCondition(groupByCondition).then(function (data){
        		$scope.gridOptions1.data = data.data.records;
        	}).catch(function (){
        		$scope.error = 'data not found';
        	});
        };

        $scope.refresh();

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
            enableFiltering: true,
            enableFooterTotalSelected: true,
            showGridFooter: true,
            enableSorting: true,
            enableColumnMenus: false,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0
        };

        $scope.gridOptions1.columnDefs = [
            { field: 'name', displayName: 'Name', cellTemplate: '<div class="ui-grid-cell-contents clickable" ng-click="grid.appScope.accountsDetails(row.entity.id)" >{{ row.entity.name}}</div>', },
            { field: 'category', displayName: 'Category' },
            { field: 'owner', displayName: 'Owner' },
            { field: 'created_on', displayName: 'Created on' },
            { field: 'updated_by', displayName: 'Updated By' },
            { field: 'updated_on', displayName: 'Updated On' },
            { field: 'status', displayName: 'Status' },
            { field: 'subject', displayName: 'Subject' }
        ],


            //   $scope.gridOptions1.columnDefs = [{
            //     field: 'name',
            //     name: 'Name',
            //     cellTemplate: '<div class="ui-grid-cell-contents clickable" ng-click="grid.appScope.accountsDetails(row.entity.id)" >{{ row.entity.name}}</div>',
            //     width: 100,
            //     enableFiltering: false
            // }, ];
            $scope.accountsDetails = function (id) {
                // alert(id);
                // view/sales/sales-template
                $rootScope.currentTab = 'view/sales/sales-template/creatingtemplates.html';
            };


        $scope.selectedRows = [];
        $scope.gridOptions1.onRegisterApi = function (gridApi) {
            console.log('onRegisterApi');
            $scope.gridApi = gridApi;
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if (row.isSelected == true) {
                    console.log('this row is selected', row);
                    $scope.selectedRows.push(row);
                    rowData.push(row);
                    //  console.log($scope.selectedRows);
                } else {
                    var index = $scope.selectedRows.indexOf(row);
                    $scope.selectedRows.splice(index, 1);
                    console.log("before slice"+rowData);
                    rowData.splice(index,1);
                    console.log("splice rowData else"+rowData);
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
                        $scope.singleSelect = false;
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
        //   {field: 'first_name', name: 'First Name', cellTemplate:  '<div class="ui-grid-cell-contents clickable" ng-click="grid.appScope.accountsDetails(row.entity.id)" >{{ row.entity.first_name}}</div>', width: 100 , enableFiltering: false},
        // ];

        // $scope.accountsDetails = function(id){
        //     alert(id);
        // };

        $scope.colnameSelected = function (colname) {
            $scope.columnSort = colname;
        }
        	
        $scope.groupSelected = function (group) {
            $scope.groupSort = group;
            $scope.anotherRefresh(group);
        }
        
        $scope.animationsEnabled = true;


        $scope.deleteSalesTemplate = function () {
            console.log('salesTemplate---->editSalesTemplate-->saveSalesTemplate');
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'view/sales/sales-template/deleteSalesTemplate.html',
                // controller: 'deletePopupCtrl',
                // controllerAs: '$ctrl',
                size: 'sm',
                //                resolve: {
                //                    deleteTemplateID: function () {
                //                        return $ctrl.items;
                //                    }
                //                }

            });
        }









    }

})();

(function () {

    'use strict';

    angular.module('salesTemplate').controller('ModalInstanceSalesCtrl', ModalInstanceSalesCtrl);

    function ModalInstanceSalesCtrl($scope, $uibModalInstance, modelType) {

        $scope.ok = function () {
            $uibModalInstance.close('open');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();


(function () {

    'use strict';

    angular.module('salesTemplate').controller('createSalesTemplatesCtrl', createSalesTemplatesCtrl);

    function createSalesTemplatesCtrl($scope, $uibModal, salesDataServices) {

        $scope.tempObject = [{
            "title": "Personalize",
        }],

            $scope.refresh = function () {
                salesDataServices.createSalesDetails().then(function (data) {
                    $scope.newSalesData = data;
                    angular.forEach(data.data.available_mail_merge_fields, function (value, key) {
                        angular.forEach(value, function (value, key) {
                            $scope.tempObject.push({
                                "title": value,
                            });
                        });
                    });
                })
                    .catch(function () {
                        $scope.error = 'data not fount';
                    });
            }
        $scope.refresh();

        $scope.saveSalesTemplate = function (id) {
            salesDataServices.saveSalesDetails(id);
        }
    }

})();


(function () {

    'use strict';

    angular.module('salesTemplate').controller('editSalesTemplatesCtrl', editSalesTemplatesCtrl);

    function editSalesTemplatesCtrl($scope, $uibModal, salesDataServices) {

        $scope.tempObject = [{
            "title": "Personalize",
        }],
            $scope.copySaleTemplate = function () {
                console.log('copySaleTemplate');
                $scope.hideButton = false;
                console.log($scope.hideButton);


            };
        $scope.mailMarges = ['Addres1', 'Address2', 'Address3'];

        //        Add mailmarage start
        $scope.addMailMarge = function () {
            console.log('editSalesTemplateCtrl addMailMarge');
            var arrray = [];
            arrray.push(document.getElementById("myText").value);
            console.log(arrray);
            arrray.push($scope.selectedData);
            //            arrray.join();
            document.getElementById("myText").value = arrray.join(',');
        }
        $scope.refresh = function () {
            salesDataServices.createSalesDetails().then(function (data) {
                $scope.newSalesData = data;
                angular.forEach(data.data.available_mail_merge_fields, function (value, key) {
                    angular.forEach(value, function (value, key) {
                        $scope.tempObject.push({
                            "title": value,
                        });
                    });
                });
            })
                .catch(function () {
                    $scope.error = 'data not fount';
                });
        }
        $scope.test = function () {
            console.log('salesTemplate---->editSalesTemplate-->test');
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'view/sales/sales-template/testMail.html',
                controller: 'testMailCtrl',
                size: 'md',
                //                resolve: {
                //                    deleteTemplateID: function () {
                //                        return $ctrl.items;
                //                    }
                //                }

            });
        }


        $scope.refresh();

        $scope.saveSalesTemplate = function (id) {
            salesDataServices.saveSalesDetails(id);
        }
    }

})();
(function () {

    'use strict';

    angular.module('salesTemplate').controller('copySalesTemplatesCtrl', copySalesTemplatesCtrl);

    function copySalesTemplatesCtrl($scope, $uibModal, salesDataServices) {

        $scope.tempObject = [{
            "title": "Personalize",
        }],

            $scope.refresh = function () {
                salesDataServices.createSalesDetails().then(function (data) {
                    $scope.newSalesData = data;
                    angular.forEach(data.data.available_mail_merge_fields, function (value, key) {
                        angular.forEach(value, function (value, key) {
                            $scope.tempObject.push({
                                "title": value,
                            });
                        });
                    });
                })
                    .catch(function () {
                        $scope.error = 'data not fount';
                    });
            }
        $scope.refresh();

        $scope.saveSalesTemplate = function (id) {
            salesDataServices.saveSalesDetails(id);
        }
    }

})();
(function () {

    'use strict';

    angular.module('salesTemplate').controller('testMailCtrl', testMailCtrl);

    function testMailCtrl($scope, $uibModal) {
        $scope.checkSpam = function (ticked) {
            console.log(ticked);
            if ($scope.checked == 'true') {
                console.log('checked True');
                $scope.spamCheck = true;
                $scope.sendTo = 'ravi@inflexonpoint.com';
            } else {
                console.log('checked false');
            }
        }
        $scope.sendMail = function () {
            console.log('salesTemplate---->editSalesTemplate-->sendMail()');
            if ($scope.sendTo == '' || $scope.sendTo == null) {
                alert('please enter email address');
            } else {

                var input_param = {
                    "template_name": "Template-001",
                    "to_email": $scope.sendTo,
                    "is_check_spam": $scope.spamCheck
                }
                var authToken = "'" + token.value + "'";
                console.log(authToken);
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://testapi.snapshotcrm.com/v3/salestemplates/testemail",
                    "method": "POST",
                    "headers": {
                        "authentication": { "token": authToken },
                        "content-type": "application/json",
                    }
                }

                $.ajax(settings).done(function (response) {
                    console.log(response);
                });
            }
        }

    }

})();