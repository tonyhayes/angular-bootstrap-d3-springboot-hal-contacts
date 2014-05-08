angular.module('customersApp.formControllers', [])

    .controller('FormController', function ($scope, $location, $anchorScroll, modalService, FormService, formComponentService, formUpdateService, formComponentFormatService) {

        // preview form mode
        $scope.previewMode = false;

        // new form
        $scope.form = {};
        $scope.form.form_id = 1;
        $scope.form.form_name = 'My Form';

        // get the current form
        $scope.old_form_fields = formComponentFormatService.getDynamicForm();
        $scope.form.form_fields = angular.copy($scope.old_form_fields);

        // previewForm - for preview purposes, form will be copied into this
        // otherwise, actual form might get manipulated in preview mode
        $scope.previewForm = {};
        $scope.formData = {};

        $scope.dynamicFormTemplate = {};
        $scope.dynamicForm = {};

        // add new field drop-down:
        $scope.addField = {};

        var types = FormService.fields;
        var customFields = formComponentFormatService.getCustomFormTypes();
        $scope.addField.types = types.concat(customFields);


        $scope.addField.new = $scope.addField.types[0].name;
        $scope.addField.lastAddedID = $scope.form.form_fields.length;


        // create new field button click
        $scope.addNewField = function () {

            if ($scope.form.form_fields.length === 10) {
                var modalDefaults = {
                    templateUrl: 'app/partials/util/modal.html'
                };
                var modalOptions = {
                    headerText: 'Error ',
                    bodyText: 'There is a limit of 10 fields that can be added to a form.'
                };

                modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                });

            } else {


                var newField = {
                    "field_id": $scope.addField.lastAddedID,
                    "field_title": "New field - " + ($scope.addField.lastAddedID),
                    "field_type": $scope.addField.new,
                    "field_value": "",
                    "field_placeholder": "",
                    "field_required": true,
                    "fieldSequence": $scope.addField.lastAddedID
                };
                var customField = false;
                //if the new field is a custom type, get the config
                for (var i = 0; i < customFields.length; i++) {
                    if (customFields[i].name === $scope.addField.new) {

                        customField = true;
                        checkDuplicate();

                        break;
                    }
                }
                if (!customField) {
                    // put newField into fields array
                    $scope.form.form_fields.push(newField);
                    // incr field_id counter
                    $scope.addField.lastAddedID++;
                }

            }

        };
        function checkDuplicate() {
            // if it is a custom field check to see if already on form - error if it is
            var duplicateCustomField = false;
            angular.forEach($scope.form.form_fields, function (field) {
                if (field.field_id === $scope.addField.new) {
                    duplicateCustomField = true;
                    var modalDefaults = {
                        templateUrl: 'app/partials/util/modal.html'
                    };
                    var modalOptions = {
                        headerText: 'Error ',
                        bodyText: 'This type of field can only be added once to a form.'
                    };

                    modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    });
                }
            });

            if (!duplicateCustomField) {
                // incr field_id counter
                $scope.addField.lastAddedID++;
                //get the form field, and add to form
                var newCustomField = formComponentFormatService.customFormField($scope.addField.new);
                newCustomField.fieldSequence = $scope.addField.lastAddedID;
                $scope.form.form_fields.push(newCustomField);
            }
        }

        // deletes particular field on button click
        $scope.deleteField = function (field_id) {

            var modalDefaults = {
                templateUrl: 'app/partials/util/modal.html'
            };
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Field',
                headerText: 'Delete Opportunity Form Field',
                bodyText: 'Are you sure you want to delete this field?'
            };

            modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                if (result === 'ok') {
                    for (var i = 0; i < $scope.form.form_fields.length; i++) {
                        if ($scope.form.form_fields[i].field_id == field_id) {
                            $scope.form.form_fields.splice(i, 1);
                            break;
                        }
                    }
                }
            });
        };

        // add new option to the field
        $scope.addOption = function (field) {
            if (!field.field_options) {
                field.field_options = [];
            }

            var lastOptionID = 0;

            if (field.field_options[field.field_options.length - 1]) {
                lastOptionID = field.field_options[field.field_options.length - 1].option_id;
            }

            // new option's id
            var option_id = lastOptionID + 1;

            var newOption = {
                "option_id": option_id,
                "option_title": "Option " + option_id,
                "option_value": option_id
            };

            // put new option into field_options array
            field.field_options.push(newOption);
        };

        // delete particular option
        $scope.deleteOption = function (field, option) {
            var modalDefaults = {
                templateUrl: 'app/partials/util/modal.html'
            };
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Field Option',
                headerText: 'Delete Opportunity Form Field Option',
                bodyText: 'Are you sure you want to delete this field option?'
            };

            modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                if (result === 'ok') {
                    angular.forEach(field.field_options, function (fieldOption, i) {
                        if (fieldOption.option_title == option.option_title) {
                            delete field.field_options[i];
                        }
                    });
                }
            });
        };


        // preview form
        $scope.previewModalOn = function () {
            var modalDefaults;
            var modalOptions;

            if ($scope.form.form_fields === null || $scope.form.form_fields.length === 0) {

                modalDefaults = {
                    templateUrl: 'app/partials/util/modal.html'
                };
                modalOptions = {
                    headerText: 'Error ',
                    bodyText: 'No fields added yet, please add fields to the form before preview.'
                };

                modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                });


            }
            else {
                /*
                 first re-sequence everything, just in case of bad data, then
                 find the sequence number for the item above field, and swap
                 if nothing is above, set sequence to 1
                 then sort by sequence
                 */
                var sequenceNumber = 0;
                var fields = $scope.form.form_fields;
                angular.forEach(fields, function (field) {
                    sequenceNumber++;
                    field.fieldSequence = sequenceNumber;
                });
                sortJSONint(fields, 'fieldSequence', '123');

                $scope.previewForm = FormService.setDynamicForm(angular.copy($scope.form.form_fields));
                $scope.formData = {};

                modalDefaults = {
                    templateUrl: 'app/partials/form/modalFormPreview.html'
                };
                modalOptions = {
                    headerText: 'Form Preview ',
                    record: $scope.previewForm,
                    model1: $scope.formData
                };

                modalService.showModal(modalDefaults, modalOptions).then(function (result) {

                });


            }
        };

        // hide preview form, go back to create mode
        $scope.previewOff = function () {
            $scope.previewMode = !$scope.previewMode;
            $scope.form.submitted = false;
        };

        // decides whether field options block will be shown (true for dropdown and radio fields)
        $scope.showAddOptions = function (field) {
            if (field.field_type == "radio" || field.field_type == "dropdown" || field.field_type == "checklist") {
                return true;
            } else {
                return false;
            }
        };

        // deletes all the fields and retrieves the current form
        $scope.reset = function () {
            // get the current form
            $scope.form.form_fields = formComponentFormatService.getDynamicForm();
//            $scope.form.form_fields = formFormatterService.convertFormToFields();
            $scope.addField.lastAddedID = $scope.form.form_fields.length;
        };

        $scope.scrollTo = function (id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            $location.hash(old);
        };

        $scope.moveFieldUp = function (idx, field) {
            // change the sequence number then sort the array
            /*
             first re-sequence everything, just in case of bad data, then
             find the sequence number for the item above field, and swap
             if nothing is above, set sequence to 1
             then sort by sequence
             */
            var sequenceNumber = 0;
            var fields = $scope.form.form_fields;
            angular.forEach(fields, function (field) {
                sequenceNumber++;
                field.fieldSequence = sequenceNumber;
            });

            if (idx > 0) {
                newSeq = angular.copy(fields[idx - 1].fieldSequence);
                fields[idx - 1].fieldSequence = fields[idx].fieldSequence;
                fields[idx].fieldSequence = newSeq;
                sortJSONint(fields, 'fieldSequence', '123');
            }

        };
        $scope.moveFieldDown = function (idx, field) {
            // change the sequence number then sort the array
            /*
             first re-sequence everything, just in case of bad data, then
             find the sequence number for the item below field, and swap
             if nothing is below, then set sequence to the size of the array
             then sort by sequence
             */

            var sequenceNumber = 0;
            var fields = $scope.form.form_fields;
            angular.forEach(fields, function (field) {
                sequenceNumber++;
                field.fieldSequence = sequenceNumber;
            });

            if (idx < fields.length) {
                newSeq = angular.copy(fields[idx + 1].fieldSequence);
                fields[idx + 1].fieldSequence = fields[idx].fieldSequence;
                fields[idx].fieldSequence = newSeq;
                sortJSONint(fields, 'fieldSequence', '123');
            }

        };


        function sortJSONint(data, key, way) {
            return data.sort(function (a, b) {
                var x = parseInt(a[key]);
                var y = parseInt(b[key]);
                if (way === '123') {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                }
                if (way === '321') {
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                }
            });
        }


        // send all the fields to the store
        $scope.submit = function () {
            formUpdateService.updateForm($scope.old_form_fields, angular.copy($scope.form.form_fields), 'opportunity');
            formComponentFormatService.replaceDynamicForm($scope.form.form_fields);

            // return to applications default page
            $location.path('/');
        };

        $scope.navigate = function (url) {
            $location.path(url);
        };
    })
    .controller('FormFieldController', function ($scope, $location, modalService, FormService, formComponentService, formUpdateService, formComponentFormatService) {

        // get the current custom fields
        $scope.old_form_fields = formComponentFormatService.getCustomFormFields();
        $scope.form_fields = angular.copy($scope.old_form_fields);


        // add new field drop-down:
        $scope.addField = {};
        $scope.addField.types = FormService.fields;


        $scope.addField.new = $scope.addField.types[0].name;
        $scope.addField.lastAddedID = $scope.form_fields.length;


        // create new field button click
        $scope.addNewField = function () {

            // incr field_id counter
            $scope.addField.lastAddedID++;


            var newField = {
                "field_id": $scope.addField.lastAddedID,
                "field_title": "New field - " + ($scope.addField.lastAddedID),
                "field_type": $scope.addField.new,
                "field_value": "",
                "field_placeholder": "",
                "field_required": true
            };
            // put newField into fields array
            $scope.form_fields.push(newField);


        };

        // deletes particular field on button click
        $scope.deleteField = function (field_id) {
            var modalDefaults = {
                templateUrl: 'app/partials/util/modal.html'
            };
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Field',
                headerText: 'Delete Form Field',
                bodyText: 'Are you sure you want to delete this field?'
            };

            modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                if (result === 'ok') {
                    for (var i = 0; i < $scope.form_fields.length; i++) {
                        if ($scope.form_fields[i].field_id == field_id) {
                            $scope.form_fields.splice(i, 1);
                            break;
                        }
                    }
                }
            });
        };

        // add new option to the field
        $scope.addOption = function (field) {
            if (!field.field_options) {
                field.field_options = [];
            }

            var lastOptionID = 0;

            if (field.field_options[field.field_options.length - 1]) {
                lastOptionID = field.field_options[field.field_options.length - 1].option_id;
            }

            // new option's id
            var option_id = lastOptionID + 1;

            var newOption = {
                "option_id": option_id,
                "option_title": "Option " + option_id,
                "option_value": option_id
            };

            // put new option into field_options array
            field.field_options.push(newOption);
        };

        // delete particular option
        $scope.deleteOption = function (field, option) {
            var modalDefaults = {
                templateUrl: 'app/partials/util/modal.html'
            };
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Field Option',
                headerText: 'Delete Opportunity Form Field Option',
                bodyText: 'Are you sure you want to delete this field option?'
            };

            modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                if (result === 'ok') {
                    angular.forEach(field.field_options, function (fieldOption, i) {
                        if (fieldOption.option_title == option.option_title) {
                            delete field.field_options[i];
                        }
                    });
                }
            });
        };


        // decides whether field options block will be shown (true for dropdown and radio fields)
        $scope.showAddOptions = function (field) {
            if (field.field_type == "radio" || field.field_type == "dropdown" || field.field_type == "checklist") {
                return true;

            } else {
                return false;
            }
        };

        // deletes all the fields and retrieves the current form
        $scope.reset = function () {
            // get the current form
            $scope.form_fields = formComponentFormatService.getCustomFormFields();
            $scope.addField.lastAddedID = $scope.form_fields.length;
        };

        // send all the fields to the store
        $scope.submit = function () {
            formUpdateService.updateForm($scope.old_form_fields, angular.copy($scope.form_fields), 'global');

            // return to applications default page
            $location.path('/');
        };

        $scope.navigate = function (url) {
            $location.path(url);
        };
    });
