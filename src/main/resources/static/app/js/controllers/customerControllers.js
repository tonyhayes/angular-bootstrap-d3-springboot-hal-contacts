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

