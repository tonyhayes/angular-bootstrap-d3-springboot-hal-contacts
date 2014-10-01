/**
 * Created by anthonyhayes on 4/16/14.
 */
angular.module('customersApp.applicationControllers', [])

    .controller("ApplicationController", [
        "$scope", "$timeout", "$q", '$location',
        "StatesService", "SalesPersonService", "ProbabilitiesService",
        "FormComponentService", "FormComponentFormatService", "StatusService",
        function ($scope, $timeout, $q, $location, StatesService, SalesPersonService, ProbabilitiesService,
                  FormComponentService, FormComponentFormatService,StatusService ) {

            $scope.isCurrentPath = function (path) {
                return $location.path() == path;
            };

            $scope.loadingDone = false;


            $scope.fail = function () {
                console.log('User handling promise rejected');
            };

            // use $q.all to wait until all promises are resolved
            $q.all([
                StatesService.getConfiguredStates(),
                SalesPersonService.getConfiguredSalesPeople(),
                ProbabilitiesService.getConfiguredProbabilities(),
                FormComponentService.getFormComponents(),
                FormComponentService.getOpportunityFormComponents(),
                StatusService.getConfiguredStatus()
            ]).then(
                function (data) {
                    if (data[0]._embedded) {
                        StatesService.setStates(data[0]);
                    }
                    if (data[1]._embedded) {
                        SalesPersonService.setSalesPeople(data[1]);
                    }
                    if (data[2]._embedded) {
                        ProbabilitiesService.setProbabilities(data[2]);
                    }
                    if (data[3]._links && data[4]._links) {
                        FormComponentFormatService.setOpportunityForm(data[3], data[4]);
                    }
                    if (data[5]._embedded) {
                        StatusService.setStatus(data[5]);
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
    .controller("LoadingController", [
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
    .controller("LoadingCompaniesController", [
        "$scope", "CompanyServices",
        function ($scope, CompanyServices) {

            $scope.getList = function (term) {
                var items = CompanyServices.getCompanyList(term);
                return items;
            };

        }
    ])

;
