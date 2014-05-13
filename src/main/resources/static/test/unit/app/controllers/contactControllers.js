/**
 * Created by anthonyhayes on 4/29/14.
 */
describe('Testing ContactsController', function () {
    var $scope, ctrl, routeParams, items;


    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function () {
        module('customersApp');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // plansService - injected so we can use these functions.

        inject(function ($rootScope, $controller, $routeParams, $location, $filter,
                         CustomersService, StatesService, ContactServices, CompanyServices, ContactPages ) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();
            routeParams = {};
            routeParams.customerID = "2";


            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('ContactsController', {
                $scope: $scope,
                $routeParams: routeParams,
                $filter: $filter,
                CustomersService: CustomersService,
                StatesService: StatesService,
                ContactServices: ContactServices,
                CompanyServices: CompanyServices,
                ContactPages: ContactPages

            });
            $scope.contactPages.items = contacts;

        });
    });


    // Test 1: select a customer.

    it('should find a selected customer', function () {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.companyNumber).toEqual(2);
    });

    /* Test 2: find a state.
     * find a known state. */
    it('should call getStates service method and return states', function () {
        // Act
        inject(function (StatesService) {
            var states = StatesService.setTestStates();
            var states = StatesService.getStates();

            // Assert
            expect(states).toBeDefined();
            expect(states.length).toEqual(2);
        });

    });

    /* Test 3: Data exists.
     * here we're going to test that some things were
     * populated when the controller function whas evaluated. */
    it('should start with 20 contacts', function () {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.contactPages.items.length).toEqual(20);
    });

    /* Test 4: filter Customer.
     * filter to a known customer. */
    it('should call nameCityStateFilter method and filter to return 1 customer', function () {
        // Act
        inject(function ($filter) {
            $scope.contactPages.items = $filter("contactNameCityStateFilter")($scope.contactPages.items, 'mika');

            // Assert
            expect($scope.contactPages.items.length).toEqual(1);
        });

    });



});

