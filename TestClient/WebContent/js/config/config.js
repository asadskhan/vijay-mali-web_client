(function() {
    'use strict';

    angular.module('soffrontApp')
        .constant('config', {
            api: "https://testapi.snapshotcrm.com/v3/token/",
            apiAccount: "https://testapi.snapshotcrm.com/v3/accounts/" ,
            apiSales: "https://testapi.snapshotcrm.com/v3/salestemplates/",
            apiAppointment: "https://testapi.snapshotcrm.com/v3/appointments/",
            apiPendingTask: "https://testapi.snapshotcrm.com/v3/tasks/",
            apiAllTask: "https://testapi.snapshotcrm.com/v3/tasks/",
            apiOpportunities:"https://testapi.snapshotcrm.com/v3/opportunities/",
            apiSalesReports:"https://testapi.snapshotcrm.com/v3/reports/sales",
            apiMarketinTemplate:"https://testapi.snapshotcrm.com/v3/marketingtemplates/"
        });

})();