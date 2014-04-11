
// Declare app level module which depends on filters, and services
angular.module('customersApp', [
        'ngRoute',
        'customersApp.customerServices',
        'customersApp.filters',
        'customersApp.directives',
        'customersApp.customerControllers',
        'customersApp.formControllers',
        'customersApp.formsService',
        'customersApp.ajaxService',
        'ui.bootstrap',
        'ngGrid',
        'dynform',
        'infinite-scroll'
    ]).
    config(['$routeProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.when('/customers', {
                templateUrl: 'app/partials/customer/customers.html',
                controller: 'CustomersController'
            });
            $routeProvider.when('/customercontactdetails/:customerID', {
                templateUrl: 'app/partials/customer/customerContactDetails.html',
                controller: 'CustomerContactsController'
            });
            $routeProvider.when('/customeropportunitydetails/:customerID', {
                templateUrl: 'app/partials/customer/customerOpportunityDetails.html',
                controller: 'CustomerOpportunityController'
            });
            $routeProvider.when('/customerOpportunitiesEdit/:customerID/:id', {
                templateUrl: 'app/partials/customer/customerOpportunitiesEdit.html',
                controller: 'CustomerOpportunitiesEditController'
            });
            $routeProvider.when('/customeredit/:customerID', {
                templateUrl: 'app/partials/customer/customerEdit.html',
                controller: 'CustomerEditController'
            });
            $routeProvider.when('/forms/create', {
                templateUrl: 'app/partials/form/create.html',
                controller: 'FormController'
            });
            $routeProvider.when('/createcustomfields', {
                templateUrl: 'app/partials/form/createCustomFields.html',
                controller: 'FormFieldController'
            });
            $routeProvider.otherwise({
                redirectTo: '/customers'
            });
        }
    ])
    .controller("appController", [
    "$scope", "$timeout", "$q", "customersService", "statesService", "CompanyServices",
    function($scope, $timeout, $q, customersService, statesService, CompanyServices) {
        var userReady = $q.defer();
        var userLoadProm;
        $scope.loadingDone = false;

        $scope.done = function() {
            // Here I'm handling the click of a button,
            // but this can be anything,
            // including wating for user log-on for example!
            console.log('User handling promise resolved');
            userReady.resolve(); // resolve the promise.
        };

        $scope.fail = function() {
            console.log('User handling promise rejected');
        };


        statesService.getConfiguredStates().then(function(data) {
            //this will execute when the
            //AJAX call completes.
            statesService.setStates(data);
         });

        // use $q.all to wait until all promises are resolved
//        $q.all([
//            CompanyServices.getCompanies(0),
//            statesService.getConfiguredStates
//        ]).then(
//            function(data) {
//                if(data[0]._embedded){
//                    customersService.saveCustomerPages(data[0]);
//                }
//                if(data[1]){
//                    statesService.setStates(data[0]);
//                }
//                console.log('All services are resolved!');
//                // when evdrything has loaded, flip the switch, and let the
//                // routes do their work
//                $scope.loadingDone = true;
//            },
//            function(reason) {
//                // if any of the promises fails, handle it
//                // here, I'm just throwing an error message to
//                // the user.
//                $scope.failure = reason;
//            });
        $scope.loadingDone = true;

    }
]);



