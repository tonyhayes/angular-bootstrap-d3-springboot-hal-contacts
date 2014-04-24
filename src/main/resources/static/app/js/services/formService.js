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
                                    formField.field_options[fieldOption.option_id] = {};
                                    formField.field_options[fieldOption.option_id].option_title = fieldOption.option_title;
                                    formField.field_options[fieldOption.option_id].option_value = fieldOption.option_value;
                                }
                            });
                        }
                    }
                });
                return formField;
            },
            setDynamicForm: function (form) {
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

    });


