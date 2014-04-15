/**
 * Created by anthonyhayes on 4/14/14.
 */
angular.module('customersApp.opportunityControllers', [])
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
    ]);
