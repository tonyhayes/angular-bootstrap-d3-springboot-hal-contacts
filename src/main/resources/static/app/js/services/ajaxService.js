angular.module('customersApp.ajaxService', [])
//  constructor function to encapsulate HTTP and pagination logic
    .factory('CustomerPages', function ($http) {
        var CustomerPages = function () {
            this.items = [];
            this.busy = false;
            this.pageNo = 0;
            this.allPages = false;
            this.searchText = null;

        };

        CustomerPages.prototype.nextPage = function () {
            if (this.busy) return;
            this.busy = true;

            if (this.searchText) {
                $http.get(dmApplicationEntryPoint + '/companies/search' +
                        '/findByCompanyNameStartsWithOrCityStartsWithOrStateStartsWithOrContactNameStartsWith', {
                        params: {
                            sort: 'companyName', page: this.pageNo,
                            companyName: this.searchText,
                            city: this.searchText,
                            state: this.searchText,
                            contactName: this.searchText}}
                ).success(function (data) {
                        if (data._embedded) {
                            var items = data._embedded.companies;
                            for (var i = 0; i < items.length; i++) {
                                this.items.push(items[i]);
                            }
                            if (data._links && data._links.next) {
                                this.pageNo++;
                                this.busy = false;
                                this.allPages = false;
                            } else {
                                // for filter search always set all pages to false
                                this.allPages = false;
                            }
                        } else {
                            this.items = [];
                        }
                    }.bind(this));

            } else {
                $http.get(dmApplicationEntryPoint + '/companies', {
                    params: {sort: 'companyName', page: this.pageNo}}).success(function (data) {
                    if (data._embedded) {
                        var items = data._embedded.companies;
                        for (var i = 0; i < items.length; i++) {
                            this.items.push(items[i]);
                        }
                        if (data._links && data._links.next) {
                            this.pageNo++;
                            this.busy = false;
                            this.allPages = false;
                        } else {
                            this.allPages = true;
                        }
                    } else {
                        this.items = [];
                    }
                }.bind(this));
            }
        };

        return CustomerPages;
    })
    .factory('CompanyServices', function ($http) {
        var _list = [];
        var _locator = [];

        return {
            // getCompanies not used
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
                if (company.primaryContactId) {
                    company.primaryContact = dmApplicationEntryPoint + '/contacts/' + company.primaryContactId;
                }
                return $http.post(dmApplicationEntryPoint + '/companies', company).then(function (result) {
                    return result.headers('location');
                });
            },
            patchCompany: function (company) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                if (company.primaryContactId) {
                    company.primaryContact = dmApplicationEntryPoint + '/contacts/' + company.primaryContactId;
                }
                var body = angular.copy(company);
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
                var body = angular.copy(company);
                var url = body._links.self.href;
                return $http.delete(url).then(function (result) {
                    return result.data;
                });
            },
            getCompanyList: function(term) {
                return $http.get(dmApplicationEntryPoint + '/companies/search/findByCompanyNameLike', {
                    params: {companyName: term+'%',  page: 0}}).then(function (response) {
                    // have to loop through result because it's key => value
                    _list = [];
                    _locator = [];
                    if(response.data._embedded){
                        for(var key in response.data._embedded.companies) {
                            _list.push(response.data._embedded.companies[key].companyName);
                            _locator.push(response.data._embedded.companies[key].companyId);
                        }
                    }
                    return _list;
                });
            },
            matchCompanyList: function(name) {
                    return _locator[ _list.indexOf(name) ];
             }
        }
    })
