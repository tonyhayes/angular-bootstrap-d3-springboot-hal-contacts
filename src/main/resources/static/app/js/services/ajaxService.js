angular.module('customersApp.ajaxService', [])

    .factory('CompanyServices', function ($http) {

        return {
            getCompanies: function (pageNo, searchText) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                if (searchText) {
                    return $http.get(dmApplicationEntryPoint + '/companies/search' +
                            '/findByCompanyNameStartsWithOrCityStartsWithOrStateStartsWithOrContactNameStartsWith', {
                            params: {
                                sort: 'companyName', page: pageNo,
                                companyName: searchText,
                                city: searchText,
                                state: searchText,
                                contactName: searchText}}
                    ).then(function (result) {
                            //this sends back the search URL
                            return result.data;
                        });
                } else {
                    return $http.get(dmApplicationEntryPoint + '/companies', {
                        params: {sort: 'companyName', page: pageNo}}).then(function (result) {
                        return result.data;
                    });
                }
            },
            getCompany: function (companyId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint + '/companies/' + companyId).then(function (result) {
                    return result.data;
                });
            },
            postCompany: function (company) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                if(company.primaryContactId){
                    company.primaryContact = dmApplicationEntryPoint + '/contacts/' + company.primaryContactId;
                }
                return $http.post(dmApplicationEntryPoint + '/companies', company).then(function (result) {
                    return result.data;
                });
            },
            patchCompany: function (company) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                if(company.primaryContactId){
                    company.primaryContact = dmApplicationEntryPoint + '/contacts/' + company.primaryContactId;
                }
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

        return {
            getContacts: function (company, pageNo, searchText) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                if (searchText) {
                    var filter = angular.copy(searchText)+'%';
                    return $http.get(dmApplicationEntryPoint + '/contacts/search' +
                            '/findBySearch', {
                            params: {
                                sort: 'lastName', page: pageNo,
                                firstName: filter,
                                city: filter,
                                state: filter,
                                lastName: filter,
                                company: company}}
                    ).then(function (result) {
                            //this sends back the search URL
                            return result.data;
                        });
                } else {
                    return $http.get(dmApplicationEntryPoint + '/contacts/search' + '/findByCompany', {
                        params: {sort: 'lastName', page: pageNo, company: company}}).then(function (result) {
                        return result.data;
                    });
                }
            },
            getAllContacts: function (company) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                    return $http.get(dmApplicationEntryPoint + '/contacts/search' + '/findAllByCompany', {
                        params: {company: company}}).then(function (result) {
                        return result.data;
                    });
            },
            postContact: function (contact, companyId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                contact.company = dmApplicationEntryPoint + '/companies/' + companyId;
                return $http.post(dmApplicationEntryPoint + '/contacts', contact).then(function (result) {
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

        return {
            getOpportunities: function (company) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint + '/opportunities/search' + '/findAllByCompany', {
                    params: {company: company}}).then(function (result) {
                    return result.data;
                });
            },
            getOpportunity: function (opportunityId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint + '/opportunities/' + opportunityId).then(function (result) {
                    return result.data;
                });
            },
            postOpportunity: function (opportunity, companyId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                opportunity.company = dmApplicationEntryPoint + '/companies/' + companyId;

                if(opportunity.salesPersonId){
                    opportunity.sales = dmApplicationEntryPoint + '/salesPersons/' + opportunity.salesPersonId;
                }
                if(opportunity.contactId){
                    opportunity.contact = dmApplicationEntryPoint + '/contacts/' + opportunity.contactId;
                }
                return $http.post(dmApplicationEntryPoint + '/opportunities', opportunity).then(function (result) {
                    return result.data;
                });
            },
            patchOpportunity: function (opportunity) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                if(opportunity.salesPersonId){
                    opportunity.sales = dmApplicationEntryPoint + '/salesPersons/' + opportunity.salesPersonId;
                }
                if(opportunity.contactId){
                    opportunity.contact = dmApplicationEntryPoint + '/contacts/' + opportunity.contactId;
                }
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
    .factory('OpportunityDetailServices', function ($http) {

        return {
            getOpportunities: function (opportunity) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint + '/opportunityDetails/search' + '/findByOpportunity', {
                    params: {opportunity: opportunity}}).then(function (result) {
                    return result.data;
                });
            },
            getOpportunity: function (opportunityId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint + '/opportunityDetails/' + opportunityId).then(function (result) {
                    return result.data;
                });
            },
            postOpportunity: function (opportunity, companyId, opportunityId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                opportunity.company = dmApplicationEntryPoint + '/companies/' + companyId;
                opportunity.opportunity = dmApplicationEntryPoint + '/opportunities/' + opportunityId;
                if(opportunity.salesPersonId){
                    opportunity.sales = dmApplicationEntryPoint + '/salesPersons/' + opportunity.salesPersonId;
                }
                return $http.post(dmApplicationEntryPoint + '/opportunityDetails', opportunity).then(function (result) {
                    return result.data;
                });
            },
            patchOpportunity: function (opportunity) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                if(opportunity.salesPersonId){
                    opportunity.sales = dmApplicationEntryPoint + '/salesPersons/' + opportunity.salesPersonId;
                }
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
                return $http.get(dmApplicationEntryPoint + '/states').then(function (result) {
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
    })
    .factory('salesPersonService', function ($http) {
        var salesPersons = [];
        return {
            getConfiguredSalesPeople: function () {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint + '/salesPersons').then(function (result) {
                    return result.data;
                });
            },
            getSalesPeople: function () {
                return salesPersons;
            },
            setSalesPeople: function (data) {
                salesPersons = data._embedded.salesPersons;

            }

        }
    })
    .factory('probabilitiesService', function ($http) {
        var probabilities = [];
        return {
            getConfiguredProbabilities: function () {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint + '/probabilities').then(function (result) {
                    return result.data;
                });
            },
            getProbabilities: function () {
                return probabilities;
            },
            setProbabilities: function (data) {
                probabilities = data._embedded.probabilities;

            }

        }
    })
