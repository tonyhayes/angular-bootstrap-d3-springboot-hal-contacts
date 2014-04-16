/**
 * Created by anthonyhayes on 4/14/14.
 */
angular.module('customersApp.opportunityControllers', [])
//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is bound to the details view
    .controller('CustomerOpportunityController', ['$scope', '$routeParams', '$location',
        'customersService', 'modalService','OpportunityServices','CompanyServices',

        function ($scope, $routeParams, $location, customersService, modalService, OpportunityServices, CompanyServices) {

            //Grab customerID off of the route
            $scope.customerID = parseInt($routeParams.customerID);

            $scope.customer = customersService.getStoredCustomer();
            if (!$scope.customer) {
                CompanyServices.getCompany($scope.customerID).then(function (data) {
                    $scope.customer = data;
                    customersService.storeCustomer(data);
                });
            }
            $scope.filterOptions = {
                filterText: ''
            };


            init();


            function init() {


                var templateCache =
                        "<div ng-dblclick=\"onDblClickRow(row)\" <div ng-style=\"{ 'cursor': row.cursor }\" ng-repeat=\"col in renderedColumns\" ng-class=\"col.colIndex()\" class=\"ngCell {{col.cellClass}}\">\r" +
                        "\n" +
                        "\t<div class=\"ngVerticalBar\" ng-style=\"{height: rowHeight}\" ng-class=\"{ ngVerticalBarVisible: !$last }\">&nbsp;</div>\r" +
                        "\n" +
                        "\t<div ng-cell></div>\r" +
                        "\n" +
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
                $scope.myOpportunities = {
                    data: 'opportunities',
                    showGroupPanel: true,
                    groups: [],
                    showColumnMenu: true,
                    plugins: [filterBarPlugin],
                    headerRowHeight: 60, // give room for filter bar
                    rowTemplate: templateCache,
                    filterOptions: $scope.filterOptions,
                    columnDefs: [
                        {
                            field: 'salesPersonDescription',
                            headerCellTemplate: 'app/partials/filterHeaderTemplate.html',
                            width: '*',
                            displayName: 'Sales Person'
                        },
                        {
                            field: 'contactDescription',
                            headerCellTemplate: 'app/partials/filterHeaderTemplate.html',
                            width: '*',
                            displayName: 'Contact Name'
                        },
                        {
                            field: 'discussion',
                            headerCellTemplate: 'app/partials/filterHeaderTemplate.html',
                            width: '***',
                            displayName: 'Discussion'
                        },
                        {
                            field: 'probabilityDescription',
                            headerCellTemplate: 'app/partials/filterHeaderTemplate.html',
                            width: '*',
                            displayName: 'Probability'
                        },
                        {
                            field: 'potentialRevenue',
                            headerCellTemplate: 'app/partials/filterHeaderTemplate.html',
                            width: '*',
                            displayName: 'Potential Revenue'
                        }
                    ]
                };


                if ($scope.customerID) {

                    //make the call to getCompanies and handle the promise returned;
                    OpportunityServices.getOpportunities($scope.customerID).then(function (data) {
                        //this will execute when the
                        //AJAX call completes.
                        $scope.opportunities = data._embedded.opportunities;

                     });

                }
            }

            $scope.onDblClickRow = function (row) {

                var cust = customersService.getStoredCustomer();
                var custName = cust.customerName + ', ' + cust.city;
                var id = 'new';


                if (row) {
                    id = row.entity.id;
                }

                $location.path('customerOpportunitiesEdit/' + $scope.customerID + '/' + id);


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
                "<div ng-dblclick=\"onDblClickRow(row)\" <div ng-style=\"{ 'cursor': row.cursor }\" ng-repeat=\"col in renderedColumns\" ng-class=\"col.colIndex()\" class=\"ngCell {{col.cellClass}}\">\r" +
                "\n" +
                "\t<div class=\"ngVerticalBar\" ng-style=\"{height: rowHeight}\" ng-class=\"{ ngVerticalBarVisible: !$last }\">&nbsp;</div>\r" +
                "\n" +
                "\t<div ng-cell></div>\r" +
                "\n" +
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
