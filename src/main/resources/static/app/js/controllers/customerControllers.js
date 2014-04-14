/* Controllers */

angular.module('customersApp.customerControllers', [])


//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is ultimately bound to the customers view
    .controller('CustomersController', ['$scope', '$location', '$filter', 'CompanyServices', 'customersService', 'modalService',

        function ($scope, $location, $filter, CompanyServices, customersService, modalService) {

            $scope.customers = [];
            $scope.filteredCustomers = [];
            $scope.filteredCount = 0;
            $scope.scroll = {};
            $scope.scroll.stop = false;
            $scope.scroll.next = '';
            $scope.pageNo = 1;

            init();

            $scope.deleteCustomer = function (idx, cust) {

                var custName = cust.companyName + ' ' + cust.city;

                var modalDefaults = {
                    templateUrl: 'app/partials/modal.html'
                };
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Delete Customer',
                    headerText: 'Delete ' + custName + '?',
                    bodyText: 'Are you sure you want to delete this customer?'
                };

                modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        CompanyServices.deleteCompany(cust);
                        $scope.customers.splice(idx, 1);
                    }
                    filterCustomers($scope.searchText);
                });

            };

            function init() {
                createWatches();
                getCustomersSummary();
            }

            $scope.navigate = function (url, customerObject) {
                if (customerObject) {
                    customersService.storeCustomer(customerObject);
                }
                $location.path(url);
            };

            function createWatches() {
                //Watch searchText value and pass it and the customers to nameCityStateFilter
                //Doing this instead of adding the filter to ng-repeat allows it to only be run once (rather than twice)
                //while also accessing the filtered count via $scope.filteredCount above
                $scope.$watch("searchText", function (filterText) {
                    filterCustomers(filterText);
                });
            }

            $scope.loadMore = function () {
                //stop the scrolling while we are reloading - important!

                if ($scope.scroll.next && !$scope.scroll.stop) {

                    //stop the scrolling while we are reloading - important!
                    $scope.scroll.stop = true;

                    //make the call to getCompanies and handle the promise returned;
                    CompanyServices.getCompanies($scope.pageNo).then(function (data) {
                        //this will execute when the
                        //AJAX call completes.
                        if(data && data._embedded){
                            var items = data._embedded.companies;
                            for (var i = 0; i < items.length; i++) {
                                $scope.customers.push(items[i]);
                            }

                            if (data._links && data._links.next) {
                                $scope.scroll.next = data._links.next.href;
                                $scope.scroll.stop = false;
                                $scope.pageNo++;
                            }else{
                                $scope.scroll.next = '';
                                $scope.scroll.stop = true;

                            }
                        }else{
                            $scope.scroll.next = '';
                            $scope.scroll.stop = true;

                        }


                        console.log(data);
                        if ($scope.customers) {
                            $scope.totalRecords = $scope.customers.length;
                            filterCustomers(''); //Trigger initial filter
                        }
                    });

                }


            }


            function getCustomersSummary() {
                if (!$scope.scroll.stop) {

                    //stop the scrolling while we are reloading - important!
                    $scope.scroll.stop = true;

                    //make the call to getCompanies and handle the promise returned;
                    CompanyServices.getCompanies(0).then(function (data) {
                        //this will execute when the
                        //AJAX call completes.
                        if (data && data._embedded){
                            $scope.customers = data._embedded.companies;
                            if (data._links && data._links.next) {
                                $scope.scroll.next = data._links.next.href;
                                $scope.scroll.stop = false;
                            } else {
                                $scope.scroll.next = '';
                                $scope.scroll.stop = true;
                            }

                        }else{
                            $scope.scroll.next = '';
                            $scope.scroll.stop = true;
                        }


                        console.log(data);
                        if ($scope.customers) {
                            $scope.totalRecords = $scope.customers.length;
                            filterCustomers(''); //Trigger initial filter
                        }
                    });
                }

            }


            function filterCustomers(filterText) {
                if ($scope.customers) {
                    $scope.filteredCustomers = $filter("nameCityStateFilter")($scope.customers, filterText);
                    $scope.filteredCount = $scope.filteredCustomers.length;
                }
            }
        }
    ])


