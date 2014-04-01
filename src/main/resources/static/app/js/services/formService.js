angular.module('customersApp.formsService', [])

    .service('FormService', function FormService($http) {

        var formsJsonPath = 'static-data/sample_forms.json';
        var customFormTypes = [
            {
                name: 'dealDate',
                value: 'Deal Date'
            },
            {
                name: 'status',
                value: 'Status'
            },
            {
                name: 'location',
                value: 'Location'
            },
            {
                name: 'typeConversation',
                value: 'Type of Conversation'
            },
            {
                name: 'revenueSchedule',
                value: 'Revenue Schedule'
            },
            {
                name: 'region',
                value: 'Region'
            }

        ];
        var customFormFields = [

            {
                "field_id": 'dealDate',
                "field_title": "Deal Date",
                "field_type": "date",
                "field_value": '',
                "field_placeholder": "date",
                "field_required": false

            },
            {
                "field_id": 'status',
                "field_title": "Status",
                "field_type": "dropdown",
                "field_value": 'nothing selected',
                "field_placeholder": "",
                "field_required": false,
                "field_options": [
                    {
                        "option_id": 1,
                        "option_title": "won",
                        "option_value": 1
                    },
                    {
                        "option_id": 2,
                        "option_title": "loss",
                        "option_value": 2
                    },
                    {
                        "option_id": 3,
                        "option_title": "pending",
                        "option_value": 3
                    }
                ]

            },
            {
                "field_id": 'location',
                "field_title": "Location",
                "field_type": "dropdown",
                "field_value": 'nothing selected',
                "field_placeholder": "",
                "field_required": false,
                "field_options": [
                    {
                        "option_id": '15',
                        "option_title": "London",
                        "option_value": '15'
                    },
                    {
                        "option_id": '2',
                        "option_title": "Houston",
                        "option_value": '2'
                    },
                    {
                        "option_id": '3',
                        "option_title": "Boston",
                        "option_value": '3'
                    }
                ]

            },
            {
                "field_id": 'typeConversation',
                "field_title": "Type of Conversation",
                "field_type": "dropdown",
                "field_value": 'nothing selected',
                "field_placeholder": "",
                "field_required": false,
                "field_options": [
                    {
                        "option_id": '1',
                        "option_title": "New Business",
                        "option_value": '15'
                    },
                    {
                        "option_id": '2',
                        "option_title": "Proposal",
                        "option_value": '2'
                    },
                    {
                        "option_id": 3,
                        "option_title": "Continuing Business",
                        "option_value": 3
                    },
                    {
                        "option_id": 4,
                        "option_title": "Follow-up",
                        "option_value": 4
                    },
                    {
                        "option_id": 5,
                        "option_title": "Meeting",
                        "option_value": 5
                    }
                ]

            },
            {
                "field_id": 'revenueSchedule',
                "field_title": "Revenue Schedule",
                "field_type": "dropdown",
                "field_value": 'nothing selected',
                "field_placeholder": "",
                "field_required": false,
                "field_options": [
                    {
                        "option_id": 1,
                        "option_title": "daily",
                        "option_value": 1
                    },
                    {
                        "option_id": 2,
                        "option_title": "weekly",
                        "option_value": 2
                    },
                    {
                        "option_id": 3,
                        "option_title": "monthly",
                        "option_value": 3
                    },
                    {
                        "option_id": 4,
                        "option_title": "yearly",
                        "option_value": 4
                    }
                ]

            },
            {
                "field_id": 'region',
                "field_title": "Region",
                "field_type": "checklist",
                "field_value": '',
                "field_placeholder": "",
                "field_required": false,
                "field_options": [
                    {
                        "option_id": 1,
                        "option_title": "North East",
                        "option_value": 1
                    },
                    {
                        "option_id": 2,
                        "option_title": "All",
                        "option_value": 2
                    },
                    {
                        "option_id": 3,
                        "option_title": "South Texas",
                        "option_value": 3
                    },
                    {
                        "option_id": 4,
                        "option_title": "Permian",
                        "option_value": 4
                    },
                    {
                        "option_id": 5,
                        "option_title": "Mid Continent",
                        "option_value": 5
                    }
                ]

            }
        ];

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
            form: function (id) {
                // $http returns a promise, which has a then function, which also returns a promise
                return $http.get(formsJsonPath).then(function (response) {
                    var requestedForm = {};
                    angular.forEach(response.data, function (form) {
                        if (form.form_id == id) requestedForm = form;
                    });
                    return requestedForm;
                });
            },
            forms: function () {
                return $http.get(formsJsonPath).then(function (response) {
                    return response.data;
                });
            },
            updateForm: function (record) {
                return alert('this will be a put with a payload');
            },
            getCustomFormTypes: function () {
                return customFormTypes;

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
            getCustomFormFields: function () {
                return customFormFields;
            },
            updateCustomFormFields: function (form_fields) {
                customFormFields = form_fields;
                customFormTypes = [];
                angular.forEach(customFormFields, function (field) {
                    customFormTypes.push({"name":field.field_id, "value": field.field_title});
                });

            }
        };
    })
    .service('formFormatterService', function (FormService) {
        this.convertFormToFields = function () {
            var formFields = [];
            angular.forEach(dynamicForm.form, function (value, key) {

                var newField = {};

                // check to see if form type is in the custom field list
                var customField = FormService.getCustomFormType(key);
                if (customField) {
                    newField = customField;
                } else {


                    if (!key.empty) {
                        key.empty = "";
                    }
                    if (!key.required) {
                        key.required = false;
                    }

                    var type = '';
                    switch (value.type) {
                        case 'text':
                            type = 'textfield';
                            break;
                        case 'select':
                            type = 'dropdown';
                            break;
                        default:
                            type = value.type;
                    }


                    newField = {
                        "field_id": key,
                        "field_title": value.label,
                        "field_type": type,
                        "field_value": key.empty,
                        "field_placeholder": value.placeholder,
                        "field_required": value.required

                    };
                    if (value.options) {
                        newField.field_options = [];
                        angular.forEach(value.options, function (option, item) {
                            var newOption = {
                                "option_id": item,
                                "option_title": option.label,
                                "option_value": item
                            };

                            // put new option into field_options array
                            newField.field_options.push(newOption);
                        });

                    }

                    if (value.values) {
                        newField.field_options = [];
                        angular.forEach(value.values, function (value, item) {
                            var newOption = {
                                "option_id": item,
                                "option_title": value,
                                "option_value": item
                            };

                            // put new option into field_options array
                            newField.field_options.push(newOption);
                        });

                    }

                }


                // put newField into fields array
                formFields.push(newField);
            });


            return formFields;
        };
        this.getDynamicForm = function () {
            return dynamicForm;
        };
        this.saveDynamicForm = function (form) {
            dynamicForm = form;
        };
        this.testDynamicForm = function (form) {
            dynamicFormTester.formId = form.form_id;
            dynamicFormTester.formName = form.form_name;
            dynamicFormTester.form = {};
            var fields = form.form_fields;
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
                dynamicFormTester.form[name] = {};
                dynamicFormTester.form[name].type = type;
                dynamicFormTester.form[name].label = field.field_title;
                dynamicFormTester.form[name].placeholder = field.field_placeholder;
                dynamicFormTester.form[name].empty = field.field_value;
                dynamicFormTester.form[name].required = field.field_required;
                if (field.field_options) {
                    var options = field.field_options;
                    if (type === 'radio') {
                        dynamicFormTester.form[name].values = {};
                        for (var k = 0; k < options.length; k++) {
                            dynamicFormTester.form[name].values[options[k].option_id] = options[k].option_title;
                        }
                    } else {
                        dynamicFormTester.form[name].options = {};
                        for (var j = 0; j < options.length; j++) {
                            dynamicFormTester.form[name].options[options[j].option_id] = {};
                            dynamicFormTester.form[name].options[options[j].option_id].label = options[j].option_title;
                        }
                    }

                }


            }
            return dynamicFormTester;
        };
        this.setDynamicForm = function (form) {
            dynamicForm.formId = form.form_id;
            dynamicForm.formName = form.form_name;
            dynamicForm.form = {};
            var fields = form.form_fields;
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
                dynamicForm.form[name] = {};
                dynamicForm.form[name].type = type;
                dynamicForm.form[name].label = field.field_title;
                dynamicForm.form[name].placeholder = field.field_placeholder;
                dynamicForm.form[name].empty = field.field_value;
                dynamicForm.form[name].required = field.field_required;
                if (field.field_options) {
                    var options = field.field_options;
                    if (type === 'radio') {
                        dynamicForm.form[name].values = {};
                        for (var k = 0; k < options.length; k++) {
                            dynamicForm.form[name].values[options[k].option_id] = options[k].option_title;
                        }
                    } else {
                        dynamicForm.form[name].options = {};
                        for (var j = 0; j < options.length; j++) {
                            dynamicForm.form[name].options[options[j].option_id] = {};
                            dynamicForm.form[name].options[options[j].option_id].label = options[j].option_title;
                        }
                    }

                }


            }
            return dynamicForm;
        };
        var dynamicFormTester = {};

        var dynamicForm =
        {
            formId: "1",
            formName: "My Form",
            form: {
                "dealDate": {
                    "type": "date",
                    "label": "Deal Date",
                    "placeholder": "date"
                },
                "status": {
                    "type": "select",
                    "label": "Status",
                    "empty": "nothing selected",
                    "options": {
                        "1": {
                            "label": "won"
                        },
                        "2": {
                            "label": "loss"
                        },
                        "3": {
                            "label": "pending"
                        }
                    }
                },
                "location": {
                    "type": "select",
                    "label": "Location",
                    "empty": "nothing selected",
                    "options": {
                        "15": {
                            "label": "London"
                        },
                        "2": {
                            "label": "Houston"
                        },
                        "3": {
                            "label": "Austin"
                        }
                    }
                },
                "typeConversation": {
                    "type": "select",
                    "label": "Type of Conversation",
                    "empty": "nothing selected",
                    "options": {
                        "1": {
                            "label": "New Business"
                        },
                        "2": {
                            "label": "Proposal"
                        },
                        "3": {
                            "label": "Continuing Business"
                        },
                        "4": {
                            "label": "Follow-up"
                        },
                        "5": {
                            "label": "Meeting"
                        }
                    }
                },
                "revenueSchedule": {
                    "type": "select",
                    "label": "Revenue Schedule",
                    "empty": "nothing selected",
                    "options": {
                        "1": {
                            "label": "daily"
                        },
                        "2": {
                            "label": "weekly"
                        },
                        "3": {
                            "label": "monthly"
                        },
                        "4": {
                            "label": "yearly"
                        }
                    }
                },
                "radio": {
                    "type": "radio",
                    "label": "radio",
                    "values": {
                        "first": "first option",
                        "second": "second option",
                        "third": "third option",
                        "fourth": "fourth option",
                        "fifth": "fifth option"
                    }
                },

                "region": {
                    "type": "checklist",
                    "label": "Region",
                    "options": {
                        "1": {
                            "label": "North East"
                        },
                        "2": {
                            "label": "All"
                        },
                        "3": {
                            "label": "South Texas"
                        },
                        "4": {
                            "label": "Permian"
                        },
                        "5": {
                            "label": "Mid Continent"
                        },
                        "15": {
                            "label": "West"
                        }
                    }
                }
            }
        };

    });

