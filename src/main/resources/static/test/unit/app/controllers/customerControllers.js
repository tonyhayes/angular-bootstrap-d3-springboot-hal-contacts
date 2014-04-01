describe('Testing CustomersController', function() {
    var $scope, ctrl;



    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function() {
        module('customersApp');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // customersService - injected so we can use these functions.

        inject(function($rootScope, $controller, $filter, customersService) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();



            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('CustomersController', {
                $scope: $scope,
                $filter: $filter,
                customersService: customersService
            });
        });
    });


    /* Test 1: Data exists.
     * here we're going to test that some things were
     * populated when the controller function whas evaluated. */
    it('should start with 15 customers', function() {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.customers.length).toEqual(15);
    });

    /* Test 2: delete Customer.
     * delete  a known customer. */
    it('should call deleteCustomer method and remove 1 customer', function() {
        // Act
        inject(function(customersService) {
            customersService.deleteCustomer('7c46e70f-fe2e-4add-9112-07d37fe679d2');

            // Assert
            expect($scope.customers.length).toEqual(14);
        });

    });

    /* Test 3: find Customer.
     * find a known customer. */
    it('should call getCustomer service method and return 1 customer', function() {
        // Act
        inject(function(customersService) {
            var cust = customersService.getCustomer('ba1d6149-1545-411f-9e45-20dc82f1a438');
            var custName = cust.customerName + ' ' + cust.city;

            // Assert
            expect(custName).toEqual("Hacken Oil Houston");
        });

    });
     /* Test 4: filter Customer.
     * filter to a known customer. */
    it('should call nameCityStateFilter method and filter to return 1 customer', function() {
        // Act
        inject(function($filter) {
            $scope.filteredCustomers = $filter("nameCityStateFilter")($scope.customers, 'china');
            $scope.filteredCount = $scope.filteredCustomers.length;

            // Assert
            expect($scope.filteredCustomers.length).toEqual(1);
        });

    });
    /* Test 5: get all customers .
     * check customers. */
    it('should call getCustomers service method and equal scoped customers', function() {
        // Act
        inject(function(customersService) {

            var cust = customersService.getCustomers();
            // Assert
            expect(cust.length).toEqual($scope.customers.length);
        });

    });

});

describe('Testing CustomerContactsController', function() {
    var $scope, ctrl, routeParams;



    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function() {
        module('customersApp');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // plansService - injected so we can use these functions.

        inject(function($rootScope, $controller, $routeParams, customersService, statesService) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();
            routeParams = {};
            routeParams.customerID = "ba1d6149-1545-411f-9e45-20dc82f1a438";


            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('CustomerContactsController', {
                $scope: $scope,
                $routeParams: routeParams,
                customersService: customersService,
                statesService: statesService
            });
        });
    });


    // Test 1: select a customer.

    it('should find a selected customer', function() {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.customer.customerId).toEqual("ba1d6149-1545-411f-9e45-20dc82f1a438");
    });

    /* Test 2: find a state.
     * find a known state. */
    it('should call getStates service method and return states', function() {
        // Act
        inject(function(statesService) {
            var states = statesService.getStates();

            // Assert
            expect(states).toBeDefined();
        });

    });

    /* Test 3: find Customer.
     * find a known customer. */
    it('should call getCustomer service method and return 1 customer', function() {
        // Act
        inject(function(customersService) {
            var cust = customersService.getCustomer($scope.customer.customerId);
            var custName = cust.customerName + ' ' + cust.city;

            // Assert
            expect(custName).toEqual("Hacken Oil Houston");
        });

    });


    /* Test 4: insert a contact.
     * insert a new contact. */
    it('should insert a new customer contact', function() {
        // Act
        inject(function(customersService) {
            var data = {
            contacts: [
                {
                    firstname: "Vinny",
                    lastname: "Testarosa",
                    title: 'Project Leader',
                    addressLine1: "2926 Starry Way",
                    addressLine2: "Ste 2508",
                    city: "Austin",
                    state: "Texas",
                    zip: "77478",
                    email: "jsf@reboot.com",
                    phone: "281-240-3994",
                    cell: "713-430-7760"
                }
                ]
            };

           customersService.insertContact($scope.customer,data);

            // Assert
            expect($scope.customer.contacts.length).toEqual(4);
        });

    });

});
describe('Testing CustomerEditController', function() {
    var $scope, ctrl, routeParams;



    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function() {
        module('customersApp');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // plansService - injected so we can use these functions.

        inject(function($rootScope, $controller, $routeParams, customersService,statesService) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();
            routeParams = {};
            routeParams.customerID = "ba1d6149-1545-411f-9e45-20dc82f1a438";


            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('CustomerEditController', {
                $scope: $scope,
                $routeParams: routeParams,
                customersService: customersService,
                statesService:statesService
            });
        });
    });
    // Test 1: select a customer.

    it('should find a selected customer', function() {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.customer.customerId).toEqual("ba1d6149-1545-411f-9e45-20dc82f1a438");
    });

    /* Test 2: find a state.
     * find a known state. */
    it('should call getStates service method and return states', function() {
        // Act
        inject(function(statesService) {
            var states = statesService.getStates();

            // Assert
            expect(states).toBeDefined();
        });

    });
    /* Test 3: add a customer .
     * insert a row. */
    it('should call insertCustomer service method and add a customer', function() {
        // Act
        inject(function(customersService) {
            customersService.insertCustomer($scope.customer);

            var cust = customersService.getCustomers();
            // Assert
            expect(cust.length).toEqual(16);
        });

    });


});

