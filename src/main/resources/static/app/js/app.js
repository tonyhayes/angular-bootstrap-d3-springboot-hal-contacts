// Declare app level module which depends on filters, and services
angular.module('customersApp', [
    'ngRoute',

    'customersApp.applicationControllers',
    'customersApp.customerControllers',
    'customersApp.contactControllers',
    'customersApp.opportunityControllers',
    'customersApp.formControllers',
    'customersApp.salesPersonController',
    'customersApp.probabilityController',
    'customersApp.stateController',

    'customersApp.filters',
    'customersApp.directives',

    'customersApp.customerServices',
    'customersApp.formsService',
    'customersApp.ajaxService',

    /*
    plug-ins!
     */

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
            $routeProvider.when('/opportunities', {
                templateUrl: 'app/partials/opportunity/opportunityCards.html',
                controller: 'OpportunitiesController'
            });
            $routeProvider.when('/contactcards/:customerID', {
                templateUrl: 'app/partials/contact/contactCards.html',
                controller: 'ContactsController'
            });
            $routeProvider.when('/opportunitydetails/:customerID', {
                templateUrl: 'app/partials/opportunity/opportunityDetails.html',
                controller: 'OpportunityController'
            });
            $routeProvider.when('/opportunitiesedit/:customerID/:id', {
                templateUrl: 'app/partials/opportunity/opportunitiesEdit.html',
                controller: 'OpportunitiesEditController'
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
            $routeProvider.when('/admin/sales', {
                templateUrl: 'app/partials/admin/sales/salesPeople.html',
                controller: 'salesPersonController'
            });
            $routeProvider.when('/admin/probability', {
                templateUrl: 'app/partials/admin/probabilities/probabilities.html',
                controller: 'probabilityController'
            });
            $routeProvider.when('/admin/states', {
                templateUrl: 'app/partials/admin/states/states.html',
                controller: 'stateController'
            });
            $routeProvider.otherwise({
                redirectTo: '/customers'
            });
        }
    ]);



