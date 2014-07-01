/**
 * Created by anthonyhayes on 5/20/14.
 */
angular.module('customersApp.chartsController', [])
    .controller('ChartsController', ['$scope', '$routeParams', '$location', '$filter',
         'ChartService', 'CustomersService', 'OpportunityServices',

        function ($scope, $routeParams, $location, $filter,
                  ChartService, CustomersService, OpportunityServices) {

            $scope.selectedDate = new Date(2012, 1, 16).getTime();
            $scope.options = ChartService.chart.multiBarHorizontalChart;
            $scope.opportunityData = CustomersService.getStoredOpportunityData();
            $scope.opportunityDataBySalesPerson = {};

            var chartData = {};
            var savedData;


            if (!$scope.opportunityData) {

                OpportunityServices.getAllOpportunities().then(function (result) {
                    $scope.opportunityData = result;
                    CustomersService.storeOpportunityData(result);

                    // send to chart draw function
                    sliceAndDice();

                });
            } else {
                //send to chart draw function
                sliceAndDice();
            }
            /*organize opportunity data into chart data categories */
            function sliceAndDice() {
                if ($scope.opportunityData.length) {

                    $scope.opportunityDataBySalesPerson = {};


                    angular.forEach($scope.opportunityData, function (opportunity) {
//sales person
                        if ($scope.opportunityDataBySalesPerson[opportunity.statusDescription]) {
                            if ($scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId]) {
                                $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId].count += 1;
                            } else {
                                $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId] = {};
                                $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId].name = opportunity.salesPersonDescription;
                                $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId].count = 1;
                            }
                        } else {
                            $scope.opportunityDataBySalesPerson[opportunity.statusDescription] = {};
                            $scope.opportunityDataBySalesPerson[opportunity.statusDescription].name = opportunity.statusDescription;
                            $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId] = {};
                            $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId].name = opportunity.salesPersonDescription;
                            $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId].count = 1;
                        }
                    });

                } else {
                    //no data!
                    $scope.opportunityDataBySalesPerson = {};
                }
                barChartDataFormatter();
            }

            function barChartDataFormatter() {

                chartData.discreteBarChart = [];
                chartData.discreteBarChart.sales = [];
                var items = 0;
                angular.forEach($scope.opportunityDataBySalesPerson, function (opportunity) {
                    var values = [];
                    angular.forEach(opportunity, function (type) {
                        if (typeof type === 'object') {
                            values.push({"label": type.name, "value": type.count});
                            items++;
                        }
                    });
                    if(values.length){
                        chartData.discreteBarChart.sales.push({"key": opportunity.name, "values": values});
                    }
                });
                $scope.data = chartData.discreteBarChart.sales;
                $scope.options.chart.height = items * 30 + 100;
                $scope.options.chart.yAxis.axisLabel = 'Opportunities by Status'
            }


            // when the date changes, we want to filter and redraw the chart
            $scope.$watch("selectedDate", function (newDate) {

                if (savedData) {
                    $scope.opportunityData = angular.copy(savedData);
                } else {
                    savedData = angular.copy($scope.opportunityData);
                }
                $scope.opportunityData = $filter("dateChartObjectFilter")($scope.opportunityData, newDate);
                // now run function to load/filter the data
                sliceAndDice();

            });

        }
    ]);

