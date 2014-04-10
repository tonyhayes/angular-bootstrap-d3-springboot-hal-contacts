
// Declare app level module which depends on filters, and services
angular.module('customersApp', [
        'ngRoute',
        'customersApp.customerServices',
        'customersApp.filters',
        'customersApp.directives',
        'customersApp.customerControllers',
        'customersApp.formControllers',
        'customersApp.formsService',
        'customersApp.companyService',
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
    ]);