var contacts =     [ {
    "createdAt" : 1398782061494,
    "updatedAt" : 1398782061494,
    "firstName" : "Flamming",
    "lastName" : "Brezenski",
    "title" : null,
    "addressLine1" : "123 Settlers Way Blvd",
    "addressLine2" : "Ste S",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Flamming Brezenski",
    "contactId" : 24,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/24"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/24/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061486,
    "updatedAt" : 1398782061486,
    "firstName" : "Mika",
    "lastName" : "Brezenski",
    "title" : null,
    "addressLine1" : "123 Settlers Way Blvd",
    "addressLine2" : "Ste S",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Mika Brezenski",
    "contactId" : 11,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/11"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/11/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061494,
    "updatedAt" : 1398782061494,
    "firstName" : "Jo",
    "lastName" : "Chicken",
    "title" : null,
    "addressLine1" : "98 Pioneer Way ",
    "addressLine2" : "Ste 8",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Jo Chicken",
    "contactId" : 26,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/26"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/26/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061488,
    "updatedAt" : 1398782061488,
    "firstName" : "Fried",
    "lastName" : "Chicken",
    "title" : null,
    "addressLine1" : "98 Pioneer Way ",
    "addressLine2" : "Ste 8",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Fried Chicken",
    "contactId" : 13,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/13"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/13/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061485,
    "updatedAt" : 1398782061485,
    "firstName" : "Minnie",
    "lastName" : "Driver",
    "title" : null,
    "addressLine1" : "76 James Frontier Way Blvd",
    "addressLine2" : "Ste 6",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Minnie Driver",
    "contactId" : 9,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/9"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/9/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061493,
    "updatedAt" : 1398782061493,
    "firstName" : "Licky",
    "lastName" : "Driver",
    "title" : null,
    "addressLine1" : "76 James Frontier Way Blvd",
    "addressLine2" : "Ste 6",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Licky Driver",
    "contactId" : 22,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/22"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/22/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061483,
    "updatedAt" : 1398782061483,
    "firstName" : "Rest",
    "lastName" : "EnPeace",
    "title" : null,
    "addressLine1" : "67  Way Blvd",
    "addressLine2" : "Ste 3",
    "city" : "Austin",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Rest EnPeace",
    "contactId" : 6,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/6"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/6/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061492,
    "updatedAt" : 1398782061492,
    "firstName" : "Dickey",
    "lastName" : "EnPeace",
    "title" : null,
    "addressLine1" : "67  Way Blvd",
    "addressLine2" : "Ste 3",
    "city" : "Austin",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Dickey EnPeace",
    "contactId" : 19,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/19"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/19/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061489,
    "updatedAt" : 1398782061489,
    "firstName" : "Ryan",
    "lastName" : "Hayes",
    "title" : null,
    "addressLine1" : "6  Frontier Cook Blvd",
    "addressLine2" : "Ste 9",
    "city" : "Austin",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Ryan Hayes",
    "contactId" : 15,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/15"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/15/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061480,
    "updatedAt" : 1398782061480,
    "firstName" : "Tony",
    "lastName" : "Hayes",
    "title" : null,
    "addressLine1" : "6  Frontier Cook Blvd",
    "addressLine2" : "Ste 9",
    "city" : "Austin",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Tony Hayes",
    "contactId" : 2,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/2"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/2/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061491,
    "updatedAt" : 1398782061491,
    "firstName" : "Vicky",
    "lastName" : "Lost",
    "title" : null,
    "addressLine1" : "67 SeJames Cookttlers  Blvd",
    "addressLine2" : "Ste 34",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Vicky Lost",
    "contactId" : 17,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/17"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/17/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061482,
    "updatedAt" : 1398782061482,
    "firstName" : "Child",
    "lastName" : "Lost",
    "title" : null,
    "addressLine1" : "67 SeJames Cookttlers  Blvd",
    "addressLine2" : "Ste 34",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Child Lost",
    "contactId" : 4,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/4"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/4/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061484,
    "updatedAt" : 1398782061484,
    "firstName" : "Mike",
    "lastName" : "Maybe",
    "title" : null,
    "addressLine1" : "7 Pioneer  Blvd",
    "addressLine2" : "Ste 5",
    "city" : "Houston",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Mike Maybe",
    "contactId" : 8,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/8"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/8/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061493,
    "updatedAt" : 1398782061493,
    "firstName" : "Lucky",
    "lastName" : "Maybe",
    "title" : null,
    "addressLine1" : "7 Pioneer  Blvd",
    "addressLine2" : "Ste 5",
    "city" : "Houston",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Lucky Maybe",
    "contactId" : 21,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/21"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/21/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061494,
    "updatedAt" : 1398782061494,
    "firstName" : "Firehouse",
    "lastName" : "Morning",
    "title" : null,
    "addressLine1" : "98 Frontier  Blvd",
    "addressLine2" : "Ste 67",
    "city" : "Houston",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Firehouse Morning",
    "contactId" : 25,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/25"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/25/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061487,
    "updatedAt" : 1398782061487,
    "firstName" : "Joe",
    "lastName" : "Morning",
    "title" : null,
    "addressLine1" : "98 Frontier  Blvd",
    "addressLine2" : "Ste 67",
    "city" : "Houston",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Joe Morning",
    "contactId" : 12,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/12"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/12/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061482,
    "updatedAt" : 1398782061482,
    "firstName" : "Last",
    "lastName" : "Place",
    "title" : null,
    "addressLine1" : "76 Settlers Way ",
    "addressLine2" : "Ste 250",
    "city" : "Houston",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Last Place",
    "contactId" : 5,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/5"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/5/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061491,
    "updatedAt" : 1398782061491,
    "firstName" : "Mickey",
    "lastName" : "Place",
    "title" : null,
    "addressLine1" : "76 Settlers Way ",
    "addressLine2" : "Ste 250",
    "city" : "Houston",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Mickey Place",
    "contactId" : 18,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/18"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/18/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061493,
    "updatedAt" : 1398782061493,
    "firstName" : "Tricky",
    "lastName" : "Rats",
    "title" : null,
    "addressLine1" : "76 Frontier Way Blvd",
    "addressLine2" : "Ste 6",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Tricky Rats",
    "contactId" : 20,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/20"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/20/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
}, {
    "createdAt" : 1398782061484,
    "updatedAt" : 1398782061484,
    "firstName" : "Fivel",
    "lastName" : "Rats",
    "title" : null,
    "addressLine1" : "76 Frontier Way Blvd",
    "addressLine2" : "Ste 6",
    "city" : "Dallas",
    "state" : "TX",
    "zip" : "77478",
    "email" : "roger@doggers.com",
    "phone" : "832-867.5840",
    "cell" : "713.244.3657",
    "webPage" : null,
    "notes" : null,
    "contactDescription" : "Fivel Rats",
    "contactId" : 7,
    "_links" : {
        "self" : {
            "href" : "http://localhost:9090/contacts/7"
        },
        "crm:company" : {
            "href" : "http://localhost:9090/contacts/7/company"
        },
        "curies" : [ {
            "href" : "http://localhost:9090/rels/{rel}",
            "name" : "crm",
            "templated" : true
        } ]
    }
} ];