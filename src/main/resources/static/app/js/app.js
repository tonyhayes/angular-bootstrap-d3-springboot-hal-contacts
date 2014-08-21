// Declare app level module which depends on filters, and services
angular.module('customersApp', [
    'ngRoute',

    'customersApp.filters',
    'customersApp.directives',
    'customersApp.applicationControllers',
    'customersApp.customerControllers',
    'customersApp.contactControllers',
    'customersApp.opportunityControllers',
    'customersApp.formControllers',
    'customersApp.salesPersonController',
    'customersApp.probabilityController',
    'customersApp.stateController',
    'customersApp.statusController',
    'customersApp.chartsController',


    'customersApp.customerServices',
    'customersApp.formsService',
    'customersApp.ajaxService',
    'customersApp.chartService',

    /*
     plug-ins!
     */

    'ui.bootstrap',
    'ngGrid',
    'dynform',
    'infinite-scroll',
    "ngQuickDate",
    'nvd3',
    'ngTagsInput'
]).
    config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/customers', {
                templateUrl: 'app/partials/customer/customers.html',
                controller: 'CustomersController'
            });
            $routeProvider.when('/opportunities', {
                templateUrl: 'app/partials/opportunity/opportunityCards.html',
                controller: 'OpportunitiesController'
            });
            $routeProvider.when('/charts', {
                templateUrl: 'app/partials/charts/chart.html',
                controller: 'ChartsController'
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
                controller: 'SalesPersonController'
            });
            $routeProvider.when('/admin/probability', {
                templateUrl: 'app/partials/admin/probabilities/probabilities.html',
                controller: 'ProbabilityController'
            });
            $routeProvider.when('/admin/states', {
                templateUrl: 'app/partials/admin/states/states.html',
                controller: 'StateController'
            });
            $routeProvider.when('/admin/status', {
                templateUrl: 'app/partials/admin/status/status.html',
                controller: 'StatusController'
            });
            $routeProvider.otherwise({
                redirectTo: '/customers'
            });
        }
    ])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('ajaxInterceptor');
    }]);



