/* Controllers */

angular.module('customersApp.customerControllers', [])


//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is ultimately bound to the customers view
    .controller('CustomersController', ['$scope', '$location', '$filter', 'CompanyServices', 'customersService', 'modalService',

        function ($scope, $location, $filter, CompanyServices, customersService, modalService) {

            $scope.customers = [];
            $scope.scroll = {};
            $scope.scroll.stop = true;
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
                });

            };

            function init() {
                createWatches();
                getCustomersSummary();
            }

            $scope.navigate = function (url, customerObject) {
                var companyArray = [0];
                if (customerObject) {
                    customersService.storeCustomer(customerObject);
                    companyArray = customerObject._links.self.href.split('/')
                }

                $location.path(url + '/' + companyArray[companyArray.length - 1]);
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
                    CompanyServices.getCompanies($scope.pageNo, $scope.searchText).then(function (data) {
                        //this will execute when the
                        //AJAX call completes.
                        if (data && data._embedded) {
                            var items = data._embedded.companies;
                            for (var i = 0; i < items.length; i++) {
                                $scope.customers.push(items[i]);
                            }

                            if (data._links && data._links.next) {
                                $scope.scroll.next = data._links.next.href;
                                $scope.scroll.stop = false;
                                $scope.pageNo++;
                            } else {
                                $scope.scroll.next = '';
                                $scope.scroll.stop = true;

                            }
                        } else {
                            $scope.scroll.next = '';
                            $scope.scroll.stop = true;
                            if($scope.searchText) {
                                $scope.customers = [];
                            }

                        }


                        console.log(data);
                        if ($scope.customers) {
                            $scope.totalRecords = $scope.customers.length;
                        }
                    });

                }


            }


            function getCustomersSummary() {
                if (!$scope.scroll.stop) {

                    //stop the scrolling while we are reloading - important!
                    $scope.scroll.stop = true;
                    $scope.pageNo = 1;

                    //make the call to getCompanies and handle the promise returned;
                    CompanyServices.getCompanies(0, $scope.searchText).then(function (data) {
                        //this will execute when the
                        //AJAX call completes.
                        if (data && data._embedded) {
                            $scope.customers = data._embedded.companies;
                            if (data._links && data._links.next) {
                                $scope.scroll.next = data._links.next.href;
                                $scope.scroll.stop = false;
                            } else {
                                $scope.scroll.next = '';
                                $scope.scroll.stop = true;
                            }

                        } else {
                            $scope.scroll.next = '';
                            $scope.scroll.stop = true;
                            $scope.customers = [];
                        }


                        console.log(data);
                        if ($scope.customers) {
                            $scope.totalRecords = $scope.customers.length;
                        }
                    });
                }

            }


            function filterCustomers(filterText) {
                $scope.scroll.stop = false;
                getCustomersSummary()
            }
        }
    ])


    .controller('CustomerEditController', ['$scope', '$routeParams', '$location', 'customersService', 'statesService',
        'CompanyServices', 'ContactServices',

        function ($scope, $routeParams, $location, customersService, statesService,
                  CompanyServices, ContactServices) {
            $scope.master = {};
            $scope.customer = {};
            $scope.state_array = statesService.getStates();
            $scope.customerId = 0;
            $scope.contact_array = [];


            init();

            function init() {
                //Grab ID off of the route
                $scope.customerId = parseInt($routeParams.customerID);
                if ($scope.customerId) {

                    // get all contacts for contact drop down
                    ContactServices.getAllContacts($scope.customerId).then(function (data) {
                        $scope.contact_array = data._embedded.contacts;
//                            $scope.customerOpportunitiesForm.$setPristine();
                    });

                    $scope.customer = customersService.getStoredCustomer();

                    // if the user reloads the page, I need to get the data from the server then reset the form
                    // as the promise is resolved after the page has been rendered
                    if (!$scope.customer) {
                        CompanyServices.getCompany($scope.customerId).then(function (data) {
                            $scope.customer = data;
                            $scope.master = angular.copy($scope.customer);
                            $scope.customerForm.$setPristine();
                            customersService.storeCustomer(data);
                        });
                    }
                    $scope.master = angular.copy($scope.customer);
                }
            }

            // function to submit the form after all validation has occurred
            $scope.submitForm = function () {

                // check to make sure the form is completely valid
                if ($scope.customerForm.$valid) {
                    $scope.customer = angular.copy($scope.master);

                    if ($scope.customerId) {
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