//  constructor function to encapsulate HTTP and pagination logic
    .factory('ContactPages', function ($http) {
        var ContactPages = function () {
            this.items = [];
            this.busy = false;
            this.pageNo = 0;
            this.allPages = false;
            this.searchText = null;
            this.company = 0;

        };

        ContactPages.prototype.nextPage = function () {
            if (this.busy) return;
            this.busy = true;

            if (this.searchText) {
                var filter = angular.copy(this.searchText) + '%';
                $http.get(dmApplicationEntryPoint + '/contacts/search' +
                        '/findBySearch', {
                        params: {
                            sort: 'lastName', page: this.pageNo,
                            firstName: filter,
                            city: filter,
                            state: filter,
                            lastName: filter,
                            company: this.company}}
                ).success(function (data) {
                        if (data._embedded) {
                            var items = data._embedded.contacts;
                            for (var i = 0; i < items.length; i++) {
                                this.items.push(items[i]);
                            }
                            if (data._links && data._links.next) {
                                this.pageNo++;
                                this.busy = false;
                                this.allPages = false;
                            } else {
                                // for filter search always set all pages to false
                                this.allPages = false;
                            }
                        } else {
                            this.items = [];
                        }
                    }.bind(this));

            } else {
                $http.get(dmApplicationEntryPoint + '/contacts/search' + '/findByCompany', {
                    params: {sort: 'lastName', page: this.pageNo, company: this.company}}).success(function (data) {
                    if (data._embedded) {
                        var items = data._embedded.contacts;
                        for (var i = 0; i < items.length; i++) {
                            this.items.push(items[i]);
                        }
                        if (data._links && data._links.next) {
                            this.pageNo++;
                            this.busy = false;
                            this.allPages = false;
                        } else {
                            this.allPages = true;
                        }
                    } else {
                        this.items = [];
                    }
                }.bind(this));
            }
        };

        return ContactPages;
    })
    .factory('ContactServices', function ($http) {

        return {
            // getContacts not used
            getContacts: function (company, pageNo, searchText) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                if (searchText) {
                    var filter = angular.copy(searchText) + '%';
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
                    return result.headers('location');
                });
            },
            patchContact: function (contact) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(contact);
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
                var body = angular.copy(contact);
                var url = body._links.self.href;
                delete body._links;
                return $http.delete(url).then(function (result) {
                    return result.data;
                });
            }
        }
    })
