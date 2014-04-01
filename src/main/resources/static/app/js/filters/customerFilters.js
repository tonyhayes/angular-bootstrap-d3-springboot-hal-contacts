
/* Filters */

angular.module('customersApp.filters', [])
    .filter('to_trusted', ['$sce',
        function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            };
        }
    ])
    .filter('nameCityStateFilter', function () {

        return function (customers, filterValue) {
            if (!filterValue) return customers;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < customers.length; i++) {
                var cust = customers[i];
                if (cust.customerName.toLowerCase().indexOf(filterValue) > -1 ||
                    cust.state.toLowerCase().indexOf(filterValue) > -1 ||
                    cust.city.toLowerCase().indexOf(filterValue) > -1 ||
                    cust.contactName.toLowerCase().indexOf(filterValue) > -1) {

                    matches.push(cust);

                }
            }
            return matches;
        };

    })
    .filter('mapSalesPerson', ['salesPersonService', function (salesPersonService) {
        return function (salesId) {
            var salesPerson = salesPersonService.getSalesPerson(salesId);
            if (salesPerson) {
                return salesPerson.salesPerson;
            } else {
                return 'unknown';
            }
        };
    }])
    .filter('mapCustomerName', ['customerNamesService', function (customerNamesService) {
        return function (customerNameId) {
            var customerName = customerNamesService.getCustomerName(customerNameId);
            if (customerName) {
                return customerName.customerName;
            } else {
                return 'unknown';
            }
        };
    }])
    .filter('mapProbability', ['probabilityService', function (probabilityService) {
        return function (probabilityId) {
            var probability = probabilityService.getProbability(probabilityId);
            if (probability) {
                return probability.probability;
            } else {
                return 'unknown';
            }
        };
    }])
    .filter('mapContact', ['contactService', function (contactService) {
        return function (contactId) {
            var contact = contactService.getProbability(contactId);
            if (contact) {
                return contact.contact;
            } else {
                return 'unknown';
            }
        };
    }]);
