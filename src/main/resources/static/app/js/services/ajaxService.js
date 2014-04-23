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
                    return result.headers('location');
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
                    return result.headers('location');
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
                if(opportunity.probabilityId){
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
                if(opportunity.salesPersonId){
                    opportunity.sales = dmApplicationEntryPoint + '/salesPersons/' + opportunity.salesPersonId;
                }
                if(opportunity.contactId){
                    opportunity.contact = dmApplicationEntryPoint + '/contacts/' + opportunity.contactId;
                }
                if(opportunity.probabilityId){
                    opportunity.probability = dmApplicationEntryPoint + '/probabilities/' + opportunity.probabilityId;
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
                    return result.headers('location');
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
    .factory('formComponentService', function ($http, FormService, formFormatterService) {

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
                    return $http.get(dmApplicationEntryPoint + '/opportunityFormComponents').then(function (result) {
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
                var body = angular.copy(opportunityComponent)
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
                var body = angular.copy(opportunityComponent)
                var url = body._links.self.href;
                delete body._links;
                return $http.delete(url).then(function (result) {
                    return result.data;
                });
            },
                getOpportunityFormComponentOptions: function () {
                    //since $http.get returns a promise,
                    //and promise.then() also returns a promise
                    //that resolves to whatever value is returned in it's
                    //callback argument, we can return that.
                    return $http.get(dmApplicationEntryPoint + '/opportunityFormComponentOptions').then(function (result) {
                        return result.data;
                    });
                },
            postOpportunityFormComponentsOptions: function (opportunityComponentOption, opportunityFormComponentId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                opportunityComponentOption.component = dmApplicationEntryPoint + '/opportunityFormComponents/' + opportunityFormComponentId;
                return $http.post(dmApplicationEntryPoint + '/opportunityFormComponentOptions',
                    opportunityComponentOption).then(function (result) {
                    return result.headers('location');
                });
            },
            patchOpportunityFormComponentsOptions: function (opportunityComponentOption, opportunityFormComponentId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                opportunityComponentOption.component = dmApplicationEntryPoint + '/opportunityFormComponents/' + opportunityFormComponentId;
                var body = angular.copy(opportunityComponentOption)
                var url = body._links.self.href;
                delete body._links;
                // angular does not support patch, use put for now
                return $http.put(url, body).then(function (result) {
                    return result.data;
                });
            },
            deleteOpportunityFormComponentsOptions: function (opportunityComponentOption) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(opportunityComponentOption)
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
                var body = angular.copy(component)
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
                var body = angular.copy(component)
                var url = body._links.self.href;
                delete body._links;
                return $http.delete(url).then(function (result) {
                    return result.data;
                });
            },
                getFormComponentOptions: function () {
                    //since $http.get returns a promise,
                    //and promise.then() also returns a promise
                    //that resolves to whatever value is returned in it's
                    //callback argument, we can return that.
                    return $http.get(dmApplicationEntryPoint + '/formComponentOptions').then(function (result) {
                        return result.data;
                    });
                },
            postFormComponentsOptions: function (componentOption, formComponentId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                componentOption.component = dmApplicationEntryPoint + '/formComponents/' + formComponentId;
                return $http.post(dmApplicationEntryPoint + '/formComponentOptions',
                    opportunityComponentOption).then(function (result) {
                        return result.headers('location');
                    });
            },
            patchFormComponentsOptions: function (componentOption, formComponentId) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                componentOption.component = dmApplicationEntryPoint + '/formComponents/' + formComponentId;
                var body = angular.copy(componentOption)
                var url = body._links.self.href;
                delete body._links;
                // angular does not support patch, use put for now
                return $http.put(url, body).then(function (result) {
                    return result.data;
                });
            },
            deleteFormComponentsOptions: function (componentOption) {
                //since $http.get returns a promise,
                //and promise.then() also returns a promise
                //that resolves to whatever value is returned in it's
                //callback argument, we can return that.
                var body = angular.copy(componentOption)
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

                getOpportunityForm: function () {
                    return opportunityForm;
                },
                setOpportunityForm: function (components, options, opportunityComponents, opportunityOptions) {

                    var globalFromComponents = null;
                    var globalFormOptions = null;
                    var opportunityFormComponents = null;
                    var opportunityFormOptions = null;
                    //unpack
                    if(components._embedded){
                        globalFromComponents = components._embedded.formComponents;
                    }
                    if(options._embedded){
                        globalFormOptions = options._embedded.formComponentOptions;
                    }
                    if(opportunityComponents._embedded){
                        opportunityFormComponents = opportunityComponents._embedded.opportunityFormComponents;
                    }
                    if(opportunityOptions._embedded){
                        opportunityFormOptions = opportunityOptions._embedded.opportunityFormComponentOptions;
                    }

                    // build up the form by reading the components
                    opportunityForm = [];
                    dynamicForm = [];
                    customFormTypes = [];
                    customFormFields = [];

                    angular.forEach(opportunityFormComponents, function (field) {

                        var newField = null;

                        // check to see if form type is in the custom field list
                        var dynamicField = FormService.getDynamicFormField(field, globalFromComponents, globalFormOptions);
                        if (dynamicField) {
                            newField = dynamicField;

                            //create formTypes and formFields for form administration
                            customFormFields.push(newField);
                            var formType = {};
                            formType.name = newField.field_id;
                            formType.value = newField.field_title;
                            customFormTypes.push(formType);

                        } else {

                            dynamicField = FormService.getDynamicFormField(field, opportunityFormComponents, opportunityFormOptions);
                            if (dynamicField) {
                                newField = dynamicField;
                            }

                        }

                        // put newField into fields array
                        if (newField) {
                            dynamicForm.push(newField);
                        }
                    });

                    opportunityForm = formFormatterService.setDynamicForm(angular.copy(dynamicForm));

                }

            }
     });