//  constructor function to encapsulate HTTP and pagination logic
    .factory('OpportunityPages', function ($http) {
        var OpportunityPages = function () {
            this.items = [];
            this.busy = false;
            this.pageNo = 0;
            this.allPages = false;
            this.searchText = null;
            this.company = 0;

        };

        OpportunityPages.prototype.nextPage = function () {
            if (this.busy) return;
            this.busy = true;

            if (this.searchText) {
                var filter = angular.copy(this.searchText) + '%';
                $http.get(dmApplicationEntryPoint + '/opportunities/search' +
                        '/findBySearch', {
                        params: {
                            sort: 'company.companyName',
                            page: this.pageNo,
                            discussion: filter,
                            name: filter,
                            city: filter,
                            state: filter
                           }}
                ).success(function (data) {
                        if (data._embedded) {
                            var items = data._embedded.opportunities;
                            for (var i = 0; i < items.length; i++) {
                                this.items.push(items[i]);
                            }
                            if (data._links && data._links.next) {
                                this.pageNo++;
                                this.busy = false;
                                this.allPages = false;
                            } else {
                                // for filter search always set all pages to false
                                this.allPages = false;
                            }
                        } else {
                            this.items = [];
                        }
                    }.bind(this));

            } else {
                $http.get(dmApplicationEntryPoint + '/opportunities/search' + '/findByOpportunity', {
                    params: { sort: 'company.companyName', page: this.pageNo}}).success(function (data) {
                    if (data._embedded) {
                        var items = data._embedded.opportunities;
                        for (var i = 0; i < items.length; i++) {
                            this.items.push(items[i]);
                        }
                        if (data._links && data._links.next) {
                            this.pageNo++;
                            this.busy = false;
                            this.allPages = false;
                        } else {
                            this.allPages = true;
                        }
                    } else {
                        this.items = [];
                    }
                }.bind(this));
            }
        };

        return OpportunityPages;
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

                if (opportunity.salesPersonId) {
                    opportunity.sales = dmApplicationEntryPoint + '/salesPersons/' + opportunity.salesPersonId;
                }
                if (opportunity.contactId) {
                    opportunity.contact = dmApplicationEntryPoint + '/contacts/' + opportunity.contactId;
                }
                if (opportunity.probabilityId) {
                    opportunity.probability = dmApplicationEntryPoint + '/probabilities/' + opportunity.probabilityId;
                }
                return $http.post(dmApplicationEntryPoint + '/opportunities', opportunity).then(function (result) {
                    return result.headers('location');
                });
            },
            patchOpportunity: function (opportunity) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                if (opportunity.salesPersonId) {
                    opportunity.sales = dmApplicationEntryPoint + '/salesPersons/' + opportunity.salesPersonId;
                }
                if (opportunity.contactId) {
                    opportunity.contact = dmApplicationEntryPoint + '/contacts/' + opportunity.contactId;
                }
                if (opportunity.probabilityId) {
                    opportunity.probability = dmApplicationEntryPoint + '/probabilities/' + opportunity.probabilityId;
                }
                var body = angular.copy(opportunity);
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
                var body = angular.copy(opportunity);
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
                if (opportunity.salesPersonId) {
                    opportunity.sales = dmApplicationEntryPoint + '/salesPersons/' + opportunity.salesPersonId;
                }
                return $http.post(dmApplicationEntryPoint + '/opportunityDetails', opportunity).then(function (result) {
                    return result.headers('location');
                });
            },
            patchOpportunity: function (opportunity) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                if (opportunity.salesPersonId) {
                    opportunity.sales = dmApplicationEntryPoint + '/salesPersons/' + opportunity.salesPersonId;
                }
                var body = angular.copy(opportunity);
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
                var body = angular.copy(opportunity);
                var url = body._links.self.href;
                delete body._links;
                return $http.delete(url).then(function (result) {
                    return result.data;
                });
            }
        }
    })
    .factory('OpportunityFormServices', function ($http) {

        return {
            getOpportunities: function (opportunity) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint + '/opportunityForms/search' + '/findByOpportunity', {
                    params: {opportunity: opportunity}}).then(function (result) {
                    return result.data;
                });
            },
            getOpportunity: function (opportunityId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint + '/opportunityForms/' + opportunityId).then(function (result) {
                    return result.data;
                });
            },
            postOpportunity: function (opportunity, opportunityId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                opportunity.opportunity = dmApplicationEntryPoint + '/opportunities/' + opportunityId;
                return $http.post(dmApplicationEntryPoint + '/opportunityForms', opportunity).then(function (result) {
                    return result.headers('location');
                });
            },
            patchOpportunity: function (opportunity, opportunityId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                opportunity.opportunity = dmApplicationEntryPoint + '/opportunities/' + opportunityId;
                var body = angular.copy(opportunity);
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
                var body = angular.copy(opportunity);
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
            postStates: function (state) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.post(dmApplicationEntryPoint + '/states', state).then(function (result) {
                    return result.headers('location');
                });
            },
            patchStates: function (state) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(state);
                var url = body._links.self.href;
                delete body._links;
                // angular does not support patch, use put for now
                return $http.put(url, body).then(function (result) {
                    return result.data;
                });
            },
            deleteStates: function (state) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(state);
                var url = body._links.self.href;
                delete body._links;
                return $http.delete(url).then(function (result) {
                    return result.data;
                });
            },
            getStates: function () {
                return states;
            },
            setStates: function (data) {
                states = data._embedded.states;

            },
            setTestStates: function () {
                states = [
                    {
                        "createdAt": 1398782061506,
                        "updatedAt": 1398782061506,
                        "stateAbbr": "TX",
                        "name": "Texas",
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/states/1"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061507,
                        "updatedAt": 1398782061507,
                        "stateAbbr": "OK",
                        "name": "Oklahoma",
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/states/2"
                            }
                        }
                    }
                ];

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
            postSalesPeople: function (sales) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.post(dmApplicationEntryPoint + '/salesPersons', sales).then(function (result) {
                    return result.headers('location');
                });
            },
            patchSalesPeople: function (sales) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(sales);
                var url = body._links.self.href;
                delete body._links;
                // angular does not support patch, use put for now
                return $http.put(url, body).then(function (result) {
                    return result.data;
                });
            },
            deleteSalesPeople: function (sales) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(sales);
                var url = body._links.self.href;
                delete body._links;
                return $http.delete(url).then(function (result) {
                    return result.data;
                });
            },
            getSalesPeople: function () {
                return salesPersons;
            },
            setSalesPeople: function (data) {
                salesPersons = data._embedded.salesPersons;

            },
            setTestSalesPeople: function () {
                salesPersons = [
                    {
                        "createdAt": 1398782061502,
                        "updatedAt": 1398782061502,
                        "firstName": "Chad",
                        "lastName": "Gardner",
                        "title": null,
                        "addressLine1": "89  Frontier Blvd",
                        "addressLine2": "Ste 54",
                        "city": "Houston",
                        "state": "TX",
                        "zip": "77478",
                        "email": "roger@doggers.com",
                        "phone": "832-867.5840",
                        "cell": "713.244.3657",
                        "webPage": null,
                        "notes": "Emily",
                        "salesPersonDescription": "Chad Gardner",
                        "salesPersonId": 1,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/salesPersons/1"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061502,
                        "updatedAt": 1398782061502,
                        "firstName": "Bob",
                        "lastName": "Richards",
                        "title": null,
                        "addressLine1": "89 James Cook  Blvd",
                        "addressLine2": "Ste 45",
                        "city": "Dallas",
                        "state": "TX",
                        "zip": "77478",
                        "email": "roger@doggers.com",
                        "phone": "832-867.5840",
                        "cell": "713.244.3657",
                        "webPage": null,
                        "notes": "Emily",
                        "salesPersonDescription": "Bob Richards",
                        "salesPersonId": 2,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/salesPersons/2"
                            }
                        }
                    }
                ];

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
            postProbabilities: function (probabilities) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.post(dmApplicationEntryPoint + '/probabilities', probabilities).then(function (result) {
                    return result.headers('location');
                });
            },
            patchProbabilities: function (probabilities) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(probabilities);
                var url = body._links.self.href;
                delete body._links;
                // angular does not support patch, use put for now
                return $http.put(url, body).then(function (result) {
                    return result.data;
                });
            },
            deleteProbabilities: function (probabilities) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(probabilities);
                var url = body._links.self.href;
                delete body._links;
                return $http.delete(url).then(function (result) {
                    return result.data;
                });
            },
            getProbabilities: function () {
                return probabilities;
            },
            setProbabilities: function (data) {
                probabilities = data._embedded.probabilities;

            },
            setTestProbabilities: function () {
                probabilities = [
                    {
                        "createdAt": 1398782061505,
                        "updatedAt": 1398782061505,
                        "name": "10%",
                        "percentage": 10,
                        "probabilityId": 1,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/probabilities/1"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061505,
                        "updatedAt": 1398782061505,
                        "name": "20%",
                        "percentage": 20,
                        "probabilityId": 2,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/probabilities/2"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061505,
                        "updatedAt": 1398782061505,
                        "name": "30%",
                        "percentage": 30,
                        "probabilityId": 3,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/probabilities/3"
                            }
                        }
                    }
                ];

            }

        }
    })

    .factory('formComponentService', function ($http) {


        return {
            getOpportunityFormComponents: function () {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint + '/opportunityFormComponents', {
                    params: {sort: 'fieldSequence'}}).then(function (result) {
                    return result.data;
                });
            },
            getOpportunityFormComponent: function (formComponentId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint + '/opportunityFormComponents/' + formComponentId).then(function (result) {
                    return result.data;
                });
            },
            postOpportunityFormComponents: function (opportunityComponent) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.post(dmApplicationEntryPoint + '/opportunityFormComponents', opportunityComponent).then(function (result) {
                    return result.headers('location');
                });
            },
            patchOpportunityFormComponents: function (opportunityComponent) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(opportunityComponent);
                var url = body._links.self.href;
                delete body._links;
                // angular does not support patch, use put for now
                return $http.put(url, body).then(function (result) {
                    return result.data;
                });
            },
            deleteOpportunityFormComponents: function (opportunityComponent) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(opportunityComponent);
                var url = body._links.self.href;
                delete body._links;
                return $http.delete(url).then(function (result) {
                    return result.data;
                });
            },
            getFormComponents: function () {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint + '/formComponents').then(function (result) {
                    return result.data;
                });
            },
            getFormComponent: function (formComponentId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.get(dmApplicationEntryPoint + '/formComponents/' + formComponentId).then(function (result) {
                    return result.data;
                });
            },
            postFormComponents: function (component) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                return $http.post(dmApplicationEntryPoint + '/formComponents', component).then(function (result) {
                    return result.headers('location');
                });
            },
            patchFormComponents: function (component) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(component);
                var url = body._links.self.href;
                delete body._links;
                // angular does not support patch, use put for now
                return $http.put(url, body).then(function (result) {
                    return result.data;
                });
            },
            deleteFormComponents: function (component) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(component);
                var url = body._links.self.href;
                delete body._links;
                return $http.delete(url).then(function (result) {
                    return result.data;
                });
            }

        }
    });

