/**
 * Created by anthonyhayes on 4/29/14.
 */
describe('Testing opportunityControllers', function () {
    var $scope, ctrl, routeParams;


    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function () {
        module('customersApp');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // plansService - injected so we can use these functions.

        inject(function ($rootScope, $controller, $routeParams, $location,
                         CustomersService, OpportunityServices, CompanyServices) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();
            routeParams = {};
            routeParams.customerID = "2";


            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('OpportunityController', {
                $scope: $scope,
                $routeParams: routeParams,
                CustomersService: CustomersService,
                OpportunityServices: OpportunityServices,
                CompanyServices: CompanyServices
            });
        });
    });


    // Test 1: select a customer.

    it('should find a selected customer', function () {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.customerID).toEqual(2);
    });


});
describe('Testing OpportunitiesEditController', function () {
    var $scope, ctrl, routeParams;


    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function () {
        module('customersApp');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // plansService - injected so we can use these functions.

        inject(function ($rootScope, $controller, $routeParams, $location, $filter,
                         CustomersService, SalesPersonService,
                         ContactServices, ProbabilitiesService, OpportunityServices) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();
            routeParams = {};
            routeParams.customerID = "2";
            routeParams.id = 2;


            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('OpportunitiesEditController', {
                $scope: $scope,
                $routeParams: routeParams,
                $location: $location,
                $filter: $filter,
                CustomersService: CustomersService,
                SalesPersonService: SalesPersonService,
                ContactServices: ContactServices,
                ProbabilitiesService: ProbabilitiesService,
                OpportunityServices: OpportunityServices


            });
        });
    });


    // Test 1: select a customer.

    it('should find a selected customer', function () {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.customerID).toEqual('2');
    });
    it('should find a selected opportunity', function () {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.opportunityID).toEqual(2);
    });




});
