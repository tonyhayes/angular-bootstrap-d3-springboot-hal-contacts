/**
 * Created by anthonyhayes on 5/1/14.
 */
angular.module('customersApp.probabilityController', [])
    .controller('probabilityController', ['$scope', '$routeParams', '$location', '$filter',
        'probabilitiesService', 'modalService',

        function ($scope, $routeParams, $location, $filter,
                   probabilitiesService, modalService) {

            $scope.master = {};
            $scope.probability_array = probabilitiesService.getProbabilities();
            $scope.filterOptions = {
                filterText: ''
            };



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

            $scope.myProbabilities = {
                data: 'probability_array',
                showGroupPanel: true,
                groups: [],
                showColumnMenu: true,
                plugins: [filterBarPlugin],
                headerRowHeight: 60, // give room for filter bar
                rowTemplate: templateCache,
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
                        width: '65',
                        cellTemplate: '<button ng-click="delete(row)">Delete</button>'
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

                modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        probabilitiesService.deleteProbabilities(row.entity);
                        remove($scope.probability_array, 'name', row.entity.name);
                    }
                });

            };

            // parse the  array to find the object
            function remove(array, property, value) {
                $.each(array, function(index, result) {
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

                    modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                        if (result === 'ok') {


                            if (row) {
                                probabilitiesService.patchProbabilities($scope.master);
                            } else {
                                probabilitiesService.postProbabilities($scope.master);
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