describe('Testing CustomerOpportunityController', function() {
    var $scope, ctrl, routeParams;



    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function() {
        module('customersApp');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // plansService - injected so we can use these functions.

        inject(function($rootScope, $controller, $routeParams, customersService) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();
            routeParams = {};
            routeParams.customerID = "ba1d6149-1545-411f-9e45-20dc82f1a438";


            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('CustomerOpportunityController', {
                $scope: $scope,
                $routeParams: routeParams,
                customersService: customersService
            });
        });
    });


    // Test 1: select a customer.

    it('should find a selected customer', function() {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.customer.customerId).toEqual("ba1d6149-1545-411f-9e45-20dc82f1a438");
    });

    // Test 2: locate an opportunity.

    it('should find an opportunity', function() {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.customer.opportunities.length).toEqual(1);
    });

    /* Test 3: find Customer.
     * find a known customer. */
    it('should call getCustomer service method and return 1 customer', function() {
        // Act
        inject(function(customersService) {
            var cust = customersService.getCustomer($scope.customer.customerId);
            var custName = cust.customerName + ' ' + cust.city;

            // Assert
            expect(custName).toEqual("Hacken Oil Houston");
        });

    });

});describe('Testing CustomerOpportunitiesEditController', function() {
    var $scope, ctrl, routeParams;



    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function() {
        module('customersApp');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // plansService - injected so we can use these functions.

        inject(function($rootScope, $controller, $routeParams,  $location, $filter, customersService, customerNamesService, salesPersonService, contactService, probabilityService, modalService, formFormatterService) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();
            routeParams = {};
            routeParams.customerID = "ec5329ed-ba10-4ad6-894a-bbd348d12222";
            routeParams.id = 2;


            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('CustomerOpportunitiesEditController', {
                $scope: $scope,
                $routeParams: routeParams,
                $location:$location,
                $filter:$filter,
                customersService: customersService,
                customerNamesService:customerNamesService,
                salesPersonService:salesPersonService,
                contactService:contactService,
                probabilityService:probabilityService,
                modalService:modalService,
                formFormatterService:formFormatterService


            });
        });
    });


    // Test 1: select a customer.

    it('should find a selected opportunity', function() {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.customer.customer).toEqual("ba1d6149-1545-411f-9e45-20dc82f1a438");
    });

    // Test 2: locate an opportunity.

    it('should find opportunity details', function() {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.customer.opportunityDetails.length).toEqual(3);
    });

    /* Test 3: find Customer.
     * find a known customer. */
    it('should call getCustomer service method and return 1 customer', function() {
        // Act
        inject(function(customersService) {
            var cust = customersService.getCustomer(routeParams.customerID);
            var custName = cust.customerName + ' ' + cust.city;

            // Assert
            expect(custName).toEqual("Teak Elementary Oil and Gas Company Houston");
        });

    });

    /* Test 4: find a customer name.
     * find a known customer name. */
    it('should call customerNamesService.getCustomerNames service method and return names', function() {
        // Act
        inject(function(customerNamesService) {
            var names = customerNamesService.getCustomerNames();

            // Assert
            expect($scope.customerNames_array).toEqual(names);
        });

    });

    /* Test 5: find a customer name.
     * find a known customer name. */
    it('should call customerNamesService.getCustomerName service method and return name', function() {
        // Act
        inject(function(customerNamesService) {
            var name = customerNamesService.getCustomerName('ba1d6149-1545-411f-9e45-20dc82f1a438');

            // Assert
            expect(name.customerName).toEqual('Hacken Oil');
        });

    });

    /* Test 6: find a sales name.
     * find a known sales name. */
    it('should call salesPersonService.getSalesPersons service method and return names', function() {
        // Act
        inject(function(salesPersonService) {
            var names = salesPersonService.getSalesPersons();

            // Assert
            expect($scope.salesPerson_array).toEqual(names);
        });

    });

    /* Test 7: find a sales name.
     * find a known sales name. */
    it('should call salesPersonService.getSalesPerson service method and return name', function() {
        // Act
        inject(function(salesPersonService) {
            var name = salesPersonService.getSalesPerson(15);

            // Assert
            expect(name.salesPerson).toEqual('Rodney Wayne');
        });

    });

    /* Test 8: find a contact name.
     * find a known contact name. */
    it('should call contactService.getContacts service method and return names', function() {
        // Act
        inject(function(contactService) {
            var names = contactService.getContacts();

            // Assert
            expect($scope.contact_array).toEqual(names);
        });

    });

    /* Test 9: find a contact name.
     * find a known contact name. */
    it('should call contactService.getContact service method and return name', function() {
        // Act
        inject(function(contactService) {
            var name = contactService.getContact(15);

            // Assert
            expect(name.contact).toEqual('Rodney Wayne');
        });

    });

    /* Test 10: find a probability name.
     * find a known probability name. */
    it('should call probabilityService.getProbabilities service method and return names', function() {
        // Act
        inject(function(probabilityService) {
            var names = probabilityService.getProbabilities();

            // Assert
            expect($scope.probability_array).toEqual(names);
        });

    });

    /* Test 11: find a probability name.
     * find a known probability name. */
    it('should call probabilityService.getProbability service method and return name', function() {
        // Act
        inject(function(probabilityService) {
            var name = probabilityService.getProbability(15);

            // Assert
            expect(name.probability).toEqual('15');
        });

    });

    /* Test 12: find dynamic form.
     * find a known dynamic form. */
    it('should call formFormatterService.getDynamicForm service method and return form', function() {
        // Act
        inject(function(formFormatterService) {
            var form = formFormatterService.getDynamicForm().form;

            // Assert
            expect(form).toEqual($scope.opportunityFormTemplate);
        });

    });


});