/* Controllers */

angular.module('customersApp.customerControllers', [])


//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is ultimately bound to the customers view
    .controller('CustomersController', ['$scope', '$location', '$filter',
        'CompanyServices', 'CustomersService', 'ModalService', 'CustomerPages',

        function ($scope, $location, $filter, CompanyServices, CustomersService, ModalService, CustomerPages) {

            $scope.customerPages = new CustomerPages();
            createWatches();

            $scope.deleteCustomer = function (idx, cust) {

                var custName = cust.companyName + ' ' + cust.city;

                var modalDefaults = {
                    templateUrl: 'app/partials/util/modal.html'
                };
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Delete Customer',
                    headerText: 'Delete ' + custName + '?',
                    bodyText: 'Are you sure you want to delete this customer?'
                };

                ModalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        CompanyServices.deleteCompany(cust);
                        $scope.customerPages.items.splice(idx, 1);
                    }
                });

            };


            $scope.navigate = function (url, customerObject) {
                var companyArray = [0];
                if (customerObject) {
                    CustomersService.storeCustomer(customerObject);
                    companyArray = customerObject._links.self.href.split('/');
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


            function filterCustomers(filterText) {
                    $scope.customerPages.allPages = false;
                    $scope.customerPages.searchText = filterText;
                    $scope.customerPages.pageNo = 0;
                    $scope.customerPages.busy = false;
                    $scope.customerPages.items = [];
                    $scope.customerPages.nextPage();
            }
        }
    ])


    .controller('CustomerEditController', ['$scope', '$routeParams', '$location',
        'CustomersService', 'StatesService',
        'CompanyServices', 'ContactServices',

        function ($scope, $routeParams, $location, CustomersService, StatesService, CompanyServices, ContactServices) {
            $scope.master = {};
            $scope.customer = {};
            $scope.state_array = StatesService.getStates();
            $scope.customerId = 0;
            $scope.contact_array = [];
            $scope.buttonEdit = false;


            //Grab ID off of the route
            $scope.customerId = parseInt($routeParams.customerID);
            if ($scope.customerId) {

                // get all contacts for contact drop down
                ContactServices.getAllContacts($scope.customerId).then(function (data) {
                    if (data._embedded) {
                        $scope.contact_array = data._embedded.contacts;
                    }
                });

                CompanyServices.getCompany($scope.customerId).then(function (data) {
                        $scope.customer = data;
                        $scope.master = angular.copy($scope.customer);
                        $scope.customerForm.$setPristine();
                        CustomersService.storeCustomer(data);
                    });
                $scope.master = angular.copy($scope.customer);
            }

            if ($scope.customerId == 0){
                $scope.buttonEdit = true;
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
    ]);

