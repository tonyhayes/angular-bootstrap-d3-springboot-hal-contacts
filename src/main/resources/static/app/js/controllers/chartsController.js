/**
 * Created by anthonyhayes on 5/20/14.
 */
angular.module('customersApp.chartsController', [])
    .controller('ChartsController', ['$scope', '$routeParams', '$location', '$filter',
        'ModalService', 'ChartService', 'CustomersService',
        'CompanyServices','SalesPersonService','ProbabilitiesService', 'OpportunityServices',

        function ($scope, $routeParams, $location, $filter,
                  ModalService, ChartService, CustomersService,
                  CompanyServices,SalesPersonService,ProbabilitiesService, OpportunityServices) {

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


            if (!$scope.opportunityData) {

                OpportunityServices.getAllOpportunities().then(function (data) {
                    $scope.opportunity = data;
                    CustomersService.storeOpportunityData(data);

                    // send to chart draw function
                });
            }else{
                //send to chart draw function
            }



            $scope.chartType = function (type) {

                $scope.options = ChartService.chart[type];
                $scope.data = data[type];

            };

            $scope.chartGroupBy = function(attribute){

                $scope[attribute]  = !$scope[attribute];
                switch(attribute) {
                    case 'companySelect':
                        $scope.salesSelect  = !$scope[attribute];
                        break;
                    case 'salesSelect':
                        $scope.companySelect  = !$scope[attribute];
                        break;
                }

            };
            $scope.chartSelectBy = function(attribute){

                $scope[attribute]  = !$scope[attribute];
                switch(attribute) {
                    case 'countSelect':
                        $scope.potentialRevenueSelect  = !$scope[attribute];
                        $scope.calculatedRevenueSelect  = false;
                        break;
                    case 'potentialRevenueSelect':
                        $scope.countSelect  = !$scope[attribute];
                        $scope.calculatedRevenueSelect  = false;
                        break;
                    case 'calculatedRevenueSelect':
                        $scope.countSelect  = !$scope[attribute];
                        $scope.potentialRevenueSelect  = false;
                        break;
                }

            };

            $scope.chartFilter = function (filter){

                var filterGroup = [];

                switch(filter) {
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
                    headerText: 'Select a '+filter+' For This Chart',
                    bodyText: 'Type to locate',
                    record: filterGroup,
                    model1: filter
                };

                ModalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    if (result === 'ok') {
                        switch(filter) {
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

                    }
                });

            };

            $scope.getList = function(term) {
                if (term){
                    switch($scope.modalOptions.model1) {
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