//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is bound to the details view
    .controller('ContactsController', ['$scope', '$routeParams',  '$filter','customersService', 'modalService', 'statesService', 'ContactServices',

        function ($scope, $routeParams,  $filter, customersService, modalService, statesService, ContactServices) {
            $scope.customer = {};
            $scope.contacts = {};
            $scope.filterOptions = {
                filterText: ''
            };
            $scope.state_array = {};
            $scope.scroll = {};
            $scope.scroll.stop = false;
            $scope.scroll.next = '';
            $scope.pageNo = 1;

            init();

            function init() {
                //Grab contacts for company
                $scope.customer = customersService.getStoredCustomer();
                // reset if no object
                if(!$scope.customer){
                    $location.path('/customers');
                }
                // get contacts
                createWatches();
                getContactSummary();
             }

            function createWatches() {
                //Watch searchText value and pass it and the customers to nameCityStateFilter
                //Doing this instead of adding the filter to ng-repeat allows it to only be run once (rather than twice)
                //while also accessing the filtered count via $scope.filteredCount above
                $scope.$watch("searchText", function (filterText) {
                    filterContacts(filterText);
                });
            }

            $scope.loadMore = function () {
                //stop the scrolling while we are reloading - important!

                if ($scope.scroll.next && !$scope.scroll.stop) {

                    //stop the scrolling while we are reloading - important!
                    $scope.scroll.stop = true;

                    //make the call to getCompanies and handle the promise returned;
                    ContactServices.getContacts($scope.customer._links['crm:contacts'].href, $scope.pageNo).then(function (data) {
                        //this will execute when the
                        //AJAX call completes.
                        if(data && data._embedded){
                            var items = data._embedded.contacts;
                            for (var i = 0; i < items.length; i++) {
                                $scope.contacts.push(items[i]);
                            }

                            if (data._links && data._links.next) {
                                $scope.scroll.next = data._links.next.href;
                                $scope.scroll.stop = false;
                                $scope.pageNo++;
                            } else {
                                $scope.scroll.next = '';
                                $scope.scroll.stop = true;
                            }

                        }else{
                            $scope.scroll.next = '';
                            $scope.scroll.stop = true;
                        }


                        console.log(data);
                        if ($scope.contacts) {
                            $scope.totalRecords = $scope.contacts.length;
                            filterContacts(''); //Trigger initial filter
                        }
                    });

                }


            }


            function getContactSummary() {
                if (!$scope.scroll.stop) {

                    //stop the scrolling while we are reloading - important!
                    $scope.scroll.stop = true;

                    //make the call to getCompanies and handle the promise returned;
                    ContactServices.getContacts($scope.customer._links['crm:contacts'].href, 0).then(function (data) {
                        //this will execute when the
                        //AJAX call completes.
                        if(data && data._embedded){
                            $scope.contacts = data._embedded.contacts;
                            if (data._links && data._links.next) {
                                $scope.scroll.next = data._links.next.href;
                                $scope.scroll.stop = false;
                                $scope.pageNo++;
                            } else {
                                $scope.scroll.next = '';
                                $scope.scroll.stop = true;
                            }

                        }else{
                            $scope.scroll.next = '';
                            $scope.scroll.stop = true;

                        }


                        console.log(data);
                        if ($scope.contacts) {
                            $scope.totalRecords = $scope.contacts.length;
                            filterContacts(''); //Trigger initial filter
                        }
                    });
                }

            }


            function filterContacts(filterText) {
                if ($scope.contacts) {
                    $scope.filteredContacts = $filter("contactNameCityStateFilter")($scope.contacts, filterText);
                    $scope.filteredCount = $scope.filteredContacts.length;
                }
            }

            $scope.editContact = function (contactCard) {

                $scope.state_array = statesService.getStates();
                var custName = $scope.customer.companyName + ', ' + $scope.customer.city;
                var card = {};
                var data = {};
                if (contactCard) {
                    origCard = angular.copy(contactCard);
                    card = contactCard;
                }

                var modalDefaults = {
                    templateUrl: 'app/partials/customer/modalContactEdit.html'
                };
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Submit',
                    headerText: 'Contact at ' + custName,
                    record: card,
                    model1: $scope.state_array
                };

                modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        if (contactCard) {
                            ContactServices.patchContact(card);
                        }else{
                            ContactServices.postContact(card);
                        }
                    } else {
                        if (contactCard) {
                            contactCard = origCard;
                        }
                    }
                });
            };
        }
    ])

