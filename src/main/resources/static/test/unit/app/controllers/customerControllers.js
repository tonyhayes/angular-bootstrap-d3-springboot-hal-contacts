describe('Service: MyService', function () {

    // example mock service for async calls
    //http://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support
    //http://www.benlesh.com/2013/05/angularjs-unit-testing-controllers.html
    //http://nathanleclaire.com/blog/2013/12/13/how-to-unit-test-controllers-in-angularjs-without-setting-your-hair-on-fire/

// instantiate service
    var MyService, httpBackend, http, root;

    var value = 0;
    // note done as argument - this is jasmine aysnc stuff
    beforeEach(function (done) {
        module('customersApp');
        inject(function (CustomersService) {
            MyService = CustomersService;
        });
        inject(function ($httpBackend, $http, $rootScope) {
            httpBackend = $httpBackend;
            http = $http;
            root = $rootScope;
            var message = {msg: "This is a message."};
            httpBackend.whenGET('/mock/message/1').respond(message);
        });
        done();
    });
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    // random test to show done() usage
    it("should support async execution of test preparation and expectations", function(done) {
        value++;
        expect(value).toBeGreaterThan(0);
        done();
    });

    // an actual mock service
    it("should make one call to mock service and retrieve something", function(done) {
        var cb = jasmine.createSpy();
        http.get("/mock/message/1").success(cb);
        root.$apply();
        httpBackend.flush();
            expect(cb).toHaveBeenCalled();
        done();
    });
});

// another mock test to help figure out ajax, this one without using jasmine done() async code
describe('Testing a controller with $http', function() {

    // testing controller
    var $httpBackend, $rootScope, $controller;
    var $scope;
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $controller =  $injector.get('$controller');
        $rootScope = $injector.get('$rootScope');

        $scope = $rootScope.$new();
        // backend definition common for all tests
        $httpBackend.when('GET', '/auth.py').respond({userId: 'userX'}, {'A-Token': 'xxx'});
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should fetch authentication token', function() {
        $httpBackend.expectGET('/auth.py');
        $controller('MyController', {$scope: $scope});
        $httpBackend.flush();
    });

    it('should send auth header', function() {
        $httpBackend.expectPOST('/add-msg.py', undefined, function(headers){
            // check if the header was send, if it wasn't the expectation won't
            // match the request and the test will fail
            return headers['Authorization'] == 'xxx';
        }).respond(201, '');

        $controller('MyController', {$scope: $scope});
        $scope.saveMessage('whatever');
        $httpBackend.flush();
    });

    it('should send msg to server', function() {
        // now you don’t care about the authentication, but
        // the controller will still send the request and
        // $httpBackend will respond without you having to
        // specify the expectation and response for this request
        $httpBackend.expectPOST('/add-msg.py', 'message content').respond(201, '');

        $controller('MyController', {$scope: $scope});
        $scope.saveMessage('message content');
        expect($scope.status).toBe('Saving...');
        $httpBackend.flush();
        expect($scope.status).toBe('');
    });
});


describe('Testing CustomersController', function () {
    var $scope, ctrl, items;



    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function () {
        module('customersApp');


        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // customersService - injected so we can use these functions.

        inject(function ($rootScope, $controller, $location, $filter,
                         CompanyServices, CustomersService, ModalService, CustomerPages) {
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
                CompanyServices: CompanyServices,
                CustomersService: CustomersService,
                ModalService: ModalService,
                CustomerPages: CustomerPages
            });
            $scope.customerPages.items = companies;

        });

    });


    /* Test 1: Data exists.
     * here we're going to test that some things were
     * populated when the controller function whas evaluated. */
    it('should start with 20 customers', function () {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.customerPages.items.length).toEqual(20);
    });

    /* Test 2: filter Customer.
     * filter to a known customer. */
    it('should call nameCityStateFilter method and filter to return 1 customer', function () {
        // Act
        inject(function ($filter) {
            $scope.customerPages.items = $filter("nameCityStateFilter")($scope.customerPages.items, 'cable');

            // Assert
            expect($scope.customerPages.items.length).toEqual(1);
        });

    });

});

