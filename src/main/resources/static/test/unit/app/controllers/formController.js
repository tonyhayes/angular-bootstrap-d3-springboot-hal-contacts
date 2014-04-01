describe('Testing FormController', function() {
    var $scope, ctrl;



    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function() {
        module('customersApp');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // customersService - injected so we can use these functions.

        inject(function($rootScope, $controller, $filter,  modalService, FormService, formFormatterService) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();



            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('FormController', {
                $scope: $scope,
                $filter: $filter,
                FormService: FormService,
                formFormatterService:formFormatterService
            });
        });
    });


    /* Test 1: Data exists.
     * here we're going to test that some things were
     * populated when the controller function whas evaluated. */
    it('should start with a known number of form fields', function() {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.form.form_fields.length).toEqual(7);
    });


    /* Test 2: find form fields.
     * find a known form format. */
    it('should call convertFormToFields service method and return a known format', function() {
        // Act
        inject(function(formFormatterService) {
            var fields = formFormatterService.convertFormToFields();

            // Assert
            expect(fields).toEqual($scope.form.form_fields);
        });


    });
    /* Test 3: find form types.
     * find a known form types. */
    it('should call FormService service method and return known types', function() {
        // Act
        inject(function(FormService) {
            var fields = FormService.fields;
            var customFields = FormService.getCustomFormTypes();
            var allTypes = fields.concat(customFields);

            // Assert
            expect(allTypes).toEqual($scope.addField.types);
        });


    });
    /* Test 4: delete a field from the form .
     * delete a known form field. */
    it('should call $scope.deleteField method and delete a field from the form', function() {
        // Act
            $scope.deleteField('dealDate');
            // Assert
            expect($scope.form.form_fields.length).toEqual(6);


    });
    /* Test 5: add a field to the form .
     * add a known form field. */
    it('should call $scope.addNewField method and add a field to the form', function() {
        // Act
        $scope.addNewField();
        // Assert
        expect($scope.form.form_fields.length).toEqual(8);


    });

    /* Test 6: delete a field option from the form .
     * delete a known option form field. */
    it('should call $scope.deleteOption method and delete a field option from the form', function() {
        // Act
        $scope.deleteOption($scope.form.form_fields[1],$scope.form.form_fields[1].field_options['2']);
        // Assert
        expect($scope.form.form_fields[1].field_options.length).toEqual(2);


    });
    /* Test 7: add a field option to the form .
     * add a known option to a form field. */
    it('should call $scope.addOption method and add a  new option to a field on the form', function() {
        // Act
        $scope.addOption($scope.form.form_fields[0]);
        // Assert
        expect($scope.form.form_fields[0].field_options.length).toEqual(1);


    });

    /* Test 8: test dynamic form service should return a form exactly like the setDynamicForm.
     * . */
    it('should call testDynamicForm and setDynamicForm and be the same', function() {
        // Act
        inject(function(formFormatterService) {
            var testForm = formFormatterService.testDynamicForm($scope.form);
            var realForm = formFormatterService.setDynamicForm($scope.form);
            // Assert
            expect(testForm).toEqual(realForm);
        });


    });
    /* Test 9: setDynamicForm form service should return a form exactly like test1.
     * . */
    it('should call setDynamicForm and convertFormToFields and be the same as the first test', function() {
        // Act
        inject(function(formFormatterService) {
            var realForm = formFormatterService.setDynamicForm($scope.form);
            var fields = formFormatterService.convertFormToFields();

            // Assert
            expect(fields).toEqual($scope.form.form_fields);

        });


    });

})

describe('Testing FormFieldController', function() {
    var $scope, ctrl;



    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function() {
        module('customersApp');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // customersService - injected so we can use these functions.

        inject(function($rootScope, $controller, $filter,  modalService, FormService) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();



            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('FormFieldController', {
                $scope: $scope,
                $filter: $filter,
                FormService: FormService
            });
        });
    });


    /* Test 1: Data exists.
     * here we're going to test that some things were
     * populated when the controller function whas evaluated. */
    it('should start with a known number of form fields', function() {
        //just assert. $scope was set up in beforeEach() (above)
        expect($scope.form_fields.length).toEqual(6);
    });


    /* Test 2: find form types.
     * find a known form types. */
    it('should call FormService service method and return known types', function() {
        // Act
        inject(function(FormService) {
            var fields = FormService.fields;

            // Assert
            expect(fields).toEqual($scope.addField.types);
        });


    });
    /* Test 3: delete a field from the form .
     * delete a known form field. */
    it('should call $scope.deleteField method and delete a field from the form', function() {
        // Act
        $scope.deleteField('dealDate');
        // Assert
        expect($scope.form_fields.length).toEqual(5);


    });
    /* Test 4: add a field to the form .
     * add a known form field. */
    it('should call $scope.addNewField method and add a field to the form', function() {
        // Act
        $scope.addNewField();
        // Assert
        expect($scope.form_fields.length).toEqual(7);


    });

    /* Test 5: delete a field option from the form .
     * delete a known option form field. */
    it('should call $scope.deleteOption method and delete a field option from the form', function() {
        // Act
        $scope.deleteOption($scope.form_fields[1],$scope.form_fields[1].field_options['2']);
        // Assert
        expect($scope.form_fields[1].field_options.length).toEqual(2);


    });
    /* Test 6: add a field option to the form .
     * add a known option to a form field. */
    it('should call $scope.addOption method and add a  new option to a field on the form', function() {
        // Act
        $scope.addOption($scope.form_fields[2]);
        // Assert
        expect($scope.form_fields[2].field_options.length).toEqual(4);


    });


});