angular.module('customersApp.companyService', [])

.factory('CompanyServices', function($http) {
    return {
        getCompanies: function(pageNo) {
            //since $http.get returns a promise,
            //and promise.then() also returns a promise
            //that resolves to whatever value is returned in it's
            //callback argument, we can return that.
            return $http.get(dmApplicationEntryPoint, {
                params: {page:pageNo}}).then(function(result) {
                return result.data;
            });
        }
    }
});
