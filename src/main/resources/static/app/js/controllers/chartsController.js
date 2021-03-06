/**
 * Created by anthonyhayes on 5/20/14.
 */
angular.module('customersApp.chartsController', [])
    .controller('ChartsController', ['$scope', '$routeParams', '$location', '$filter',
         'ChartService', 'CustomersService', 'OpportunityServices', 'StatusService',

        function ($scope, $routeParams, $location, $filter,
                  ChartService, CustomersService, OpportunityServices, StatusService) {

            $scope.selectedDate = new Date(2012, 1, 16).getTime();
            $scope.options = ChartService.chart.multiBarHorizontalChart;

            $scope.opportunityData = CustomersService.getStoredOpportunityData();
            $scope.opportunityDataBySalesPerson = {};

            var chartData = {};
            var savedData;
            var status_array = StatusService.getStatus;

            $scope.radioModel = 'revenue';

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
                if ($scope.opportunityData && $scope.opportunityData.length) {

                    $scope.opportunityDataBySalesPerson = {};


                    angular.forEach(status_array, function (status) {
                        $scope.opportunityDataBySalesPerson[status.description] = {};
                    });


                    angular.forEach($scope.opportunityData, function (opportunity) {

                        if(!opportunity.statusDescription){
                            opportunity.statusDescription = 'n/a';
                        }
                        if(!opportunity.salesPersonId){
                            opportunity.salesPersonId = '99999';
                        }
                        if(!opportunity.salesPersonDescription || opportunity.salesPersonDescription == ' '){
                            opportunity.salesPersonDescription = 'Unknown';
                        }
                        if(!opportunity.potentialRevenue){
                            opportunity.potentialRevenue = 0;
                        }

                            /* for each status, set an object
                            each salesperson must have a record in each status
                             */

//sales person
                        if ($scope.opportunityDataBySalesPerson[opportunity.statusDescription]) {
                            if ($scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId]) {
                                $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId].count += 1;
                                if (opportunity.potentialRevenue){
                                    if (typeof opportunity.potentialRevenue === 'string') {
                                        var money = parseFloat(opportunity.potentialRevenue.replace(/[^\d\.]/g, ''));
                                    }else{
                                        money = opportunity.potentialRevenue;
                                    }
                                    $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId].money += money;
                                }
                            } else {
                                $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId] = {};
                                $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId].name = opportunity.salesPersonDescription;
                                $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId].count = 1;
                                if (opportunity.potentialRevenue){
                                    if (typeof opportunity.potentialRevenue === 'string') {
                                        var money = parseFloat(opportunity.potentialRevenue.replace(/[^\d\.]/g, ''));
                                    }else{
                                        money = opportunity.potentialRevenue;
                                    }
                                    $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId].money = money;
                                }
                            }
                        } else {
                            $scope.opportunityDataBySalesPerson[opportunity.statusDescription] = {};
                            $scope.opportunityDataBySalesPerson[opportunity.statusDescription].name = opportunity.statusDescription;
                            $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId] = {};
                            $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId].name = opportunity.salesPersonDescription;
                            $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId].count = 1;
                            if (opportunity.potentialRevenue){
                                if (typeof opportunity.potentialRevenue === 'string') {
                                    var money = parseFloat(opportunity.potentialRevenue.replace(/[^\d\.]/g, ''));
                                }else{
                                    money = opportunity.potentialRevenue;
                                }
                                $scope.opportunityDataBySalesPerson[opportunity.statusDescription][opportunity.salesPersonId].money = money;
                            }
                        }
                    });

                } else {
                    //no data!
                    $scope.opportunityDataBySalesPerson = {};
                }
                barChartDataFormatter();
            }

            function barChartDataFormatter() {

                chartData.multiBarHorizontalChart = [];
                chartData.multiBarHorizontalChart.sales = [];
                var names = [];
                var items = 0;
                angular.forEach($scope.opportunityDataBySalesPerson, function (opportunity) {
                    var values = [];
                    angular.forEach(opportunity, function (type) {
                        if (typeof type === 'object') {
                            if($scope.countValue){
                                values.push({"label": type.name, "value": type.count});
                            }else{
                                values.push({"label": type.name, "value": type.money});
                            }
                            items++;
                            var idx = names.indexOf(type.name);
                            // empty
                            if (idx === -1) {
                                names.push(type.name);
                            }
                        }
                    });
                    if(values.length){
                        chartData.multiBarHorizontalChart.sales.push({"key": opportunity.name, "values": values});
                    }
                });

                // now read through each data object and add any missing status types for a salesman
                angular.forEach(names, function (person) {

                    angular.forEach(chartData.multiBarHorizontalChart.sales, function (status) {

                        if(status.values.length !== names.length ){
                            var found = false;
                            angular.forEach(status.values, function (sales) {
                                if(sales.label === person){
                                    found = true;
                                }
                            });

                            if (!found){
                                status.values.push({label: person, value: 0})
                            }
                            sortJSON(status.values, 'label', '123');
                        }

                    });
                });

                $scope.data = chartData.multiBarHorizontalChart.sales;


                $scope.options.chart.height = items * 30 + 100;
                if($scope.countValue){
                    $scope.options.chart.yAxis.axisLabel = 'Opportunities by Deals'
                }else{
                    $scope.options.chart.yAxis.axisLabel = 'Opportunities by Revenue'
                }
            }


            // when the date changes, we want to filter and redraw the chart
            $scope.$watch("countValue", function (value) {

                barChartDataFormatter();
            });

            // when the revenue/deal button changes , we want to redraw the chart
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

            function sortJSON(data, key, way) {
                return data.sort(function (a, b) {
                    var x = a[key];
                    var y = b[key];
                    if (way === '123') {
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    }
                    if (way === '321') {
                        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                    }
                });
            }


        }
    ]);

