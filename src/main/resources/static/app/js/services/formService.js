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
                            angular.forEach(formComponentOptions, function (fieldOption) {

                                if (fieldOption.fieldDescription === formField.field_id) {
                                   formField.field_options[fieldOption.option_id]= {};
                                   formField.field_options[fieldOption.option_id].option_title = fieldOption.option_title;
                                   formField.field_options[fieldOption.option_id].option_value = fieldOption.option_value;
                                }
                            });
                        }
                    }
                });
                return formField;
            },

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
                    customFormTypes.push({"name": field.field_id, "value": field.field_title});
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
            var dynamicFormTester = {};
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
                dynamicFormTester[name] = {};
                dynamicFormTester[name].type = type;
                dynamicFormTester[name].label = field.field_title;
                dynamicFormTester[name].placeholder = field.field_placeholder;
                dynamicFormTester[name].empty = field.field_value;
                dynamicFormTester[name].required = field.field_required;
                if (field.field_options) {
                    var options = field.field_options;
                    if (type === 'radio') {
                        dynamicFormTester[name].values = {};
                        for (var k = 0; k < options.length; k++) {
                            dynamicFormTester[name].values[options[k].option_id] = options[k].option_title;
                        }
                    } else {
                        dynamicFormTester.form.options = {};
                        for (var j = 0; j < options.length; j++) {
                            dynamicFormTester[name].options[options[j].option_id] = {};
                            dynamicFormTester[name].options[options[j].option_id].label = options[j].option_title;
                        }
                    }
               }
            }
            return dynamicFormTester;
        };
        this.setDynamicForm = function (form) {
            var dynamicForm = {};
            var fields = form;
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
                dynamicForm[name].placeholder = field.field_placeholder;
                dynamicForm[name].empty = field.field_value;
                dynamicForm[name].required = field.field_required;
                if (field.field_options) {
                    var options = field.field_options;
                    if (type === 'radio') {
                        dynamicForm[name].values = {};
                        angular.forEach(options, function (option) {
                            dynamicForm[name].values[option.option_id] = option.option_title;

                        });
                    } else {
                        angular.forEach(options, function (option, value) {
                            option.label = option.option_title;
                        });
                        dynamicForm[name].options = options;
                    }
               }
            }
            return dynamicForm;
        };

    });

