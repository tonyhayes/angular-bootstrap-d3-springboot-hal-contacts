angular.module('customersApp.ajaxService', [])

    .factory('CompanyServices', function ($http) {
        return {
            getCompanies: function (pageNo) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint, {
                    params: {page: pageNo}}).then(function (result) {
                    return result.data;
                });
            }
        }
    })
    .factory('statesService', function ($http) {
        var states;
        return {
            getConfiguredStates: function () {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmStates).then(function (result) {
                    return result.data;
                });
            },
            getStates: function () {
                return states;
            },
            setStates: function (data) {
                states = data._embedded.states;
            }

        }
    });
