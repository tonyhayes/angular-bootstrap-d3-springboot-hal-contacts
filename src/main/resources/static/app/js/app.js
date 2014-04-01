
// Declare app level module which depends on filters, and services
angular.module('customersApp', [
        'ngRoute',
        'customersApp.customerServices',
        'customersApp.filters',
        'customersApp.directives',
        'customersApp.customerControllers',
        'customersApp.formControllers',
        'customersApp.formsService',
        'ui.bootstrap',
        'ngGrid',
        'dynform'
    ]).
    config(['$routeProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.when('/customers', {
                templateUrl: 'partials/customer/customers.html',
                controller: 'CustomersController'
            });
            $routeProvider.when('/customercontactdetails/:customerID', {
                templateUrl: 'partials/customer/customerContactDetails.html',
                controller: 'CustomerContactsController'
            });
            $routeProvider.when('/customeropportunitydetails/:customerID', {
                templateUrl: 'partials/customer/customerOpportunityDetails.html',
                controller: 'CustomerOpportunityController'
            });
            $routeProvider.when('/customerOpportunitiesEdit/:customerID/:id', {
                templateUrl: 'partials/customer/customerOpportunitiesEdit.html',
                controller: 'CustomerOpportunitiesEditController'
            });
            $routeProvider.when('/customeredit/:customerID', {
                templateUrl: 'partials/customer/customerEdit.html',
                controller: 'CustomerEditController'
            });
            $routeProvider.when('/forms/create', {
                templateUrl: 'partials/form/create.html',
                controller: 'FormController'
            });
            $routeProvider.when('/createcustomfields', {
                templateUrl: 'partials/form/createCustomFields.html',
                controller: 'FormFieldController'
            });
            $routeProvider.otherwise({
                redirectTo: '/customers'
            });
        }
    ]);