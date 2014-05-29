/**
 * Created by anthonyhayes on 5/20/14.
 */
angular.module('customersApp.chartsController', [])
    .controller('ChartsController', ['$scope', '$routeParams', '$location', '$filter',
        'ModalService', 'ChartService', 'CustomersService',
        'CompanyServices', 'SalesPersonService', 'ProbabilitiesService', 'OpportunityServices',

        function ($scope, $routeParams, $location, $filter, ModalService, ChartService, CustomersService, CompanyServices, SalesPersonService, ProbabilitiesService, OpportunityServices) {

            $scope.companySelect = true;
            $scope.salesSelect = false;
            $scope.countSelect = true;
            $scope.potentialRevenueSelect = false;
            $scope.calculatedRevenueSelect = false;
            $scope.selectedSalesTags = [];
            $scope.selectedProbabilityTags = [];
            $scope.selectedCompanyTags = [];
            $scope.options = ChartService.chart.lineChart;
            $scope.opportunityData = CustomersService.getStoredOpportunityData();
            $scope.opportunityDataByCompany = CustomersService.getStoredOpportunityDataByCompany();
            $scope.opportunityDataBySalesPerson = CustomersService.getStoredOpportunityDataBySalesPerson();
            $scope.opportunityDataByCompanyDate = CustomersService.getStoredOpportunityDataByCompanyDate();
            $scope.opportunityDataBySalesPersonDate = CustomersService.getStoredOpportunityDataBySalesPersonDate();
            var chartData = {};
            var chartType = 'multiBarHorizontalChart';


            if (!$scope.opportunityData) {
//                var modalDefaults = {
//                    templateUrl: 'app/partials/charts/modalDancingElephants.html'
//                };
//
//                var modalOptions = {
//                    closeButtonText: 'Cancel',
//                    actionButtonText: 'OK',
//                    headerText: 'Opportunity Charts',
//                    bodyText: 'Lorem Ipsum'
//                };
//
//                ModalService.showModal(modalDefaults, modalOptions).then(function (result) {
//                    if (result === 'ok') {
//
//                    }
//                });

                OpportunityServices.getAllOpportunities().then(function (result) {
                    $scope.opportunityData = result;
                    CustomersService.storeOpportunityData(result);

                    // send to chart draw function
                    sliceAndDice();

                });
            } else {
                if (!$scope.opportunityDataByCompany) {
                    //send to chart draw function
                    sliceAndDice();
                }
            }


            /*organize opportunity data into chart data categories */
            function sliceAndDice() {

                angular.forEach($scope.opportunityData, function (opportunity) {
                    var potentialRevenue = parseInt(opportunity.potentialRevenue);
                    if (!potentialRevenue) {
                        opportunity.potentialRevenue = 0;
                    }
//company
                    if ($scope.opportunityDataByCompany[opportunity.companyId]) {
                        $scope.opportunityDataByCompany[opportunity.companyId].count += 1;

                        // I'm not sure how to calculate the relative probability over multiple deals, for now  - just a simple average
                        $scope.opportunityDataByCompany[opportunity.companyId].potentialRevenue += parseInt(opportunity.potentialRevenue);

                        $scope.opportunityDataByCompany[opportunity.companyId].probability = (opportunity.probabilityPercentage + $scope.opportunityDataByCompany[opportunity.companyId].probability) / 2;
                        $scope.opportunityDataByCompany[opportunity.companyId].calulatedRevenue += parseInt(opportunity.potentialRevenue) / opportunity.probabilityPercentage;


                    } else {
                        $scope.opportunityDataByCompany[opportunity.companyId] = {};
                        $scope.opportunityDataByCompany[opportunity.companyId].name = opportunity.companyName;
                        $scope.opportunityDataByCompany[opportunity.companyId].count = 1;
                        $scope.opportunityDataByCompany[opportunity.companyId].potentialRevenue = opportunity.potentialRevenue;
                        $scope.opportunityDataByCompany[opportunity.companyId].probability = opportunity.probabilityPercentage;
                        $scope.opportunityDataByCompany[opportunity.companyId].calulatedRevenue = opportunity.potentialRevenue / opportunity.probabilityPercentage;

                    }
//sales person
                    if ($scope.opportunityDataBySalesPerson[opportunity.salesId]) {
                        $scope.opportunityDataBySalesPerson[opportunity.salesId].count += 1;

                        // I'm not sure how to calculate the relative probability over multiple deals, for now  - just a simple average
                        $scope.opportunityDataBySalesPerson[opportunity.salesId].potentialRevenue += parseInt(opportunity.potentialRevenue);

                        $scope.opportunityDataBySalesPerson[opportunity.salesId].probability = (opportunity.probabilityPercentage + $scope.opportunityDataByCompany[opportunity.companyId].probability) / 2;
                        $scope.opportunityDataBySalesPerson[opportunity.salesId].calulatedRevenue += parseInt(opportunity.potentialRevenue) / opportunity.probabilityPercentage;


                    } else {
                        $scope.opportunityDataBySalesPerson[opportunity.salesId] = {};
                        $scope.opportunityDataBySalesPerson[opportunity.salesId].name = opportunity.salesPersonDescription;
                        $scope.opportunityDataBySalesPerson[opportunity.salesId].count = 1;
                        $scope.opportunityDataBySalesPerson[opportunity.salesId].potentialRevenue = parseInt(opportunity.potentialRevenue);
                        $scope.opportunityDataBySalesPerson[opportunity.salesId].probability = opportunity.probabilityPercentage;
                        $scope.opportunityDataBySalesPerson[opportunity.salesId].calulatedRevenue = parseInt(opportunity.potentialRevenue) / opportunity.probabilityPercentage;

                    }
//company and date
                    if ($scope.opportunityDataByCompanyDate[opportunity.companyId]) {
                        if ($scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt]) {
                            $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].count += 1;

                            // I'm not sure how to calculate the relative probability over multiple deals, for now  - just a simple average
                            $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].potentialRevenue += parseInt(opportunity.potentialRevenue);

                            $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].probability = (opportunity.probabilityPercentage + $scope.opportunityDataByCompany[opportunity.companyId].probability) / 2;
                            $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].createdAt = opportunity.createdAt;
                            $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].calulatedRevenue += parseInt(opportunity.potentialRevenue) / opportunity.probabilityPercentage;
                        } else {
                            $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt] = {};
                            $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].name = opportunity.companyName;
                            $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].count = 1;
                            $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].potentialRevenue = opportunity.potentialRevenue;
                            $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].probability = opportunity.probabilityPercentage;
                            $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].calulatedRevenue = opportunity.potentialRevenue / opportunity.probabilityPercentage;
                            $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].createdAt = opportunity.createdAt;
                        }


                    } else {
                        $scope.opportunityDataByCompanyDate[opportunity.companyId] = {};
                        $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt] = {};
                        $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].name = opportunity.companyName;
                        $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].count = 1;
                        $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].potentialRevenue = opportunity.potentialRevenue;
                        $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].probability = opportunity.probabilityPercentage;
                        $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].calulatedRevenue = opportunity.potentialRevenue / opportunity.probabilityPercentage;
                        $scope.opportunityDataByCompanyDate[opportunity.companyId][opportunity.createdAt].createdAt = opportunity.createdAt;

                    }

