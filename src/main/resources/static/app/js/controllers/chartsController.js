/**
 * Created by anthonyhayes on 5/20/14.
 */
angular.module('customersApp.chartsController', [])
    .controller('ChartsController', ['$scope', '$routeParams', '$location', '$filter',
        'ModalService', 'ChartService',

        function ($scope, $routeParams, $location, $filter, ModalService, ChartService) {

            $scope.companySelect = true;
            $scope.salesSelect = true;

            //           $scope.options = ChartService.chart.discreteBarChart;
            $scope.options = ChartService.chart.lineChart;

            $scope.chartType = function (type) {

                $scope.options = ChartService.chart[type];
                $scope.data = data[type];

            };

            $scope.chartAttribute = function(attribute){

              $scope[attribute]  = !$scope[attribute];

            };

            $scope.chartFilter = function (filter){
                var modalDefaults = {
                    templateUrl: 'app/partials/charts/modalFilterSelection.html'
                };
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Next',
                    headerText: 'Select Company For This Opportunity',
                    bodyText: 'Type to locate a company',
                    record: $scope.selectedCompany
                };

                ModalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {


                    }
                });

            };

            var data = {};
            data.discreteBarChart =  [
                {
                    key: "Cumulative Return",
                    values: [
                        { "label": "Andy", "value": -29.765957771107 },
                        { "label": "Betty", "value": 0 },
                        { "label": "Cindy", "value": 32.807804682612 },
                        { "label": "Dave", "value": 196.45946739256 },
                        { "label": "Eloise", "value": 0.19434030906893 },
                        { "label": "Fin", "value": -98.079782601442 },
                        { "label": "Ginny", "value": -13.925743130903 },
                        { "label": "Harry", "value": -5.1387322875705 }
                    ]
                }
            ];
            data.lineChart = sinAndCos();
            data.pieChart = [
                {
                    key: "Andy",
                    y: 5
                },
                {
                    key: "Jenny",
                    y: 2
                },
                {
                    key: "Mike",
                    y: 9
                },
                {
                    key: "Barry",
                    y: 7
                },
                {
                    key: "Phillip",
                    y: 4
                },
                {
                    key: "Sarah",
                    y: 3
                },
                {
                    key: "Steve",
                    y: .5
                }
            ];
            data.donutChart = data.pieChart;


            $scope.data = sinAndCos();

            /*Random Data Generator */
            function sinAndCos() {
                var sin = [],sin2 = [],
                    cos = [];

                //Data is represented as an array of {x,y} pairs.
                for (var i = 0; i < 100; i++) {
                    sin.push({x: i, y: Math.sin(i/10)});
                    sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
                    cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
                }

                //Line chart data should be sent as an array of series objects.
                return [
                    {
                        values: sin,      //values - represents the array of {x,y} data points
                        key: 'Jennys Opportunties', //key  - the name of the series.
                        color: '#ff7f0e'  //color - optional: choose your own line color.
                    },
                    {
                        values: cos,
                        key: 'Peters Opportunties',
                        color: '#2ca02c'
                    },
                    {
                        values: sin2,
                        key: 'Ronalds Opportunties',
                        color: '#7777ff',
                        area: true      //area - set to true if you want this line to turn into a filled area chart.
                    }
                ];
            };





        }
    ]);

