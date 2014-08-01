/**
 * Created by anthonyhayes on 5/1/14.
 */
angular.module('customersApp.probabilityController', [])
    .controller('ProbabilityController', ['$scope', '$routeParams', '$location', '$filter',
        'ProbabilitiesService', 'ModalService',

        function ($scope, $routeParams, $location, $filter, ProbabilitiesService, ModalService) {

            $scope.master = {};
            $scope.probability_array = ProbabilitiesService.getProbabilities();
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

            $scope.myProbabilities = {
                data: 'probability_array',
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
                        displayName: 'Probability Description'
                    },
                    {
                        field: 'percentage',
                        headerCellTemplate: 'app/partials/util/filterHeaderTemplate.html',
                        width: '***',
                        displayName: 'Percentage'

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
                    actionButtonText: 'Delete Probability',
                    headerText: 'Delete ' + name + '?',
                    bodyText: 'Are you sure you want to delete this probability?'
                };

                ModalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        ProbabilitiesService.deleteProbabilities(row.entity);
                        remove($scope.probability_array, 'name', row.entity.name);
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
                    templateUrl: 'app/partials/admin/probabilities/modalProbabilityEdit.html'
                };
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Submit',
                    headerText: 'Probability Description',
                    record: $scope.master
                };

                ModalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {


                        if (row) {
                            ProbabilitiesService.patchProbabilities($scope.master);
                        } else {
                            ProbabilitiesService.postProbabilities($scope.master);
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