// sales person and date
                    if ($scope.opportunityDataBySalesPersonDate[opportunity.salesId]) {
                        if ($scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt]) {
                            $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].count += 1;

                            // I'm not sure how to calculate the relative probability over multiple deals, for now  - just a simple average
                            $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].potentialRevenue += parseInt(opportunity.potentialRevenue);

                            $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].probability = (opportunity.probabilityPercentage + $scope.opportunityDataByCompany[opportunity.companyId].probability) / 2;
                            $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].calulatedRevenue += parseInt(opportunity.potentialRevenue) / opportunity.probabilityPercentage;
                            $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].createdAt = opportunity.createdAt;
                        } else {
                            $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt] = {};
                            $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].name = opportunity.companyName;
                            $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].count = 1;
                            $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].potentialRevenue = opportunity.potentialRevenue;
                            $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].probability = opportunity.probabilityPercentage;
                            $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].calulatedRevenue = opportunity.potentialRevenue / opportunity.probabilityPercentage;
                            $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].createdAt = opportunity.createdAt;
                        }


                    } else {
                        $scope.opportunityDataBySalesPersonDate[opportunity.salesId] = {};
                        $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt] = {};
                        $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].name = opportunity.companyName;
                        $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].count = 1;
                        $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].potentialRevenue = opportunity.potentialRevenue;
                        $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].probability = opportunity.probabilityPercentage;
                        $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].calulatedRevenue = opportunity.potentialRevenue / opportunity.probabilityPercentage;
                        $scope.opportunityDataBySalesPersonDate[opportunity.salesId][opportunity.createdAt].createdAt = opportunity.createdAt;

                    }


                });
                CustomersService.storeOpportunityDataByCompany(angular.copy($scope.opportunityDataByCompany));
                CustomersService.storeOpportunityDataBySalesPerson(angular.copy($scope.opportunityDataBySalesPerson));
                CustomersService.storeOpportunityDataByCompanyDate(angular.copy($scope.opportunityDataByCompanyDate));
                CustomersService.storeOpportunityDataBySalesPersonDate(angular.copy($scope.opportunityDataBySalesPersonDate));

            }

            /*
             function where user changes the chart.
             -- reformat the data to correspond with the chart
             */
            $scope.chartType = function (type) {

                $scope.options = ChartService.chart[type];
                chartDataFormatter(type);
                chartType = type;

            };

            function chartDataFormatter(type) {

                switch (type) {
                    case 'lineChart':
                        lineChartDataFormatter(type);
                        break;
                    case 'pieChart':
                        pieChartDataFormatter(type);
                        break;
                    case 'multiBarHorizontalChart':
                        barChartDataFormatter(type);
                        break;
                    case 'stackedAreaChart':
                        stackedAreaChartFormatter(type);
                        break;

                }

            }

            function barChartDataFormatter(type) {
                // data can either be selected by count, potential revenue or calculated revenue

                chartData.discreteBarChart = [
                    {
                        key: "Opportunities",
                        values: []
                    }
                ];
                if ($scope.companySelect) {

                    chartData.discreteBarChart.company = [
                        {
                            key: "Opportunities",
                            values: []
                        }
                    ];
                    angular.forEach($scope.opportunityDataByCompany, function (opportunity) {
                        if ($scope.countSelect) {
                            chartData.discreteBarChart.company[0].values.push({"label": opportunity.name, "value": opportunity.count});
                        } else if ($scope.potentialRevenueSelect) {
                            chartData.discreteBarChart.company[0].values.push({"label": opportunity.name, "value": opportunity.potentialRevenue});
                        } else {
                            chartData.discreteBarChart.company[0].values.push({"label": opportunity.name, "value": opportunity.calulatedRevenue});
                        }
                    });
                    $scope.data = chartData.discreteBarChart.company;
                    $scope.options.chart.height = chartData.discreteBarChart.company[0].values.length * 50 + 100;
                }
                else {
                    chartData.discreteBarChart.sales = [
                        {
                            key: "Opportunities",
                            values: []
                        }
                    ];
                    angular.forEach($scope.opportunityDataBySalesPerson, function (opportunity) {
                        if ($scope.countSelect) {
                            chartData.discreteBarChart.sales[0].values.push({"label": opportunity.name, "value": opportunity.count});
                        } else if ($scope.potentialRevenueSelect) {
                            chartData.discreteBarChart.sales[0].values.push({"label": opportunity.name, "value": opportunity.potentialRevenue});
                        } else {
                            chartData.discreteBarChart.sales[0].values.push({"label": opportunity.name, "value": opportunity.calulatedRevenue});
                        }
                    });
                    $scope.data = chartData.discreteBarChart.sales;
                    $scope.options.chart.height = chartData.discreteBarChart.sales[0].values.length * 50 + 100;
                }


            }

            function pieChartDataFormatter(type) {
                // data can either be selected by count, potential revenue or calculated revenue
                // potential solution to label crowding - http://jsfiddle.net/2uT7F/

                chartData.pieChart = [];
                if ($scope.companySelect) {

                    chartData.pieChart.company = [
                    ];
                    angular.forEach($scope.opportunityDataByCompany, function (opportunity) {
                        if ($scope.countSelect) {
                            chartData.pieChart.company.push({"key": opportunity.name, "y": opportunity.count});
                        } else if ($scope.potentialRevenueSelect) {
                            chartData.pieChart.company.push({"key": opportunity.name, "y": opportunity.potentialRevenue});
                        } else {
                            chartData.pieChart.company.push({"key": opportunity.name, "y": opportunity.calulatedRevenue});
                        }
                    });
                    $scope.data = chartData.pieChart.company;
                }
                else {
                    chartData.pieChart.sales = [];
                    angular.forEach($scope.opportunityDataBySalesPerson, function (opportunity) {
                        if ($scope.countSelect) {
                            chartData.pieChart.sales.push({"key": opportunity.name, "y": opportunity.count});
                        } else if ($scope.potentialRevenueSelect) {
                            chartData.pieChart.sales.push({"key": opportunity.name, "y": opportunity.potentialRevenue});
                        } else {
                            chartData.pieChart.sales.push({"key": opportunity.name, "y": opportunity.calulatedRevenue});
                        }
                    });
                    $scope.data = chartData.pieChart.sales;
                }
//                var width = 500,
//                    height = 500,
//                    radius = width / 3;
//
//                var color = d3.scale.ordinal()
//                    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
//
//                var arc = d3.svg.arc()
//                    .outerRadius(radius - 10)
//                    .innerRadius(0);
//
//                var pie = d3.layout.pie()
//                    .sort(null)
//                    .value(function(d) { return d.value; });
//
//                var svg = d3.select("body").append("svg")
//                    .attr("width", width)
//                    .attr("height", height)
//                    .append("g")
//                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
//
//
//                var data_values = [1, 1, 1, 1, 1, 48, 1, 1, 4];
//                var titles = ["New Zealand", "Australia", "Scotland", "Italy", "Canada", "USA", "United Kingdom", "Austria", "Ireland"]
//
//                var data = []
//
//                for (var x=0;x<data_values.length;x++){
//                    var tmp = {}
//                    tmp.label = titles[x]
//                    tmp.value = data_values[x]
//                    data.push(tmp)
//                }
//
//                var g = svg.selectAll(".arc")
//                    .data(pie(data))
//                    .enter().append("g")
//                    .attr("class", "arc");
//
//                g.append("path")
//                    .attr("d", arc)
//                    .style("fill", function(d) { return color(d.data.label); });
//
//                var pos = d3.svg.arc().innerRadius(radius + 2).outerRadius(radius + 2);
//
//                var getAngle = function (d) {
//                    return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
//                };
//
//                g.append("text")
//                    .attr("transform", function(d) {
//                        return "translate(" + pos.centroid(d) + ") " +
//                            "rotate(" + getAngle(d) + ")"; })
//                    .attr("dy", 5)
//                    .style("text-anchor", "start")
//                    .text(function(d) { return d.data.label; });


            }

