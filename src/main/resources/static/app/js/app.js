
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
            userReady.reject("between the desk and the chair! I told you not to touch that button didn't I? ;-P"); // resolve the promise.
        };


        // You should not use $http directly in a controller
        // however, I wanted to show how to load real data
        // here too. This should be handled by a service too!
//        userLoadProm = $http.get('users.json');
//        userLoadProm.then(function(response) {
//            // I'm exposing the userList on my appController scope,
//            // all normal scopes in my app inherrit from
//            // here, so it's available everywhere!
//            $scope.userList = response.data;
//            console.log('Users are loaded, $http promise is resolved!');
//        });

        // use $q.all to wait until all promises are resolved
        $q.all([
            CompanyServices.getCompanies(0),
            service2,
            service3,
            userReady.promise
        ]).then(
            function(data) {
                console.log('All services are resolved!');
                // when evdrything has loaded, flip the switch, and let the
                // routes do their work
                $scope.loadingDone = true;
            },
            function(reason) {
                // if any of the promises fails, handle it
                // here, I'm just throwing an error message to
                // the user.
                $scope.failure = reason;
            });

    }
]);



