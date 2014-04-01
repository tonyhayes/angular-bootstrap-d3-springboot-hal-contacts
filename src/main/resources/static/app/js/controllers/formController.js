angular.module('customersApp.formControllers', [])

    .controller('FormController', function ($scope, $location, $anchorScroll, modalService, FormService, formFormatterService) {

        // preview form mode
        $scope.previewMode = false;

        // new form
        $scope.form = {};
        $scope.form.form_id = 1;
        $scope.form.form_name = 'My Form';

        // get the current form
        $scope.form.form_fields = formFormatterService.convertFormToFields();

        // previewForm - for preview purposes, form will be copied into this
        // otherwise, actual form might get manipulated in preview mode
        $scope.previewForm = {};
        $scope.formData = {};

        $scope.dynamicFormTemplate = {};
        $scope.dynamicForm = {};

        // add new field drop-down:
        $scope.addField = {};

        var types = FormService.fields;
        var customFields = FormService.getCustomFormTypes();
        $scope.addField.types = types.concat(customFields);


        $scope.addField.new = $scope.addField.types[0].name;
        $scope.addField.lastAddedID = $scope.form.form_fields.length;


        // create new field button click
        $scope.addNewField = function () {

            if($scope.form.form_fields.length === 10){
                var modalDefaults = {
                    templateUrl: 'partials/modal.html'
                };
                var modalOptions = {
                    headerText: 'Error ',
                    bodyText: 'There is a limit of 10 fields that can be added to a form.'
                };

                modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                });

            }else{


                var newField = {
                    "field_id": $scope.addField.lastAddedID,
                    "field_title": "New field - " + ($scope.addField.lastAddedID),
                    "field_type": $scope.addField.new,
                    "field_value": "",
                    "field_placeholder": "",
                    "field_required": true
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
                if (!customField){
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
                if (field.field_id === $scope.addField.new ){
                    duplicateCustomField = true;
                    var modalDefaults = {
                        templateUrl: 'partials/modal.html'
                    };
                    var modalOptions = {
                        headerText: 'Error ',
                        bodyText: 'This type of field can only be added once to a form.'
                    };

                    modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                    });
                }
            });

            if (!duplicateCustomField){
                //get the form field, and add to form
                $scope.form.form_fields.push(FormService.getCustomFormField($scope.addField.new));
                // incr field_id counter
                $scope.addField.lastAddedID++;
            }
        }

        // deletes particular field on button click
        $scope.deleteField = function (field_id) {
            for (var i = 0; i < $scope.form.form_fields.length; i++) {
                if ($scope.form.form_fields[i].field_id == field_id) {
                    $scope.form.form_fields.splice(i, 1);
                    break;
                }
            }
        };

        // add new option to the field
        $scope.addOption = function (field) {
            if (!field.field_options){
                field.field_options = [];
            }

            var lastOptionID = 0;

            if (field.field_options[field.field_options.length - 1]){
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
            for (var i = 0; i < field.field_options.length; i++) {
                if (field.field_options[i].option_id == option.option_id) {
                    field.field_options.splice(i, 1);
                    break;
                }
            }
        };


        // preview form
        $scope.previewOn = function () {

            if ($scope.form.form_fields === null || $scope.form.form_fields.length === 0) {

                var modalDefaults = {
                    templateUrl: 'partials/modal.html'
                };
                var modalOptions = {
                    headerText: 'Error ',
                    bodyText: 'No fields added yet, please add fields to the form before preview.'
                };

                modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                });

            }
            else {

                $scope.previewMode = !$scope.previewMode;
                $scope.form.submitted = false;
                angular.copy($scope.form, $scope.previewForm);

                $scope.scrollTo('admin-form'); // scroll to the form
                // store for dynform retrival
                $scope.previewForm = formFormatterService.testDynamicForm($scope.form);
                $scope.formData = {};


            }
        };
        $scope.previewModalOn = function () {
            var modalDefaults;
            var modalOptions;

            if ($scope.form.form_fields === null || $scope.form.form_fields.length === 0) {

                 modalDefaults = {
                    templateUrl: 'partials/modal.html'
                };
                 modalOptions = {
                    headerText: 'Error ',
                    bodyText: 'No fields added yet, please add fields to the form before preview.'
                };

                modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                });


            }
            else {

                $scope.previewForm = formFormatterService.testDynamicForm($scope.form);
                $scope.formData = {};

                 modalDefaults = {
                    templateUrl: 'partials/form/modalFormPreview.html'
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
            if (field.field_type == "radio" || field.field_type == "dropdown" || field.field_type == "checklist"){
                return true;
            }else{
                return false;
            }
        };

        // deletes all the fields and retrieves the current form
        $scope.reset = function () {
            // get the current form
            $scope.form.form_fields = formFormatterService.convertFormToFields();
            $scope.addField.lastAddedID = $scope.form.form_fields.length;
        };

        $scope.scrollTo = function (id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            $location.hash(old);
        };
        // send all the fields to the store
        $scope.submit = function () {
            FormService.updateForm($scope.form);
            formFormatterService.setDynamicForm($scope.form);

            // return to applications default page
            $location.path('/');
        };

        $scope.navigate = function (url) {
            $location.path(url);
        };
    })
    .controller('FormFieldController', function ($scope, $location, modalService, FormService ) {

        // get the current custom fields
        $scope.form_fields = FormService.getCustomFormFields();


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
            for (var i = 0; i < $scope.form_fields.length; i++) {
                if ($scope.form_fields[i].field_id == field_id) {
                    $scope.form_fields.splice(i, 1);
                    break;
                }
            }
        };

        // add new option to the field
        $scope.addOption = function (field) {
            if (!field.field_options){
                field.field_options = [];
            }

            var lastOptionID = 0;

            if (field.field_options[field.field_options.length - 1]){
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
            for (var i = 0; i < field.field_options.length; i++) {
                if (field.field_options[i].option_id == option.option_id) {
                    field.field_options.splice(i, 1);
                    break;
                }
            }
        };


        // decides whether field options block will be shown (true for dropdown and radio fields)
        $scope.showAddOptions = function (field) {
            if (field.field_type == "radio" || field.field_type == "dropdown" || field.field_type == "checklist"){
                return true;

            }else{
                return false;
            }
        };

        // deletes all the fields and retrieves the current form
        $scope.reset = function () {
            // get the current form
            $scope.form_fields = FormService.getCustomFormFields();
            $scope.addField.lastAddedID = $scope.form_fields.length;
        };

        // send all the fields to the store
        $scope.submit = function () {
            FormService.updateCustomFormFields($scope.form_fields);

            // return to applications default page
            $location.path('/');
        };

        $scope.navigate = function (url) {
            $location.path(url);
        };
    });
