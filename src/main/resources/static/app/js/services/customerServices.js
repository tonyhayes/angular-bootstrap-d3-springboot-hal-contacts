/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('customersApp.customerServices', []).
    value('version', '0.1')

    .service('customerNamesService', function () {
        this.getCustomerNames = function () {
            return customerNames;
        };
        this.getCustomerName = function (id) {
            for (var i = 0; i < customerNames.length; i++) {
                if (customerNames[i].customerId === id) {
                    return customerNames[i];
                }
            }
            return null;
        };
        var customerNames = [
            {
                customerId: "ec5329ed-ba10-4ad6-894a-bbd348d12222",
                customerName: "Teak Elementary Oil and Gas Company"
            },
            {
                customerId: "ba1d6149-1545-411f-9e45-20dc82f1a438",
                customerName: "Hacken Oil"
            }
        ];

    })
    .service('salesPersonService', function () {
        this.getSalesPersons = function () {
            return salesPersons;
        };
        this.getSalesPerson = function (id) {
            for (var i = 0; i < salesPersons.length; i++) {
                if (salesPersons[i].id === id) {
                    return salesPersons[i];
                }
            }
            return null;
        };
        var salesPersons = [
            {
                id: 1,
                salesPerson: "Gordon Ramsey"
            },
            {
                id: 15,
                salesPerson: "Rodney Wayne"
            },
            {
                id: 157,
                salesPerson: "Meagan Kelley"
            }
        ];

    })
    .service('contactService', function () {
        this.getContacts = function () {
            return contacts;
        };
        this.getContact = function (id) {
            for (var i = 0; i < contacts.length; i++) {
                if (contacts[i].id === id) {
                    return contacts[i];
                }
            }
            return null;
        };
        var contacts = [
            {
                id: 15,
                contact: "Rodney Wayne"
            },
            {
                id: 1,
                contact: "Meagan Kelley"
            }
        ];

    })
    .service('probabilityService', function () {
        this.getProbabilities = function () {
            return probabilities;
        };
        this.getProbability = function (id) {
            for (var i = 0; i < probabilities.length; i++) {
                if (probabilities[i].id === id) {
                    return probabilities[i];
                }
            }
            return null;
        };
        var probabilities = [
            {
                id: 10,
                probability: "10"
            },
            {
                id: 15,
                probability: "15"
            },
            {
                id: 20,
                probability: "20"
            },
            {
                id: 30,
                probability: "30"
            },
            {
                id: 40,
                probability: "40"
            },
            {
                id: 50,
                probability: "50"
            },
            {
                id: 60,
                probability: "60"
            },
            {
                id: 70,
                probability: "70"
            },
            {
                id: 80,
                probability: "80"
            },
            {
                id: 90,
                probability: "90"
            },
            {
                id: 100,
                probability: "100"
            }
        ];

    })

