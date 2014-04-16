/**
 * Created by anthonyhayes on 4/14/14.
 */
angular.module('customersApp.contactControllers', [])
//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is bound to the details view
    .controller('ContactsController', ['$scope', '$routeParams', '$location', '$filter','customersService', 'modalService', 'statesService', 'ContactServices',

        function ($scope, $routeParams, $location, $filter, customersService, modalService, statesService, ContactServices) {
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
            $scope.companyNumber;

            init();

            function init() {
                //Grab contacts for company
                $scope.companyNumber = parseInt($routeParams.customerID);

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
                    ContactServices.getContacts($scope.companyNumber, $scope.pageNo, $scope.searchText).then(function (data) {
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
                        }
                    });

                }


            }


            function getContactSummary() {
                if (!$scope.scroll.stop) {

                    //stop the scrolling while we are reloading - important!
                    $scope.scroll.stop = true;
                    $scope.pageNo = 1;

                    //make the call to getCompanies and handle the promise returned;
                    ContactServices.getContacts($scope.companyNumber, 0,$scope.searchText).then(function (data) {
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
                         }
                    });
                }

            }


            function filterContacts(filterText) {
                $scope.scroll.stop = false;
                getContactSummary()
            }

            $scope.editContact = function (contact) {

                $scope.state_array = statesService.getStates();
                var custName = $scope.customer.companyName + ', ' + $scope.customer.city;
                var origCard = {};
                var editContact = true;
                if (contact) {
                    origCard = angular.copy(contact);
                }else{
                    contact = {};
                    editContact = false;
                }

                var modalDefaults = {
                    templateUrl: 'app/partials/customer/modalContactEdit.html'
                };
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Submit',
                    headerText: 'Contact at ' + custName,
                    record: contact,
                    model1: $scope.state_array
                };

                modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        if (editContact) {
                            ContactServices.patchContact(contact);
                        }else{
                            ContactServices.postContact(contact);
                        }
                    } else {
                        if (contact) {
                            angular.forEach(origCard, function(obj, dataset) {
                                contact[dataset] = obj;
                            });
                        }
                    }
                });
            };
        }
    ]);
