
/* Controllers */

angular.module('customersApp.customerControllers', [])


//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is ultimately bound to the customers view
    .controller('CustomersController', ['$scope', '$location', '$filter', 'customersService', 'modalService',

        function ($scope, $location, $filter, customersService, modalService) {

            $scope.customers = [];
            $scope.filteredCustomers = [];
            $scope.filteredCount = 0;

            init();

            $scope.deleteCustomer = function (id) {

                var cust = customersService.getCustomer(id);
                var custName = cust.customerName + ' ' + cust.city;

                var modalDefaults = {
                    templateUrl: 'partials/modal.html'
                };
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Delete Customer',
                    headerText: 'Delete ' + custName + '?',
                    bodyText: 'Are you sure you want to delete this customer?'
                };

                modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        customersService.deleteCustomer(id);
                    }
                    filterCustomers($scope.searchText);
                });

            };

            function init() {
                $scope.customers = customersService.getCustomers();
                createWatches();
                getCustomersSummary();
            }

            $scope.navigate = function (url) {
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

            function getCustomersSummary() {
                $scope.customers = customersService.getCustomers();
                $scope.totalRecords = $scope.customers.length;
                filterCustomers(''); //Trigger initial filter
            }


            function filterCustomers(filterText) {
                $scope.filteredCustomers = $filter("nameCityStateFilter")($scope.customers, filterText);
                $scope.filteredCount = $scope.filteredCustomers.length;
            }
        }
    ])


//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is bound to the details view
    .controller('CustomerContactsController', ['$scope', '$routeParams', 'customersService', 'modalService', 'statesService',

        function ($scope, $routeParams, customersService, modalService, statesService) {
            $scope.customer = {};
            $scope.contacts = {};
            $scope.filterOptions = {
                filterText: ''
            };
            $scope.state_array = {};
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
                    $scope.myContacts = {
                        data: 'customer.contacts',
                        showGroupPanel: true,
                        groups: [],
                        showColumnMenu: true,
                        plugins: [filterBarPlugin],
                        headerRowHeight: 60, // give room for filter bar
                        rowTemplate: templateCache,
                        filterOptions: $scope.filterOptions,
                        columnDefs: [
                            {
                                field: 'firstname',
                                headerCellTemplate: 'partials/filterHeaderTemplate.html',
                                width: '**',
                                displayName: 'First Name'
                            },
                            {
                                field: 'lastname',
                                headerCellTemplate: 'partials/filterHeaderTemplate.html',
                                width: '**',
                                displayName: 'Last Name'
                            },
                            {
                                field: 'title',
                                headerCellTemplate: 'partials/filterHeaderTemplate.html',
                                width: '***',
                                displayName: 'Title'

                            },
                            {

                                field: 'addressLine1',
                                headerCellTemplate: 'partials/filterHeaderTemplate.html',
                                width: '***',
                                displayName: 'Address'
                            },
                            {

                                field: 'city',
                                headerCellTemplate: 'partials/filterHeaderTemplate.html',
                                width: '**',
                                displayName: 'City'
                            }
                        ]
                    };
                }
            }

            $scope.onDblClickRow = function (row) {

                $scope.state_array = statesService.getStates();
                var customerID = $routeParams.customerID;
                var cust = customersService.getCustomer(customerID);
                var custName = cust.customerName + ', ' + cust.city;
                var origRow = {};
                var data = {};
                if (row) {
                    origRow = angular.copy(row.entity);
                    data = row.entity;
                }

                var modalDefaults = {
                    templateUrl: 'partials/customer/modalContactEdit.html'
                };
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Submit',
                    headerText: 'Contact at ' + custName,
                    record: data,
                    model1: $scope.state_array
                };

                modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        if (!row) {
                            customersService.insertContact(cust, data);
                        }
                    } else {
                        if (row) {
                            row.entity = origRow;
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
                                headerCellTemplate: 'partials/filterHeaderTemplate.html',
                                width: '*',
                                cellFilter: 'mapCustomerName',
                                displayName: 'Customer'
                            },
                            {
                                field: 'salesPerson',
                                headerCellTemplate: 'partials/filterHeaderTemplate.html',
                                cellFilter: 'mapSalesPerson',
                                width: '*',
                                displayName: 'Sales'
                            },
                            {
                                field: 'discussion',
                                headerCellTemplate: 'partials/filterHeaderTemplate.html',
                                width: '***',
                                displayName: 'Discussion'
                            },
                            {
                                field: 'probability',
                                headerCellTemplate: 'partials/filterHeaderTemplate.html',
                                cellFilter: 'mapProbability',
                                width: '*',
                                displayName: 'Probability'
                            },
                            {
                                field: 'potentialRevenue',
                                headerCellTemplate: 'partials/filterHeaderTemplate.html',
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

    .controller('CustomerEditController', ['$scope', '$routeParams', '$location', 'customersService', 'statesService',

        function ($scope, $routeParams, $location, customersService, statesService) {
            $scope.master = {};
            $scope.customer = {};
            $scope.state_array = [];


            init();

            function init() {
                //Grab planID off of the route
                var customerID = $routeParams.customerID;
                if (customerID) {
                    $scope.customer = customersService.getCustomer(customerID);
                    $scope.master = angular.copy($scope.customer);
                    $scope.state_array = statesService.getStates();
                }
            }

            // function to submit the form after all validation has occurred
            $scope.submitForm = function () {

                // check to make sure the form is completely valid
                if ($scope.customerForm.$valid) {
                    $scope.customer = angular.copy($scope.master);

                    if (!$scope.customer.customerId) {
                        $scope.customer.customerId = 'AAA' + Math.floor(Math.random() * 10000000);
                        customersService.insertCustomer($scope.customer);

                    } else {
                        //assume a service
                        customersService.updateCustomer($scope.customer);
                    }

                    $location.path('/customers');
                }

            };


        }
    ]).controller('CustomerOpportunitiesEditController', ['$scope', '$routeParams', '$location', '$filter', 'customersService',
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
                        headerCellTemplate: 'partials/filterHeaderTemplate.html',
                        width: '*',
                        displayName: 'Sales'
                    },
                    {
                        field: 'followUpDate',
                        headerCellTemplate: 'partials/filterHeaderTemplate.html',
                        width: '*',
                        cellFilter: 'date',
                        displayName: 'Date'
                    },
                    {
                        field: 'Action',
                        headerCellTemplate: 'partials/filterHeaderTemplate.html',
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
                    templateUrl: 'partials/customer/modalOpportunityActionsEdit.html'
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
    ]);