//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
    .service('customersService', function ($http) {

        this.insertContact = function (record, contact) {
            for (var i = 0; i < customers.length; i++) {
                if (customers[i].customerId === record.customerId) {
                    customers[i].contacts.push(contact);
                }
            }
        };

        this.updateCustomerOpportunity = function (customerId, opportunityId, record) {
            for (var i = 0; i < customers.length; i++) {
                if (customers[i].customerId === customerId) {
                    if (opportunityId == 'new') {
                        customers[i].opportunities.push(record);
                    } else {
                        for (var j = 0; j < customers[i].opportunities.length; j++) {
                            if (customers[i].opportunities[j].id == opportunityId) {
                                customers[i].opportunities[j] = record;
                            }
                        }
                    }
                }
            }
        };
        this.getCustomerOpportunity = function (customerId, opportunityId) {
            for (var i = 0; i < customers.length; i++) {
                if (customers[i].customerId === customerId) {
                    if (opportunityId != 'new') {
                        for (var j = 0; j < customers[i].opportunities.length; j++) {
                            if (customers[i].opportunities[j].id == opportunityId) {
                                return customers[i].opportunities[j];
                            }
                        }
                    }
                }
            }
            return null;
        };


        this.saveCustomerPages = function (customerArray, Page) {
            customerPageData = customerArray;
        };

        this.storeCustomer = function (customerObj) {
            customerObject = customerObj;
        };

        this.getStoredCustomer = function () {
            if(customerObject){
                return customerObject;
            }else{
                return null;
            }
        };

        var customerPageData = [];
        var customerPage = 0;
        var customerObject;


    })
    .service('modalService', ['$modal',
        function ($modal) {

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'app/partials/modal.html'
            };

            var modalOptions = {
                closeButtonText: 'Close',
                actionButtonText: 'OK',
                headerText: 'Proceed?',
                bodyText: 'Perform this action?',
                record: null,
                model1: null,
                model2: null,
                model3: null,
                model4: null
            };

            this.showModal = function (customModalDefaults, customModalOptions) {
                if (!customModalDefaults) customModalDefaults = {};
                customModalDefaults.backdrop = 'static';
                return this.show(customModalDefaults, customModalOptions);
            };

            this.show = function (customModalDefaults, customModalOptions) {
                //Create temp objects to work with since we're in a singleton service
                var tempModalDefaults = {};
                var tempModalOptions = {};

                //Map angular-ui modal custom defaults to modal defaults defined in this service
                angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

                //Map modal.html $scope custom properties to defaults defined in this service
                angular.extend(tempModalOptions, modalOptions, customModalOptions);

                if (!tempModalDefaults.controller) {
                    tempModalDefaults.controller = function ($scope, $modalInstance) {
                        $scope.modalOptions = tempModalOptions;
                        $scope.modalOptions.ok = function (result) {
                            $modalInstance.close('ok');
                        };
                        $scope.modalOptions.close = function (result) {
                            $modalInstance.close('cancel');
                        };
                    };
                }

                return $modal.open(tempModalDefaults).result;
            };


        }
    ])
    .service('dialogService', ['$dialog',
        function ($dialog) {
            var dialogDefaults = {
                backdrop: true,
                keyboard: true,
                backdropClick: true,
                dialogFade: true,
                templateUrl: 'app/partials/dialog.html'
            };

            var dialogOptions = {
                closeButtonText: 'Close',
                actionButtonText: 'OK',
                headerText: 'Proceed?',
                bodyText: 'Perform this action?'
            };

            this.showModalDialog = function (customDialogDefaults, customDialogOptions) {
                if (!customDialogDefaults) customDialogDefaults = {};
                customDialogDefaults.backdropClick = false;
                this.showDialog(customDialogDefaults, customDialogOptions);
            };

            this.showDialog = function (customDialogDefaults, customDialogOptions) {
                //Create temp objects to work with since we're in a singleton service
                var tempDialogDefaults = {};
                var tempDialogOptions = {};

                //Map angular-ui dialog custom defaults to dialog defaults defined in this service
                angular.extend(tempDialogDefaults, dialogDefaults, customDialogDefaults);

                //Map dialog.html $scope custom properties to defaults defined in this service
                angular.extend(tempDialogOptions, dialogOptions, customDialogOptions);

                if (!tempDialogDefaults.controller) {
                    tempDialogDefaults.controller = function ($scope, dialog) {
                        $scope.dialogOptions = tempDialogOptions;
                        $scope.dialogOptions.close = function (result) {
                            dialog.close(result);
                        };
                        $scope.dialogOptions.callback = function () {
                            dialog.close();
                            customDialogOptions.callback();
                        };
                    };
                }

                var d = $dialog.dialog(tempDialogDefaults);
                d.open();
            };

            this.showMessage = function (title, message, buttons) {
                var defaultButtons = [
                    {
                        result: 'ok',
                        label: 'OK',
                        cssClass: 'btn-primary'
                    }
                ];
                var msgBox = new $dialog.dialog({
                    dialogFade: true,
                    templateUrl: 'template/dialog/message.html',
                    controller: 'MessageBoxController',
                    resolve: {
                        model: function () {
                            return {
                                title: title,
                                message: message,
                                buttons: buttons === null ? defaultButtons : buttons
                            };
                        }
                    }
                });
                return msgBox.open();
            };
        }

    ]);