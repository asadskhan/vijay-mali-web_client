(function() {

  'use strict';

  angular.module('account', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.grid', 'ui.grid.autoResize', 'ui.grid.pagination', 'ui.grid.selection','ui.select']);

})();


(function() {

  'use strict';

  angular.module('account').controller('accountsCtrl', accountsCtrl);

  function accountsCtrl($scope, $rootScope, $uibModal, accountsDataServices, uiGridConstants) {

   $rootScope.accountDetailsTabs = [
   {
    title: 'Notes',
    url: 'view/sales/accounts/contact.html'
  }, 
  {
    title: 'Appointment',
    url: 'view/sales/sales-template/sales.html'
  },
  {
    title: 'Contact',
    url: 'view/sales/sales-template/sales1.html'
  }, 
  {
    title: 'Cases',
    url: 'view/sales/sales-template/sales2.html'
  },  
  {
    title: 'Attachment',
    url: 'view/sales/sales-template/sales3.html'
  }, 
  {
    title: 'Group',
    url: 'view/sales/sales-template/sales4.html'
  }
  ];

  $scope.visible = false;
  $scope.toggle = function () {
      $scope.visible = !$scope.visible;
  };


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

  $rootScope.accountDetailCurrentTab = 'view/sales/accounts/contact.html';

  $scope.onClickTab = function (tab) {
    $rootScope.accountDetailCurrentTab = tab.url;

  }

  $scope.isActiveTab = function (tabUrl) {
    return tabUrl == $rootScope.accountDetailCurrentTab;
  }

  $scope.class = "none";
  $scope.clickTwit = function(){
    $scope.classGp = "none";
    $scope.classFb = "none";

    if ($scope.class === "none")
      $scope.class = "block";
    else
      $scope.class = "none";
  };

  $scope.classFb = "none";
  $scope.clickFb = function(){
    if ($scope.classFb === "none")
      $scope.classFb = "block";
    else
      $scope.classFb = "none";
  };

  $scope.classGp = "none";
  $scope.clickGp = function(){
    $scope.class = "none";
    $scope.classFb = "none"
    if ($scope.classGp === "none")
      $scope.classGp = "block";
    else
      $scope.classGp = "none";
  };

  $scope.CloseMe = function(){
    $scope.class = "none";
    $scope.classGp = "none";
    $scope.classFb = "none";
  }

  $scope.getTableHeight = function() {
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
          $scope.gridOptions1.onRegisterApi = function(gridApi) {
            console.log('onRegisterApi');
            $scope.gridApi = gridApi;
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function(row) {
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
            $scope.gridApi.selection.on.rowSelectionChangedBatch($scope, function(row) {
              if (selectAllFlag == false) {
                $scope.gridApi.selection.getSelectedRows().forEach(function(row) {
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

          $scope.getTableHeight = function() {
            var rowHeight = 30; // your row height
            var headerHeight = 30; // your header height
            return {
              height: ($scope.gridOptions1.data.length * rowHeight + headerHeight) + "px"
            };
          };
          
          $scope.gridOptions1.columnDefs = [{
           field: 'first_name',
           name: 'First Name',
           cellTemplate: '<div class="ui-grid-cell-contents clickable" ng-click="grid.appScope.accountsDetails(row.entity.id)" >{{ row.entity.first_name}}</div>',
           width: 100,
           enableFiltering: true
         }, 
         {
           field: 'lead_score',
           name: 'lead Score',
           cellTemplate: '<div class="ui-grid-cell-contents clickable"><img src="images/star0.png" {{ row.entity.lead_score}}</div>',
           width: 100,
           enableFiltering: true,

         }];

         $scope.accountsDetails = function(id) {
            //alert(id);
            $rootScope.currentTab = 'view/sales/accounts/detailsAccountsTemplate.html';
          };

          $scope.refresh = function() {
            accountsDataServices.getAccountsDetails().then(function(data) {
              $scope.accountData = data;
              angular.forEach(data.data.fields, function(value, key) {

                if('first_name' == value.name && 'lead_score' == value.name){
                 console.log(value.name);
                 
               }else{
                 $scope.gridOptions1.columnDefs.push({
                   name: value.name,
                   displayName: value.label,
                   visible: value.is_search
                 });
               }
             });

              $scope.gridOptions1.data = data.data.records;
            })
            .catch(function() {
              $scope.error = 'data not fount';
            });
          }

          $scope.refresh();

          $scope.animationsEnabled = true;

          $scope.createNewAccountsTemplate = function(size) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'view/sales/accounts/addAccountsTemplate.html',
              controller: 'ModalInstanceNewAccountsCtrl',
              size: size,
              resolve: {
                modelType: function() {
                  return 'createNewAccountsTemplate';
                }
              }
            });
          }

          $scope.setupAccountsTemplate = function(size) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'view/sales/accounts/setupAccountsTemplate.html',
              controller: 'ModalInstanceNewAccountsCtrl',
              size: size,
              resolve: {
                modelType: function() {
                  return 'setupAccountsTemplate';
                }
              }
            });
          }

          $scope.addNoteAccountsTemplate = function(size) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'view/sales/accounts/addNoteAccountsTemplate.html',
              controller: 'ModalInstanceNewAccountsCtrl',
              size: size,
              resolve: {
                modelType: function() {
                  return 'addNoteAccountsTemplate';
                }
              }
            });
          }

          $scope.convertAccountsTemplate = function(size) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'view/sales/accounts/convertAccountsTemplate.html',
              controller: 'ModalInstanceNewAccountsCtrl',
              size: size,
              resolve: {
                modelType: function() {
                  return 'convertAccountsTemplate';
                }
              }
            });
          }

          $scope.addGroupAccountsTemplate = function(size) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'view/sales/accounts/addGroupAccountsTemplate.html',
              controller: 'ModalInstanceNewAccountsCtrl',
              size: size,
              resolve: {
                modelType: function() {
                  return 'addGroupAccountsTemplate';
                }
              }
            });
          }

          $scope.workflowAccountsTemplate = function(size) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'view/sales/accounts/workflowAccountsTemplate.html',
              controller: 'ModalInstanceNewAccountsCtrl',
              size: size,
              resolve: {
                modelType: function() {
                  return 'workflowAccountsTemplate';
                }
              }
            });
          }

          $scope.shareWithAccountsTemplate = function(size) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'view/sales/accounts/shareWithAccountsTemplate.html',
              controller: 'ModalInstanceNewAccountsCtrl',
              size: size,
              resolve: {
                modelType: function() {
                  return 'shareWithAccountsTemplate';
                }
              }
            });
          }


          $scope.batchEditAccountsTemplate = function(size) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'view/sales/accounts/batchEditAccountsTemplate.html',
              controller: 'ModalInstanceNewAccountsCtrl',
              size: size,
              resolve: {
                modelType: function() {
                  return 'batchEditAccountsTemplate';
                }
              }
            });
          }


          $scope.assignAccountsTemplate = function(size) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'view/sales/accounts/assignAccountsTemplate.html',
              controller: 'ModalInstanceNewAccountsCtrl',
              size: size,
              resolve: {
                modelType: function() {
                  return 'assignAccountsTemplate';
                }
              }
            });
          }

          $scope.deleteAccountAccountsTemplate = function(size) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'view/sales/accounts/deleteAccountAccountsTemplate.html',
              controller: 'ModalInstanceNewAccountsCtrl',
              size: size,
              resolve: {
                modelType: function() {
                  return 'deleteAccountAccountsTemplate';
                }
              }
            });
          }

          $scope.viewGoogleMapAccountsTemplate = function(size) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'view/sales/accounts/viewGoogleMapAccountsTemplate.html',
              controller: 'ModalInstanceNewAccountsCtrl',
              size: size,
              resolve: {
                modelType: function() {
                  return 'viewGoogleMapAccountsTemplate';
                }
              }
            });
          }

          $scope.generateExcelAccountsTemplate = function(size) {
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'view/sales/accounts/generateExcelAccountsTemplate.html',
              controller: 'ModalInstanceNewAccountsCtrl',
              size: size,
              resolve: {
                modelType: function() {
                  return 'generateExcelAccountsTemplate';
                }
              }
            });
          }


          $scope.addOpportunityDetailPopup=function(size){
            var modalInstance = $uibModal.open({
             animation: $scope.animationsEnabled,
             ariaLabelledBy: 'modal-title',
             ariaDescribedBy: 'modal-body',
             templateUrl: 'view/sales/accounts/addOpportunityDetailPopup.html',
             controller: 'ModalInstanceNewAccountsCtrl',
             size: size,
             resolve: {
               modelType: function() {
                 return 'addOpportunityDetailPopup';
               }
             }
           });
          }

          $scope.openRepeatPopUp=function(val){

           if(val){
             var modalInstance = $uibModal.open({
               animation: $scope.animationsEnabled,
               ariaLabelledBy: 'modal-title',
               ariaDescribedBy: 'modal-body',
               templateUrl: 'view/sales/accounts/addOpportunityDetailRepeatPopup.html',
               controller: 'ModalInstanceNewAccountsCtrl',
               size: 'md',
               resolve: {
                 modelType: function() {
                   return 'addOpportunityDetailPopup';
                 }
               }
             });
           }
         }


         $scope.colnameSelected = function(colname) {
          $scope.columnSort = colname;
        }
        $scope.groupSelected = function(group) {
          $scope.groupSort = group;
        }

      }

    })();

    (function() {

      'use strict';

      angular.module('account').controller('ModalInstanceNewAccountsCtrl', ModalInstanceNewAccountsCtrl);

      function ModalInstanceNewAccountsCtrl($scope, $uibModalInstance, modelType) {

        if(modelType == 'createNewAccountsTemplate'){

        }
        else if(modelType == 'setupAccountsTemplate'){
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
        }
        else if(modelType == 'addNoteAccountsTemplate'){

        }
        else if(modelType == 'convertAccountsTemplate'){

        }
        else if(modelType == 'addGroupAccountsTemplate'){
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

         $scope.addToGroupHereFlag=true;

         $scope.addToGroupHere=function(){
          $scope.addToGroupHereFlag=false;
        }

        $scope.addToGroupHereFlagCancel=function(){
          $scope.addToGroupHereFlag=true;
        }
      }
      else if(modelType == 'workflowAccountsTemplate'){

      }
      else if(modelType == 'shareWithAccountsTemplate'){

      }
      else if(modelType == 'assignAccountsTemplate'){

      }
      else if(modelType == 'deleteAccountAccountsTemplate'){

      }
      else if(modelType == 'viewGoogleMapAccountsTemplate'){

      }
      else if(modelType == 'generateExcelAccountsTemplate'){

      }

      $scope.ok = function() {
        console.log(modelType);
        $uibModalInstance.close('open');
      };

      $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
    }

  })();

  (function() {

    'use strict';

    angular.module('account').controller('editAccountsCtrl', editAccountsCtrl);

    function editAccountsCtrl($scope) {


    }

  })();