describe('Testing CustomerEditController', function () {
    var $scope, ctrl, routeParams;


    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function () {
        module('customersApp');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // plansService - injected so we can use these functions.

        inject(function ($rootScope, $controller, $routeParams, CustomersService, StatesService) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();
            routeParams = {};
            routeParams.customerID = "1";


            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('CustomerEditController', {
                $scope: $scope,
                $routeParams: routeParams,
                CustomersService: CustomersService,
                StatesService: StatesService
            });
        });
    });
    // Test 1: select a customer.

    it('should find a selected customer', function () {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.customerId).toEqual(1);
    });

    /* Test 2: find a state.
     * find a known state. */
    it('should call getStates service method and return states', function () {
        // Act
        inject(function (StatesService) {
            var states = StatesService.setTestStates();
            var states = StatesService.getStates();

            // Assert
            expect(states.length).toEqual(2);
            expect(states).toBeDefined();
        });

    });


});


var companies =      [ {
    "createdAt" : 1398782061463,
    "updatedAt" : 1398782061463,
    "companyName" : "Able Co, Inc.",
    "addressLine1" : "76 James Cook Blvd",
    "addressLine2" : "Ste 300",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 2,
    "opportunitiesCount" : 3,
    "companyId" : 10,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/10"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/10/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/10/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/10/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061472,
    "updatedAt" : 1398782061472,
    "companyName" : "Action Co, Inc.",
    "addressLine1" : "76 James Cook Blvd",
    "addressLine2" : "Ste 300",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 0,
    "opportunitiesCount" : 0,
    "companyId" : 30,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/30"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/30/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/30/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/30/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061473,
    "updatedAt" : 1398782061473,
    "companyName" : "Cable Co, Inc.",
    "addressLine1" : "45 Frontier Blvd",
    "addressLine2" : "Ste 32",
    "city" : "Houston",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 0,
    "opportunitiesCount" : 0,
    "companyId" : 31,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/31"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/31/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/31/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/31/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061464,
    "updatedAt" : 1398782061464,
    "companyName" : "Cain Co, Inc.",
    "addressLine1" : "45 Frontier Blvd",
    "addressLine2" : "Ste 32",
    "city" : "Houston",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 1,
    "opportunitiesCount" : 2,
    "companyId" : 11,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/11"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/11/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/11/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/11/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061461,
    "updatedAt" : 1398782061461,
    "companyName" : "Cohorn Co, Inc.",
    "addressLine1" : "4 Frontier  Blvd",
    "addressLine2" : "Ste 550",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 1,
    "opportunitiesCount" : 2,
    "companyId" : 3,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/3"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/3/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/3/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/3/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061474,
    "updatedAt" : 1398782061474,
    "companyName" : "Cooksly Co, Inc.",
    "addressLine1" : "56 Settlers Way Blvd",
    "addressLine2" : "Ste 4",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 0,
    "opportunitiesCount" : 0,
    "companyId" : 33,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/33"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/33/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/33/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/33/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061464,
    "updatedAt" : 1398782061464,
    "companyName" : "Crazy Co, Inc.",
    "addressLine1" : "56 Settlers Way Blvd",
    "addressLine2" : "Ste 4",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 1,
    "opportunitiesCount" : 2,
    "companyId" : 13,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/13"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/13/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/13/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/13/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061468,
    "updatedAt" : 1398782061468,
    "companyName" : "Crisis Co, Inc.",
    "addressLine1" : "4 Frontier  Blvd",
    "addressLine2" : "Ste 550",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 1,
    "opportunitiesCount" : 0,
    "companyId" : 23,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/23"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/23/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/23/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/23/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061469,
    "updatedAt" : 1398782061469,
    "companyName" : "Deadwood Co, Inc.",
    "addressLine1" : "765 Settlers Way Blvd",
    "addressLine2" : "Ste 25",
    "city" : "Austin",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 1,
    "opportunitiesCount" : 0,
    "companyId" : 25,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/25"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/25/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/25/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/25/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061462,
    "updatedAt" : 1398782061462,
    "companyName" : "Donaldson Co, Inc.",
    "addressLine1" : "765 Settlers Way Blvd",
    "addressLine2" : "Ste 25",
    "city" : "Austin",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 1,
    "opportunitiesCount" : 2,
    "companyId" : 5,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/5"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/5/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/5/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/5/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061458,
    "updatedAt" : 1398782061458,
    "companyName" : "Frensley Co, Inc.",
    "addressLine1" : "123 James Cook Blvd",
    "addressLine2" : "Ste 250",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "Shane Frensley",
    "primaryContactId" : 1,
    "contactsCount" : 1,
    "opportunitiesCount" : 2,
    "companyId" : 1,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/1"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/1/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/1/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/1/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061465,
    "updatedAt" : 1398782061465,
    "companyName" : "Friday Co, Inc.",
    "addressLine1" : "8  James Cook Blvd",
    "addressLine2" : "Ste 5",
    "city" : "Houston",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 1,
    "opportunitiesCount" : 2,
    "companyId" : 15,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/15"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/15/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/15/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/15/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061476,
    "updatedAt" : 1398782061476,
    "companyName" : "Friendly Co, Inc.",
    "addressLine1" : "8  James Cook Blvd",
    "addressLine2" : "Ste 5",
    "city" : "Houston",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 0,
    "opportunitiesCount" : 0,
    "companyId" : 35,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/35"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/35/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/35/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/35/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061467,
    "updatedAt" : 1398782061467,
    "companyName" : "Frodo Co, Inc.",
    "addressLine1" : "123 James Cook Blvd",
    "addressLine2" : "Ste 250",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 1,
    "opportunitiesCount" : 0,
    "companyId" : 21,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/21"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/21/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/21/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/21/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061465,
    "updatedAt" : 1398782061465,
    "companyName" : "Game Co, Inc.",
    "addressLine1" : "56  Way Blvd",
    "addressLine2" : "Ste 9",
    "city" : "Austin",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 1,
    "opportunitiesCount" : 2,
    "companyId" : 17,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/17"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/17/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/17/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/17/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061477,
    "updatedAt" : 1398782061477,
    "companyName" : "Giant Co, Inc.",
    "addressLine1" : "56  Way Blvd",
    "addressLine2" : "Ste 9",
    "city" : "Austin",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 0,
    "opportunitiesCount" : 0,
    "companyId" : 37,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/37"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/37/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/37/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/37/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061471,
    "updatedAt" : 1398782061471,
    "companyName" : "Hacken Co, Inc.",
    "addressLine1" : "45 Pioneer Way Blvd",
    "addressLine2" : "Ste 5",
    "city" : "Austin",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 1,
    "opportunitiesCount" : 0,
    "companyId" : 28,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/28"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/28/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/28/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/28/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061467,
    "updatedAt" : 1398782061467,
    "companyName" : "Halcyon Co, Inc.",
    "addressLine1" : "54 Pioneer Way Blvd",
    "addressLine2" : "Ste 50",
    "city" : "Austin",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 1,
    "opportunitiesCount" : 0,
    "companyId" : 22,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/22"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/22/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/22/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/22/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061461,
    "updatedAt" : 1398782061461,
    "companyName" : "Hayes Co, Inc.",
    "addressLine1" : "54 Pioneer Way Blvd",
    "addressLine2" : "Ste 50",
    "city" : "Austin",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "Tony Hayes",
    "primaryContactId" : 2,
    "contactsCount" : 26,
    "opportunitiesCount" : 2,
    "companyId" : 2,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/2"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/2/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/2/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/2/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061463,
    "updatedAt" : 1398782061463,
    "companyName" : "Hood Co, Inc.",
    "addressLine1" : "45 Pioneer Way Blvd",
    "addressLine2" : "Ste 5",
    "city" : "Austin",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactName" : "Emily",
    "primaryContactDescription" : "No Primary Contact",
    "primaryContactId" : null,
    "contactsCount" : 1,
    "opportunitiesCount" : 2,
    "companyId" : 8,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/companies/8"
        },
        "crm:opportunities" : {
            "href" : "http://localhost:9090/companies/8/opportunities"
        },
        "crm:contacts" : {
            "href" : "http://localhost:9090/companies/8/contacts"
        },
        "crm:primaryContact" : {
            "href" : "http://localhost:9090/companies/8/primaryContact"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
} ];
