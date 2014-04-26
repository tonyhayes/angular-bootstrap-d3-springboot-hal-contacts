angular.module('customersApp.ajaxService', [])
//  constructor function to encapsulate HTTP and pagination logic
    .factory('CustomerPages', function($http) {
        var CustomerPages = function() {
            this.items = [];
            this.busy = false;
            this.pageNo = 0;
            this.allPages = false;
            this.searchText = null;

        };

        CustomerPages.prototype.nextPage = function() {
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
                     }.bind(this));

            } else {
                $http.get(dmApplicationEntryPoint + '/companies', {
                    params: {sort: 'companyName', page: this.pageNo}}).success(function (data) {
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
                }.bind(this));
            }
        };

        return CustomerPages;
    })
    .factory('CompanyServices', function ($http) {

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
            }
        }
    })
//  constructor function to encapsulate HTTP and pagination logic
    .factory('ContactPages', function($http) {
        var ContactPages = function() {
            this.items = [];
            this.busy = false;
            this.pageNo = 0;
            this.allPages = false;
            this.searchText = null;
            this.company = 0;

        };

        ContactPages.prototype.nextPage = function() {
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
                    }.bind(this));

            } else {
                $http.get(dmApplicationEntryPoint + '/contacts/search' + '/findByCompany', {
                    params: {sort: 'lastName', page: this.pageNo, company: this.company}}).success(function (data) {
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
    .factory('formUpdateService', function (formComponentService) {
        return {
            updateForm: function (oldForm, newForm, form) {
                // delete everything, then post
                if (oldForm) {
                    angular.forEach(oldForm, function (field) {
                        if (field._links) {
                            // the delete command is self contained so any service can process it
                            formComponentService.deleteFormComponents(field);
                        }
                    });
                }

                // reformat options
                // then send them up to the host

                if (newForm) {
                    angular.forEach(newForm, function (field) {

                     /*
                     field_options: Object
                        1: Object
                        option_title: "won"
                        option_value: "1"
                        __proto__: Object
                        2: Object
                        3: Object

                        transform into

                      options: Array[3]
                      0: Object
                      option_id: "1"
                      option_title: "won"
                      option_value: "1"

                        */

                        if (field._links) {
                            delete field._links;
                        }

                        if (field.field_options) {

                            field.options = [];

                            angular.forEach(field.field_options, function (fieldOption, fieldOptionId) {
                                var field_option = {};
                                field_option.option_title = fieldOption.option_title;
                                field_option.option_value = fieldOption.option_value;
                                field_option.option_id = fieldOptionId;
                                field.options.push(field_option)
                            });


                            delete field.field_options;
                        }

                        // send to host, then get back the location in order to send options

                        if (form === 'global') {
                            formComponentService.postFormComponents(field);
                        } else {
                            formComponentService.postOpportunityFormComponents(field)
                        }
                    });
                }
            }
        }
    })

    .factory('formComponentService', function ($http, FormService) {

        var dynamicForm = [];
        var opportunityForm = [];
        var customFormTypes = [];
        var customFormFields = [];

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
            },
            getCustomFormTypes: function () {
                return customFormTypes;
            },
            getCustomFormFields: function () {
                return customFormFields;
            },
            getCustomFormField: function (type) {
                var formField = {};
                angular.forEach(customFormFields, function (field) {
                    if (field.field_id == type) {
                        formField = field;
                    }
                });
                return formField;
            },
            getCustomFormType: function (type) {
                var formField = null;
                angular.forEach(customFormFields, function (field) {
                    if (field.field_id == type) {
                        formField = field;
                    }
                });
                return formField;
            },
            getDynamicForm: function () {
                return dynamicForm;
            },
            replaceDynamicForm: function (form) {
                dynamicForm = form;
                opportunityForm = FormService.setDynamicForm(angular.copy(dynamicForm));

            },

            getOpportunityForm: function () {
                return opportunityForm;
            },
            setOpportunityForm: function (components, opportunityComponents) {

                var globalFromComponents = null;
                var opportunityFormComponents = null;
                //unpack
                if (components._embedded) {
                    globalFromComponents = components._embedded.formComponents;
                }
                if (opportunityComponents._embedded) {
                    opportunityFormComponents = opportunityComponents._embedded.opportunityFormComponents;
                }

                // build up the form by reading the components
                opportunityForm = [];
                dynamicForm = [];
                customFormTypes = [];
                customFormFields = [];

                angular.forEach(opportunityFormComponents, function (field) {

                    var newField = null;

                    // check to see if form type is in the custom field list
                    var dynamicField = FormService.getDynamicFormField(field, globalFromComponents);
                    if (dynamicField) {
                        newField = dynamicField;

                        // copy opportunity attributes into form component
                        newField._links = field._links;
                        newField.field_sequence = field.field_sequence;

                        //create formTypes and formFields for form administration
                        customFormFields.push(newField);
                        var formType = {};
                        formType.name = newField.field_id;
                        formType.value = newField.field_title;
                        customFormTypes.push(formType);

                    } else {

                        dynamicField = FormService.getDynamicFormField(field, opportunityFormComponents);
                        if (dynamicField) {
                            newField = dynamicField;
                        }

                    }

                    // put newField into fields array
                    if (newField) {
                        dynamicForm.push(newField);
                    }
                });

                opportunityForm = FormService.setDynamicForm(angular.copy(dynamicForm));

            }

        }
    });