//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is bound to the details view
    .controller('CustomerOpportunityController', ['$scope', '$routeParams', '$location', 'customersService', 'modalService',

        function ($scope, $routeParams, $location, customersService, modalService) {
            $scope.customer = {};
            $scope.filterOptions = {
                filterText: ''
            };


            //I like to have an init() for controllers that need to perform some initialization. Keeps things in
            //one place...not required though especially in the simple example below
            init();


            function init() {


                //Grab planID off of the route
                var customerID = $routeParams.customerID;

                var templateCache =
                    "<div ng-dblclick=\"onDblClickRow(row)\" <div ng-style=\"{ 'cursor': row.cursor }\" ng-repeat=\"col in renderedColumns\" ng-class=\"col.colIndex()\" class=\"ngCell {{col.cellClass}}\">" +
                    "   <div class=\"ngVerticalBar\" ng-style=\"{height: rowHeight}\" ng-class=\"{ ngVerticalBarVisible: !$last }\">&nbsp;</div>" +
                    "   <div ng-cell></div>" +
                    "</div>";

                var filterBarPlugin = {
                    init: function (scope, grid) {
                        filterBarPlugin.scope = scope;
                        filterBarPlugin.grid = grid;
                        $scope.$watch(function () {
                            var searchQuery = "";
                            angular.forEach(filterBarPlugin.scope.columns, function (col) {
                                if (col.visible && col.filterText) {
                                    var filterText = (col.filterText.indexOf('*') === 0 ? col.filterText.replace('*', '') : col.filterText) + ";";
                                    searchQuery += col.displayName + ": " + filterText;
                                }
                            });
                            return searchQuery;
                        }, function (searchQuery) {
                            filterBarPlugin.scope.$parent.filterText = searchQuery;
                            filterBarPlugin.grid.searchProvider.evalFilter();
                        });
                    },
                    scope: undefined,
                    grid: undefined
                };

                if (customerID) {
                    $scope.customer = customersService.getCustomer(customerID);
                    $scope.myOpportunities = {
                        data: 'customer.opportunities',
                        showGroupPanel: true,
                        groups: [],
                        showColumnMenu: true,
                        plugins: [filterBarPlugin],
                        headerRowHeight: 60, // give room for filter bar
                        rowTemplate: templateCache,
                        filterOptions: $scope.filterOptions,
                        columnDefs: [
                            {
                                field: 'customer',
                                headerCellTemplate: 'app/partials/filterHeaderTemplate.html',
                                width: '*',
                                cellFilter: 'mapCustomerName',
                                displayName: 'Customer'
                            },
                            {
                                field: 'salesPerson',
                                headerCellTemplate: 'app/partials/filterHeaderTemplate.html',
                                cellFilter: 'mapSalesPerson',
                                width: '*',
                                displayName: 'Sales'
                            },
                            {
                                field: 'discussion',
                                headerCellTemplate: 'app/partials/filterHeaderTemplate.html',
                                width: '***',
                                displayName: 'Discussion'
                            },
                            {
                                field: 'probability',
                                headerCellTemplate: 'app/partials/filterHeaderTemplate.html',
                                cellFilter: 'mapProbability',
                                width: '*',
                                displayName: 'Probability'
                            },
                            {
                                field: 'potentialRevenue',
                                headerCellTemplate: 'app/partials/filterHeaderTemplate.html',
                                width: '**',
                                displayName: 'Potential Revenue'
                            }
                        ]
                    };
                }
            }

            $scope.onDblClickRow = function (row) {

                var customerID = $routeParams.customerID;
                var cust = customersService.getCustomer(customerID);
                var custName = cust.customerName + ', ' + cust.city;
                var id = 'new';


                if (row) {
                    id = row.entity.id;
                }

                $location.path('customerOpportunitiesEdit/' + customerID + '/' + id);


            };
        }
    ])

    .controller('CustomerEditController', ['$scope', '$routeParams', '$location', 'customersService', 'statesService', 'CompanyServices',

        function ($scope, $routeParams, $location, customersService, statesService, CompanyServices) {
            $scope.master = {};
            $scope.customer = {};
            $scope.state_array = statesService.getStates();
            $scope.customerUpdate = false;


            init();

            function init() {
                //Grab ID off of the route
                $scope.customerUpdate = parseInt($routeParams.customerID);
                if ($scope.customerUpdate) {
                    $scope.customer = customersService.getStoredCustomer();
                    $scope.master = angular.copy($scope.customer);
                }
            }

            // function to submit the form after all validation has occurred
            $scope.submitForm = function () {

                // check to make sure the form is completely valid
                if ($scope.customerForm.$valid) {
                    $scope.customer = angular.copy($scope.master);

                    if ($scope.customerUpdate) {
                        //patch

                        CompanyServices.patchCompany($scope.master);

                    } else {
                        CompanyServices.postCompany($scope.master);
                    }

                    $location.path('/customers');
                }

            };


        }
    ])
    .controller('CustomerOpportunitiesEditController', ['$scope', '$routeParams', '$location', '$filter', 'customersService',
        'customerNamesService', 'salesPersonService', 'contactService', 'probabilityService', 'modalService', 'formFormatterService',

        function ($scope, $routeParams, $location, $filter, customersService, customerNamesService, salesPersonService, contactService, probabilityService, modalService, formFormatterService) {
            $scope.master = {};
            $scope.customer = {};
            $scope.opportunities = {};
            $scope.customerNames_array = [];
            $scope.salesPerson_array = [];
            $scope.contact_array = [];
            $scope.probability_array = [];
            $scope.filterOptions = {
                filterText: ''
            };


            init();

            function init() {
                //Grab planID off of the route
                var customerID = $routeParams.customerID;
                var opportunityID = ($routeParams.id);
                if (customerID) {
                    $scope.customer = customersService.getCustomerOpportunity(customerID, opportunityID);
                    $scope.master = angular.copy($scope.customer);
                    $scope.customerNames_array = customerNamesService.getCustomerNames();
                    $scope.salesPerson_array = salesPersonService.getSalesPersons();
                    $scope.contact_array = contactService.getContacts();
                    $scope.probability_array = probabilityService.getProbabilities();
                }
            }

            /*

             Dynamic form processing


             */

            $scope.opportunityFormTemplate = formFormatterService.getDynamicForm().form;


            var templateCache =
                "<div ng-dblclick=\"onDblClickRow(row)\" <div ng-style=\"{ 'cursor': row.cursor }\" ng-repeat=\"col in renderedColumns\" ng-class=\"col.colIndex()\" class=\"ngCell {{col.cellClass}}\">" +
                "   <div class=\"ngVerticalBar\" ng-style=\"{height: rowHeight}\" ng-class=\"{ ngVerticalBarVisible: !$last }\">&nbsp;</div>" +
                "   <div ng-cell></div>" +
                "</div>";

            var filterBarPlugin = {
                init: function (scope, grid) {
                    filterBarPlugin.scope = scope;
                    filterBarPlugin.grid = grid;
                    $scope.$watch(function () {
                        var searchQuery = "";
                        angular.forEach(filterBarPlugin.scope.columns, function (col) {
                            if (col.visible && col.filterText) {
                                var filterText = (col.filterText.indexOf('*') === 0 ? col.filterText.replace('*', '') : col.filterText) + ";";
                                searchQuery += col.displayName + ": " + filterText;
                            }
                        });
                        return searchQuery;
                    }, function (searchQuery) {
                        filterBarPlugin.scope.$parent.filterText = searchQuery;
                        filterBarPlugin.grid.searchProvider.evalFilter();
                    });
                },
                scope: undefined,
                grid: undefined
            };

            $scope.myOpportunityDetails = {
                data: 'master.opportunityDetails',
                showGroupPanel: true,
                groups: [],
                showColumnMenu: true,
                plugins: [filterBarPlugin],
                headerRowHeight: 60, // give room for filter bar
                rowTemplate: templateCache,
                filterOptions: $scope.filterOptions,
                columnDefs: [
                    {
                        field: 'salesPerson',
                        cellFilter: 'mapSalesPerson',
                        headerCellTemplate: 'app/partials/filterHeaderTemplate.html',
                        width: '*',
                        displayName: 'Sales'
                    },
                    {
                        field: 'followUpDate',
                        headerCellTemplate: 'app/partials/filterHeaderTemplate.html',
                        width: '*',
                        cellFilter: 'date',
                        displayName: 'Date'
                    },
                    {
                        field: 'Action',
                        headerCellTemplate: 'app/partials/filterHeaderTemplate.html',
                        width: '***',
                        displayName: 'Action'

                    }
                ]
            };


            $scope.onDblClickRow = function (row) {

                var customerID = $routeParams.customerID;
                var cust = customersService.getCustomer(customerID);
                var custName = cust.customerName + ', ' + cust.city;
                var origRow = {};
                var data = {};
                if (row) {
                    origRow = angular.copy(row.entity);
                    data = row.entity;
                    data.followUpDate = $filter('date')(data.followUpDate, 'MM/dd/y');
                }


                var modalDefaults = {
                    templateUrl: 'app/partials/customer/modalOpportunityActionsEdit.html'
                };
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Submit',
                    headerText: 'Opportunity at ' + custName,
                    record: data,
                    model1: $scope.salesPerson_array
                };

                modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        if (!row) {
                            $scope.master.opportunityDetails.push(data);
                        }
                    } else {
                        if (row) {
                            row.entity = origRow;
                        }
                    }
                });
            };


            // function to submit the form after all validation has occurred
            $scope.submitForm = function () {

                $scope.customer = angular.copy($scope.master);

                //assume a service
                customersService.updateCustomerOpportunity($routeParams.customerID, $routeParams.id, $scope.customer);

                $location.path('/customeropportunitydetails/' + $routeParams.customerID);

            };


        }
    ])
    //this contoller is in charhe of the loadfing bar,
    // it's quick and dirty, and does nothing fancy.
    .controller("loadingController", [
        "$scope", "$timeout",
        function ($scope, $timeout) {
            $scope.percentDone = 0;

            function animateBar() {
                // very crude timeout based animator
                // just to illustrate the sample
                if ($scope.loadingDone) {
                    // this is thighly coupled to the appController
                    return;
                }
                if ($scope.percentDone == 100) {
                    $scope.percentDone = 0;
                    $timeout(animateBar, 1000);
                } else {
                    $scope.percentDone += 2;
                    $timeout(animateBar, 200);
                }
            }

            animateBar();
        }
    ]);