// need better requirements before I can craft line charts or area charts

            function stackedAreaChartFormatter(type) {
                // data can either be selected by count, potential revenue or calculated revenue
                chartData.stackedAreaChart = [];
                if ($scope.companySelect) {

                    chartData.stackedAreaChart.company = [];
                    // opportunityData is in company order
                    var name;

                    angular.forEach($scope.opportunityDataByCompanyDate, function (createdAt) {
                        angular.forEach(createdAt, function (opportunity) {
                            if (name != opportunity.name) {
                                chartData.stackedAreaChart.company.push({"key": opportunity.name, "values": []});
                                name = opportunity.name;
                            }
                            if ($scope.countSelect) {
                                ele = chartData.stackedAreaChart.company.length - 1;
                                var dataArr = [opportunity.createdAt, opportunity.count];
                                chartData.stackedAreaChart.company[ele].values.push(dataArr);

                            } else if ($scope.potentialRevenueSelect) {
                                ele = chartData.stackedAreaChart.company.length - 1;
                                var dataArr = [opportunity.createdAt, opportunity.potentialRevenue];
                                chartData.stackedAreaChart.company[ele].values.push(dataArr);
                            } else {
                                ele = chartData.stackedAreaChart.company.length - 1;
                                var dataArr = [opportunity.createdAt, opportunity.calulatedRevenue];
                                chartData.stackedAreaChart.company[ele].values.push(dataArr);
                            }
                        });
                    });

                    $scope.data = chartData.stackedAreaChart.company;
                }
                else {
                    chartData.stackedAreaChart.sales = [];
                    // opportunityData is in company order
                    var name;

                    angular.forEach($scope.opportunityDataBySalesPersonDate, function (createdAt) {
                        angular.forEach(createdAt, function (opportunity) {
                            if (name != opportunity.name) {
                                chartData.stackedAreaChart.sales.push({"key": opportunity.name, "values": []});
                                name = opportunity.name;
                            }
                            if ($scope.countSelect) {
                                ele = chartData.stackedAreaChart.sales.length - 1;
                                var dataArr = [opportunity.createdAt, opportunity.count];
                                chartData.stackedAreaChart.sales[ele].values.push(dataArr);

                            } else if ($scope.potentialRevenueSelect) {
                                ele = chartData.stackedAreaChart.sales.length - 1;
                                var dataArr = [opportunity.createdAt, opportunity.potentialRevenue];
                                chartData.stackedAreaChart.sales[ele].values.push(dataArr);
                            } else {
                                ele = chartData.stackedAreaChart.sales.length - 1;
                                var dataArr = [opportunity.createdAt, opportunity.calulatedRevenue];
                                chartData.stackedAreaChart.sales[ele].values.push(dataArr);
                            }
                        });
                    });

                    $scope.data = chartData.stackedAreaChart.sales;
                }


            }


            $scope.chartGroupBy = function (attribute) {

                $scope[attribute] = !$scope[attribute];
                switch (attribute) {
                    case 'companySelect':
                        $scope.salesSelect = !$scope[attribute];
                        break;
                    case 'salesSelect':
                        $scope.companySelect = !$scope[attribute];
                        break;
                }
                chartDataFormatter(chartType);

            };

            $scope.chartSelectBy = function (attribute) {

                $scope[attribute] = !$scope[attribute];
                switch (attribute) {
                    case 'countSelect':
                        $scope.potentialRevenueSelect = !$scope[attribute];
                        $scope.calculatedRevenueSelect = false;
                        break;
                    case 'potentialRevenueSelect':
                        $scope.countSelect = !$scope[attribute];
                        $scope.calculatedRevenueSelect = false;
                        break;
                    case 'calculatedRevenueSelect':
                        $scope.countSelect = !$scope[attribute];
                        $scope.potentialRevenueSelect = false;
                        break;
                }
                chartDataFormatter(chartType);

            };

            $scope.chartFilter = function (filter) {

                var filterGroup = [];

                switch (filter) {
                    case 'Company':
                        filterGroup = angular.copy($scope.selectedCompanyTags);
                        break;
                    case 'Sales Person':
                        filterGroup = angular.copy($scope.selectedSalesTags);
                        break;
                    case 'Probability':
                        filterGroup = angular.copy($scope.selectedProbabilityTags);
                        break;
                }


                var modalDefaults = {
                    templateUrl: 'app/partials/charts/modalFilterSelection.html'
                };

                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'OK',
                    headerText: 'Select a ' + filter + ' For This Chart',
                    bodyText: 'Type to locate',
                    record: filterGroup,
                    model1: filter
                };

                ModalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        switch (filter) {
                            case 'Company':
                                $scope.selectedCompanyTags = angular.copy(filterGroup);
                                break;
                            case 'Sales Person':
                                $scope.selectedSalesTags = angular.copy(filterGroup);
                                break;
                            case 'Probability':
                                $scope.selectedProbabilityTags = angular.copy(filterGroup);
                                break;
                        }

                        // now run function to load/filter the data
                        sliceAndDice();
                        chartDataFormatter(chartType);

                    }
                });

            };

            $scope.getList = function (term) {
                if (term) {
                    switch ($scope.modalOptions.model1) {
                        case 'Company':
                            var items = CompanyServices.getCompanyList(term);
                            return items;
                            break;
                        case 'Sales Person':
                            var items = SalesPersonService.getSalesList(term);
                            return items;
                            break;
                        case 'Probability':
                            var items = ProbabilitiesService.getProbabilitiesList(term);
                            return items;
                            break;
                    }

                }
            };


            $scope.data = sinAndCos();

            /*Random Data Generator */
            function sinAndCos() {
                var sin = [], sin2 = [],
                    cos = [];

                //Data is represented as an array of {x,y} pairs.
                for (var i = 0; i < 100; i++) {
                    sin.push({x: i, y: Math.sin(i / 10)});
                    sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i / 10) * 0.25 + 0.5});
                    cos.push({x: i, y: .5 * Math.cos(i / 10 + 2) + Math.random() / 10});
                }

                //Line chart data should be sent as an array of series objects.
                return [
                    {
                        values: sin,      //values - represents the array of {x,y} data points
                        key: 'Jennys Opportunities', //key  - the name of the series.
                        color: '#ff7f0e'  //color - optional: choose your own line color.
                    },
                    {
                        values: cos,
                        key: 'Peters Opportunities',
                        color: '#2ca02c'
                    },
                    {
                        values: sin2,
                        key: 'Ronalds Opportunities',
                        color: '#7777ff',
                        area: true      //area - set to true if you want this line to turn into a filled area chart.
                    }
                ];
            };


        }
    ]);

