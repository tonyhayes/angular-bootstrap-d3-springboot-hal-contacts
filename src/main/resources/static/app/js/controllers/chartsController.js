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
                        { "label": "A", "value": -29.765957771107 },
                        { "label": "B", "value": 0 },
                        { "label": "C", "value": 32.807804682612 },
                        { "label": "D", "value": 196.45946739256 },
                        { "label": "E", "value": 0.19434030906893 },
                        { "label": "F", "value": -98.079782601442 },
                        { "label": "G", "value": -13.925743130903 },
                        { "label": "H", "value": -5.1387322875705 }
                    ]
                }
            ];
            data.lineChart = sinAndCos();
            data.pieChart = [
                {
                    key: "One",
                    y: 5
                },
                {
                    key: "Two",
                    y: 2
                },
                {
                    key: "Three",
                    y: 9
                },
                {
                    key: "Four",
                    y: 7
                },
                {
                    key: "Five",
                    y: 4
                },
                {
                    key: "Six",
                    y: 3
                },
                {
                    key: "Seven",
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
                        key: 'Sine Wave', //key  - the name of the series.
                        color: '#ff7f0e'  //color - optional: choose your own line color.
                    },
                    {
                        values: cos,
                        key: 'Cosine Wave',
                        color: '#2ca02c'
                    },
                    {
                        values: sin2,
                        key: 'Another sine wave',
                        color: '#7777ff',
                        area: true      //area - set to true if you want this line to turn into a filled area chart.
                    }
                ];
            };





        }
    ]);

