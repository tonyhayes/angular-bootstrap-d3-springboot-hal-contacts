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
            }

        };
    })
    .service('formFormatterService', function () {
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
        };

    })
.factory('formUpdateService', function ($q, formComponentService) {
    return {
        updateForm: function (oldForm, newForm, form) {
            // delete everything, then post ?
            if (oldForm) {
                angular.forEach(oldForm, function (field) {
                    if (field._links) {
                        // the delete command is self contained so any service can process it
                        formComponentService.deleteFormComponentOptions(field);
                    }
                });
            }
            // seperate options from the component, then delete the option from the componenet
            // then send them up to the host
            if (newForm) {

                var formComponent = [];
                var formOptions = [];

                angular.forEach(newForm, function (field) {
                    var options = null;
                    if (field._links) {
                        delete field._links;
                    }
                    if (field.field_options) {
                        options = angular.copy(field.field_options);
                        delete field_options;

                    }
                    if (form === 'global') {
                        formComponent.push('formComponentService.postFormComponents(' + field + ')');
                    }else{
                        formComponent.push('formComponentService.postOpportunityFormComponents(' + field + ')');
                    }
                    if(options){
                        formOptions.push(optionField);

                    }else{
                        formOptions.push(null);
                    }
                    // use $q.all to wait until all promises are resolved
                    $q.all(formComponent).then(function (data) {

                            for (var i = 0; i < data.length; i++) {
                                if(formOptions[i]){

                                    // need to get the form component #
                                    var formArray = data[i].split('/')
                                    var formID = formArray[formArray.length - 1];
                                    angular.forEach(formOptions[i], function (optionId, optionField) {
                                        optionField.option_id = optionId;
                                        if (form === 'global') {
                                            formComponentService.postFormComponentOptions(optionField, formID);
                                        }else{
                                            formComponentService.postOpportunityFormComponentOptions(optionField, formID);
                                        }

                                    });

                                }
                            }

                            console.log('form upload services are resolved!');
                            // when evdrything has loaded, flip the switch, and let the
                            // routes do their work
                            // use $q.all to wait until all promises are resolved
                            $q.all([
                                formComponentService.getFormComponents(),
                                formComponentService.getFormComponentOptions(),
                                formComponentService.getOpportunityFormComponents(),
                                formComponentService.getOpportunityFormComponentOptions()
                            ]).then(
                                function (data) {
                                    if (data[0] && data[1] && data[2] && data[3]) {
                                        formComponentService.setOpportunityForm(
                                            data[0],
                                            data[1],
                                            data[2],
                                            data[3]);
                                    }
                                    console.log('All services are resolved!');
                                    // when evdrything has loaded, flip the switch, and let the
                                    // routes do their work
                                    $scope.loadingDone = true;
                                },
                                function (reason) {
                                    // if any of the promises fails, handle it
                                    // here, I'm just throwing an error message to
                                    // the user.
                                    $scope.failure = reason;
                                });



                        },
                        function (reason) {
                            // if any of the promises fails, handle it here
                            console.log('form upload services are bad!');
                        });
                });
            }
        }
    }
})


