/**
 * Created by anthonyhayes on 4/16/14.
 */
angular.module('customersApp.applicationControllers', [])

    .controller("appController", [
        "$scope", "$timeout", "$q", '$location',
        "customersService", "statesService", "salesPersonService", "probabilitiesService",
        "formComponentService", "formComponentFormatService",
        function ($scope, $timeout, $q, $location, customersService, statesService, salesPersonService, probabilitiesService, formComponentService, formComponentFormatService) {

            $scope.isCurrentPath = function (path) {
                return $location.path() == path;
            };

            $scope.loadingDone = false;


            $scope.fail = function () {
                console.log('User handling promise rejected');
            };


            // use $q.all to wait until all promises are resolved
            $q.all([
                statesService.getConfiguredStates(),
                salesPersonService.getConfiguredSalesPeople(),
                probabilitiesService.getConfiguredProbabilities(),
                formComponentService.getFormComponents(),
                formComponentService.getOpportunityFormComponents()
            ]).then(
                function (data) {
                    if (data[0]._embedded) {
                        statesService.setStates(data[0]);
                    }
                    if (data[1]) {
                        salesPersonService.setSalesPeople(data[1]);
                    }
                    if (data[2]) {
                        probabilitiesService.setProbabilities(data[2]);
                    }
                    if (data[3] && data[4]) {
                        formComponentFormatService.setOpportunityForm(data[3], data[4]);
                    }
                    console.log('All services are resolved!');
                    // when evdrything has loaded, flip the switch, and let the
                    // routes do their work
                    $scope.loadingDone = true;
                },
                function (reason) {
                    // if any of the promises fails, handle it
                    // here, I'm just throwing an error message to
                    // the user.
                    $scope.failure = reason;
                });

        }
    ])
    //this controller is in charge of the loading bar,
    // it's quick and dirty, and does nothing fancy.
    .controller("loadingController", [
        "$scope", "$timeout",
        function ($scope, $timeout) {
            $scope.percentDone = 0;

            function animateBar() {
                // very crude timeout based animator
                // just to illustrate the sample
                $scope.percentDone += 25;
                if ($scope.loadingDone) {
                    // this is thighly coupled to the appController
                    return;
                }
                $timeout(animateBar, 200);

            }

            animateBar();
        }
    ])
// autocomplete controller for companies
    .controller("loadingCompaniesController", [
        "$scope", "CompanyServices",
        function ($scope, CompanyServices) {

            $scope.getList = function(term) {
                var items = CompanyServices.getCompanyList(term);
                return items;
            }

         }
    ]);
