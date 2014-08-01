/**
 * Created by anthonyhayes on 5/1/14.
 */
angular.module('customersApp.salesPersonController', [])
    .controller('SalesPersonController', ['$scope', '$routeParams', '$location', '$filter',
        'SalesPersonService', 'ModalService',

        function ($scope, $routeParams, $location, $filter, SalesPersonService, ModalService) {

            $scope.master = {};
            $scope.salesPeople_array = SalesPersonService.getSalesPeople();
            $scope.filterOptions = {
                filterText: ''
            };



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

            $scope.mySalesPeople = {
                data: 'salesPeople_array',
                showGroupPanel: true,
                groups: [],
                showColumnMenu: true,
                plugins: [filterBarPlugin],
                headerRowHeight: 60, // give room for filter bar
                rowTemplate: 'app/partials/util/rowTemplate.html',
                filterOptions: $scope.filterOptions,
                columnDefs: [

                    {
                        field: 'firstName',
                        headerCellTemplate: 'app/partials/util/filterHeaderTemplate.html',
                        width: '*',
                        displayName: 'First Name'
                    },
                    {
                        field: 'lastName',
                        headerCellTemplate: 'app/partials/util/filterHeaderTemplate.html',
                        width: '***',
                        displayName: 'Last Name'

                    },
                    {
                        field: 'addressLine1',
                        headerCellTemplate: 'app/partials/util/filterHeaderTemplate.html',
                        width: '***',
                        displayName: 'Address Line 1'

                    },
                    {
                        field: 'city',
                        headerCellTemplate: 'app/partials/util/filterHeaderTemplate.html',
                        width: '***',
                        displayName: 'City'

                    },
                    { field: '',
                        width: '40',
                        cellTemplate: 'app/partials/util/cellTemplateButtonDelete.html'
                    }
                ]
            };

            $scope.delete = function (row) {

                var name = row.entity.firstName + ' ' + row.entity.lastName;

                var modalDefaults = {
                    templateUrl: 'app/partials/util/modal.html'
                };
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Delete Sales Person',
                    headerText: 'Delete ' + name + '?',
                    bodyText: 'Are you sure you want to delete this sales person?'
                };

                ModalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        SalesPersonService.deleteSalesPeople(row.entity);
                        remove($scope.salesPeople_array, 'salesPersonId', row.entity.salesPersonId);
                    }
                });

            };

            // parse the  array to find the object
            function remove(array, property, value) {
                $.each(array, function (index, result) {
                    if (result && result[property] == value) {
                        array.splice(index, 1);
                    }
                });
            }

            $scope.onDblClickRow = function (row) {

                var origRow = {};
                $scope.master = {};
                if (row) {
                    origRow = angular.copy(row.entity);
                    $scope.master = row.entity;
                }


                var modalDefaults = {
                    templateUrl: 'app/partials/admin/sales/modalSalesPersonEdit.html'
                };
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Submit',
                    headerText: 'Sales Person',
                    record: $scope.master
                };

                ModalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {


                        if (row) {
                            SalesPersonService.patchSalesPeople($scope.master);
                        } else {
                            SalesPersonService.postSalesPeople($scope.master);
                            $scope.probability_array.push($scope.master);
                        }
                    } else {
                        if (row) {
                            angular.forEach(origRow, function (obj, dataset) {
                                row.entity[dataset] = obj;
                            });
                        }
                    }
                });
            };
        }
    ]);

