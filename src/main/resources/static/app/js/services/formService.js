angular.module('customersApp.formsService', [])

    .service('FormService', function FormService() {


        return {
            fields: [
                {
                    name: 'textfield',
                    value: 'Textfield'
                },
                {
                    name: 'email',
                    value: 'E-mail'
                },
                {
                    name: 'checklist',
                    value: 'Checklist'
                },
                {
                    name: 'radio',
                    value: 'Radio Buttons'
                },
                {
                    name: 'dropdown',
                    value: 'Dropdown List'
                },
                {
                    name: 'date',
                    value: 'Date'
                },
                {
                    name: 'textarea',
                    value: 'Text Area'
                },
                {
                    name: 'checkbox',
                    value: 'Checkbox'
                }

            ],

            getDynamicFormField: function (component, formComponents, formComponentOptions) {
                var formField = null;
                angular.forEach(formComponents, function (field) {
                    if (field.field_id === component.field_id) {
                        formField = field;

                        // now find the option, if any
                        if (field.optionsCount) {
                            formField.field_options = {};
                            angular.forEach(field.options, function (fieldOption) {
                                formField.field_options[fieldOption.option_id] = {};
                                formField.field_options[fieldOption.option_id].option_title = fieldOption.option_title;
                                formField.field_options[fieldOption.option_id].option_value = fieldOption.option_value;
                            });
                        }
                    }
                });
                return formField;
            },
            setDynamicForm: function (form) {
                var dynamicForm = {};
                var fields = form;

                fields.sort(function (a, b) {
                    var x = parseInt(a['field_sequence']);
                    var y = parseInt(b['field_sequence']);
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });


                for (var i = 0; i < fields.length; i++) {
                    var field = fields[i];
                    var type = '';
                    switch (field.field_type) {
                        case 'textfield':
                            type = 'text';
                            break;
                        case 'dropdown':
                            type = 'select';
                            break;
                        default:
                            type = field.field_type;
                    }
                    var name = field.field_id;
                    dynamicForm[name] = {};
                    dynamicForm[name].type = type;
                    dynamicForm[name].label = field.field_title;

                    if (type != 'checklist') {
                        dynamicForm[name].required = field.field_required;
                        dynamicForm[name].placeholder = field.field_placeholder;
                        dynamicForm[name].empty = field.field_value;
                    }

                    if (field.field_options) {
                        var options = field.field_options;
                        if (type === 'radio') {
                            dynamicForm[name].values = {};
                            angular.forEach(options, function (option) {
                                dynamicForm[name].values[option.option_id] = option.option_title;
                                delete dynamicForm[name].option_title;
                                delete dynamicForm[name].option_value;

                            });
                        } else {
                            angular.forEach(options, function (option, value) {
                                option.label = option.option_title;
                                delete option.option_title;
                                delete option.option_value;
                            });
                            dynamicForm[name].options = options;
                        }
                    }
                }
                return dynamicForm;
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

    .factory('formComponentFormatService', function (FormService) {

        var dynamicForm = [];
        var opportunityForm = [];
        var customFormTypes = [];
        var customFormFields = [];

        return {
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
            getFormType: function (component) {
                // first check to see if form is a standard type
                var type = null;
                var fields = FormService.fields;
                angular.forEach(fields, function (field) {
                    if (field.name == component.name) {
                        type = field.value;
                    }
                });
                angular.forEach(customFormTypes, function (field) {
                    if (field.name == component.name) {
                        type = field.type;
                    }
                });

                return type;

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
                        formType.type = newField.field_type;
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
    })

    .service('formTestComponentService', function (formComponentFormatService) {


        this.setOpportunityForm = function () {
            formComponentFormatService.setOpportunityForm(components, opportunityComponents);
        };


        var opportunityComponents = {
            "_links": {
                "self": {
                    "href": "http://localhost:9090/opportunityFormComponents?sort=fieldSequence{&page,size}",
                    "templated": true
                }
            },
            "_embedded": {
                "opportunityFormComponents": [
                    {
                        "createdAt": 1398782061581,
                        "updatedAt": 1398782061581,
                        "field_id": "location",
                        "field_title": "Location",
                        "field_type": "dropdown",
                        "field_value": "nothing selected",
                        "field_placeholder": "",
                        "field_required": "FALSE",
                        "fieldSequence": null,
                        "options": [
                            {
                                "option_id": "15",
                                "option_title": "London",
                                "option_value": "15"
                            },
                            {
                                "option_id": "2",
                                "option_title": "Houston",
                                "option_value": "2"
                            },
                            {
                                "option_id": "3",
                                "option_title": "Boston",
                                "option_value": "3"
                            }
                        ],
                        "optionsCount": 3,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/opportunityFormComponents/3"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061582,
                        "updatedAt": 1398782061582,
                        "field_id": "region",
                        "field_title": "Region",
                        "field_type": "checklist",
                        "field_value": "",
                        "field_placeholder": "",
                        "field_required": "FALSE",
                        "fieldSequence": null,
                        "options": [
                            {
                                "option_id": "1",
                                "option_title": "North East",
                                "option_value": "1"
                            },
                            {
                                "option_id": "2",
                                "option_title": "All",
                                "option_value": "2"
                            },
                            {
                                "option_id": "3",
                                "option_title": "South Texas",
                                "option_value": "3"
                            },
                            {
                                "option_id": "4",
                                "option_title": "Permian",
                                "option_value": "4"
                            },
                            {
                                "option_id": "15",
                                "option_title": "Mid Continent",
                                "option_value": "5"
                            }
                        ],
                        "optionsCount": 5,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/opportunityFormComponents/6"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061581,
                        "updatedAt": 1398782061581,
                        "field_id": "revenueSchedule",
                        "field_title": "Revenue Schedule",
                        "field_type": "dropdown",
                        "field_value": "nothing selected",
                        "field_placeholder": "",
                        "field_required": "FALSE",
                        "fieldSequence": null,
                        "options": [
                            {
                                "option_id": "1",
                                "option_title": "daily",
                                "option_value": "1"
                            },
                            {
                                "option_id": "2",
                                "option_title": "weekly",
                                "option_value": "2"
                            },
                            {
                                "option_id": "3",
                                "option_title": "monthly",
                                "option_value": "3"
                            },
                            {
                                "option_id": "4",
                                "option_title": "yearly",
                                "option_value": "4"
                            }
                        ],
                        "optionsCount": 4,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/opportunityFormComponents/5"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061580,
                        "updatedAt": 1398782061580,
                        "field_id": "dealDate",
                        "field_title": "Deal Date",
                        "field_type": "date",
                        "field_value": "",
                        "field_placeholder": "date",
                        "field_required": "FALSE",
                        "fieldSequence": null,
                        "options": [ ],
                        "optionsCount": 0,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/opportunityFormComponents/1"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061581,
                        "updatedAt": 1398782061581,
                        "field_id": "typeConversation",
                        "field_title": "Type of Conversation",
                        "field_type": "dropdown",
                        "field_value": "nothing selected",
                        "field_placeholder": "",
                        "field_required": "FALSE",
                        "fieldSequence": null,
                        "options": [
                            {
                                "option_id": "1",
                                "option_title": "New Business",
                                "option_value": "15"
                            },
                            {
                                "option_id": "2",
                                "option_title": "Proposal",
                                "option_value": "2"
                            },
                            {
                                "option_id": "3",
                                "option_title": "Continuing Business",
                                "option_value": "3"
                            },
                            {
                                "option_id": "4",
                                "option_title": "Follow-up",
                                "option_value": "4"
                            },
                            {
                                "option_id": "5",
                                "option_title": "Meeting",
                                "option_value": "5"
                            }
                        ],
                        "optionsCount": 5,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/opportunityFormComponents/4"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061581,
                        "updatedAt": 1398782061581,
                        "field_id": "status",
                        "field_title": "Status",
                        "field_type": "dropdown",
                        "field_value": "nothing selected",
                        "field_placeholder": "",
                        "field_required": "FALSE",
                        "fieldSequence": null,
                        "options": [
                            {
                                "option_id": "1",
                                "option_title": "won",
                                "option_value": "1"
                            },
                            {
                                "option_id": "2",
                                "option_title": "loss",
                                "option_value": "2"
                            },
                            {
                                "option_id": "3",
                                "option_title": "pending",
                                "option_value": "3"
                            }
                        ],
                        "optionsCount": 3,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/opportunityFormComponents/2"
                            }
                        }
                    }
                ]
            },
            "page": {
                "size": 20,
                "totalElements": 6,
                "totalPages": 1,
                "number": 0
            }
        };
        var components = {
            "_links": {
                "self": {
                    "href": "http://localhost:9090/formComponents{?page,size,sort}",
                    "templated": true
                }
            },
            "_embedded": {
                "formComponents": [
                    {
                        "createdAt": 1398782061584,
                        "updatedAt": 1398782061584,
                        "field_id": "dealDate",
                        "field_title": "Deal Date",
                        "field_type": "date",
                        "field_value": "",
                        "field_placeholder": "date",
                        "field_required": "FALSE",
                        "options": [ ],
                        "optionsCount": 0,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/formComponents/1"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061585,
                        "updatedAt": 1398782061585,
                        "field_id": "status",
                        "field_title": "Status",
                        "field_type": "dropdown",
                        "field_value": "nothing selected",
                        "field_placeholder": "",
                        "field_required": "FALSE",
                        "options": [
                            {
                                "option_id": "1",
                                "option_title": "won",
                                "option_value": "1"
                            },
                            {
                                "option_id": "2",
                                "option_title": "loss",
                                "option_value": "2"
                            },
                            {
                                "option_id": "3",
                                "option_title": "pending",
                                "option_value": "3"
                            }
                        ],
                        "optionsCount": 3,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/formComponents/2"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061585,
                        "updatedAt": 1398782061585,
                        "field_id": "location",
                        "field_title": "Location",
                        "field_type": "dropdown",
                        "field_value": "nothing selected",
                        "field_placeholder": "",
                        "field_required": "FALSE",
                        "options": [
                            {
                                "option_id": "15",
                                "option_title": "London",
                                "option_value": "15"
                            },
                            {
                                "option_id": "2",
                                "option_title": "Houston",
                                "option_value": "2"
                            },
                            {
                                "option_id": "3",
                                "option_title": "Boston",
                                "option_value": "3"
                            }
                        ],
                        "optionsCount": 3,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/formComponents/3"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061585,
                        "updatedAt": 1398782061585,
                        "field_id": "typeConversation",
                        "field_title": "Type of Conversation",
                        "field_type": "dropdown",
                        "field_value": "nothing selected",
                        "field_placeholder": "",
                        "field_required": "FALSE",
                        "options": [
                            {
                                "option_id": "1",
                                "option_title": "New Business",
                                "option_value": "15"
                            },
                            {
                                "option_id": "2",
                                "option_title": "Proposal",
                                "option_value": "2"
                            },
                            {
                                "option_id": "3",
                                "option_title": "Continuing Business",
                                "option_value": "3"
                            },
                            {
                                "option_id": "4",
                                "option_title": "Follow-up",
                                "option_value": "4"
                            },
                            {
                                "option_id": "5",
                                "option_title": "Meeting",
                                "option_value": "5"
                            }
                        ],
                        "optionsCount": 5,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/formComponents/4"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061585,
                        "updatedAt": 1398782061585,
                        "field_id": "revenueSchedule",
                        "field_title": "Revenue Schedule",
                        "field_type": "dropdown",
                        "field_value": "nothing selected",
                        "field_placeholder": "",
                        "field_required": "FALSE",
                        "options": [
                            {
                                "option_id": "1",
                                "option_title": "daily",
                                "option_value": "1"
                            },
                            {
                                "option_id": "2",
                                "option_title": "weekly",
                                "option_value": "2"
                            },
                            {
                                "option_id": "3",
                                "option_title": "monthly",
                                "option_value": "3"
                            },
                            {
                                "option_id": "4",
                                "option_title": "yearly",
                                "option_value": "4"
                            }
                        ],
                        "optionsCount": 4,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/formComponents/5"
                            }
                        }
                    },
                    {
                        "createdAt": 1398782061585,
                        "updatedAt": 1398782061585,
                        "field_id": "region",
                        "field_title": "Region",
                        "field_type": "checklist",
                        "field_value": "",
                        "field_placeholder": "",
                        "field_required": "FALSE",
                        "options": [
                            {
                                "option_id": "1",
                                "option_title": "North East",
                                "option_value": "1"
                            },
                            {
                                "option_id": "2",
                                "option_title": "All",
                                "option_value": "2"
                            },
                            {
                                "option_id": "3",
                                "option_title": "South Texas",
                                "option_value": "3"
                            },
                            {
                                "option_id": "4",
                                "option_title": "Permian",
                                "option_value": "4"
                            },
                            {
                                "option_id": "15",
                                "option_title": "Mid Continent",
                                "option_value": "15"
                            }
                        ],
                        "optionsCount": 5,
                        "_links": {
                            "self": {
                                "href": "http://localhost:9090/formComponents/6"
                            }
                        }
                    }
                ]
            },
            "page": {
                "size": 20,
                "totalElements": 6,
                "totalPages": 1,
                "number": 0
            }
        };


    });


