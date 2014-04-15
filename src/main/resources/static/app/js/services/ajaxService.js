angular.module('customersApp.ajaxService', [])

    .factory('CompanyServices', function ($http) {
        var companySearch;

        return {
            getCompanies: function (pageNo, searchText) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                if(searchText){
                    return $http.get(companySearch+
                            '/findByCompanyNameStartsWithOrCityStartsWithOrStateStartsWithOrContactNameStartsWith', {
                            params: {

                                companyName: searchText,
                                city: searchText,
                                state: searchText,
                                contactName: searchText}}
                    ).then(function (result) {
                            //this sends back the search URL
                            return result.data;
                        });
                }else{
                    return $http.get(dmApplicationEntryPoint, {
                        params: {sort: 'companyName',page: pageNo}}).then(function (result) {
                        companySearch = result.data._links.search.href;
                        return result.data;
                    });
                }
            },
            postCompany: function (company) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.post(dmApplicationEntryPoint,  company).then(function (result) {
                    return result.data;
                });
            },
            patchCompany: function (company) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(company)
                var url = body._links.self.href;
                delete body._links;
                // angular does not support patch, use put for now
                return $http.put(url, body).then(function (result) {
                    return result.data;
                });
            },
            deleteCompany: function (company) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(company)
                var url = body._links.self.href;
                return $http.delete(url).then(function (result) {
                    return result.data;
                });
            }
        }
    })
    .factory('ContactServices', function ($http) {

        var contactPost;
        return {
            getContacts: function (url, pageNo) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                contactPost = url;
                return $http.get(url, {
                    params: {sort: 'lastName', page: pageNo}}).then(function (result) {
                     return result.data;
                });
            },
            postContact: function (contact) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                contact.company = contactPost+'/company';
                return $http.put(contactPost,  contact).then(function (result) {
                    return result.data;
                });
            },
            patchContact: function (contact) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(contact)
                var url = body._links.self.href;
                delete body._links;
                // angular does not support patch, use put for now
                return $http.put(url, body).then(function (result) {
                    return result.data;
                });
            },
            deleteContact: function (contact) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(contact)
                var url = body._links.self.href;
                delete body._links;
                return $http.delete(url).then(function (result) {
                    return result.data;
                });
            }
        }
    })
    .factory('OpportunityServices', function ($http) {

        var opportunityPost;
        return {
            getOpportunities: function (url, pageNo) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                opportunityPost = url;

                return $http.get(url, {
                    params: {page: pageNo}}).then(function (result) {
                     return result.data;
                });
            },
            postOpportunity: function (opportunity) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.post(opportunityPost,  opportunity).then(function (result) {
                    return result.data;
                });
            },
            patchOpportunity: function (opportunity) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(opportunity)
                var url = body._links.self.href;
                delete body._links;
                // angular does not support patch, use put for now
                return $http.put(url, body).then(function (result) {
                    return result.data;
                });
            },
            deleteOpportunity: function (opportunity) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(opportunity)
                var url = body._links.self.href;
                delete body._links;
                return $http.delete(url).then(function (result) {
                    return result.data;
                });
            }
        }
    })
    .factory('statesService', function ($http) {
        var states = [];
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
