/**
 * Created by anthonyhayes on 5/1/14.
 */
angular.module('customersApp.statusController', [])
    .controller('StatusController', ['$scope', '$routeParams', '$location', '$filter',
        'StatusService', 'ModalService',

        function ($scope, $routeParams, $location, $filter, StatusService, ModalService) {

            $scope.master = {};
            $scope.status_array = StatusService.getConfiguredStatus();
            StatusService.getConfiguredStatus().then(function (result) {
                $scope.status_array =  StatusService.getStatus();
            });
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

            $scope.myStatus = {
                data: 'status_array',
                showGroupPanel: true,
                groups: [],
                showColumnMenu: true,
                plugins: [filterBarPlugin],
                headerRowHeight: 60, // give room for filter bar
                rowTemplate: 'app/partials/util/rowTemplate.html',
                filterOptions: $scope.filterOptions,
                columnDefs: [

                    {
                        field: 'name',
                        headerCellTemplate: 'app/partials/util/filterHeaderTemplate.html',
                        width: '*',
                        displayName: 'Status Name'
                    },
                    {
                        field: 'description',
                        headerCellTemplate: 'app/partials/util/filterHeaderTemplate.html',
                        width: '***',
                        displayName: 'Status Description'

                    },
                    { field: '',
                        width: '40',
                        cellTemplate: 'app/partials/util/cellTemplateButtonDelete.html'
                    }
                ]
            };

            $scope.delete = function (row) {

                var name = row.entity.name;

                var modalDefaults = {
                    templateUrl: 'app/partials/util/modal.html'
                };
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Delete Status',
                    headerText: 'Delete ' + name + '?',
                    bodyText: 'Are you sure you want to delete this status?'
                };

                ModalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        StatesService.deleteStatus(row.entity);
                        remove($scope.status_array, 'name', row.entity.name);
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
                    templateUrl: 'app/partials/admin/status/modalStatusEdit.html'
                };
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Submit',
                    headerText: 'Status',
                    record: $scope.master
                };

                ModalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {


                        if (row) {
                            StatusService.patchStatus($scope.master);
                        } else {
                            StatusService.postStatus($scope.master);
                            $scope.status_array.push($scope.master);
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

