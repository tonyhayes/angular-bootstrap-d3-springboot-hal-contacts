/* Filters */

angular.module('customersApp.filters', [])

    .filter('nameCityStateFilter', function () {

        return function (customers, filterValue) {
            if (!filterValue) return customers;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < customers.length; i++) {
                var cust = customers[i];
                if ((cust.companyName && cust.companyName.toLowerCase().indexOf(filterValue) > -1) ||
                    (cust.state && cust.state.toLowerCase().indexOf(filterValue) > -1) ||
                    (cust.city && cust.city.toLowerCase().indexOf(filterValue) > -1) ||
                    (cust.contactName && cust.contactName.toLowerCase().indexOf(filterValue) > -1)) {

                    matches.push(cust);

                }
            }
            return matches;
        };

    })
    .filter('companyNameFilter', function () {

        return function (customers, filterValue) {
            if (!filterValue) return customers;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < customers.length; i++) {
                var cust = customers[i];
                if ((cust.companyName && cust.companyName.toLowerCase().indexOf(filterValue) > -1)) {

                    matches.push(cust);

                }
            }
            return matches;
        };

    })
    .filter('contactNameCityStateFilter', function () {

        return function (contacts, filterValue) {
            if (!filterValue) return contacts;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < contacts.length; i++) {
                var contact = contacts[i];
                if ((contact.firstName && contact.firstName.toLowerCase().indexOf(filterValue) > -1) ||
                    (contact.state && contact.state.toLowerCase().indexOf(filterValue) > -1) ||
                    (contact.city && contact.city.toLowerCase().indexOf(filterValue) > -1) ||
                    (contact.lastName && contact.lastName.toLowerCase().indexOf(filterValue) > -1)) {

                    matches.push(contact);

                }
            }
            return matches;
        };
    })
    .filter('opportunityNameCityStateFilter', function () {

        return function (opportunities, filterValue) {
            if (!filterValue) return opportunities;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < opportunities.length; i++) {
                var opportunity = opportunities[i];
                if ((opportunity.discussion && opportunity.discussion.toLowerCase().indexOf(filterValue) > -1) ||
                    (opportunity.state && opportunity.state.toLowerCase().indexOf(filterValue) > -1) ||
                    (opportunity.city && opportunity.city.toLowerCase().indexOf(filterValue) > -1) ||
                    (opportunity.companyName && opportunity.companyName.toLowerCase().indexOf(filterValue) > -1)) {

                    matches.push(opportunity);

                }
            }
            return matches;
        };

    })
    .filter('salesPersonFilter', function () {

        return function (salesPeople, filterValue) {
            if (!filterValue) return salesPeople;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < salesPeople.length; i++) {
                var salesPerson = salesPeople[i];
                if ((salesPerson.firstName && salesPerson.firstName.toLowerCase().indexOf(filterValue) > -1) ||
                    (salesPerson.lastName && salesPerson.lastName.toLowerCase().indexOf(filterValue) > -1)) {

                    matches.push(salesPerson);

                }
            }
            return matches;
        };

    })
    .filter('probabilityFilter', function () {

        return function (probability, filterValue) {
            if (!filterValue) return probability;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < probability.length; i++) {
                var prob = probability[i];
                if ((prob.name && prob.name.toLowerCase().indexOf(filterValue) > -1)) {

                    matches.push(prob);

                }
            }
            return matches;
        };

    })
    .filter('companyChartObjectFilter', function () {

        return function (chartObj, filterValues) {
            if (!filterValues) return chartObj;

            var filter = [];

            //I have a problem with the type ahead adding a dash between words (!!)
            for (var k in filterValues) {
                filter.push(filterValues[k].text.replace(/-/g, ' '));
            }

            var matches = [];
            for (var i in chartObj) {
                var name = angular.copy(chartObj[i].companyName.replace(/-/g, ' '));
                if (filter.indexOf(name) != -1) {

                    matches.push(chartObj[i]);

                }
            }
            return matches;
        };

    })
    .filter('salesPersonChartObjectFilter', function () {

        return function (chartObj, filterValues) {
            if (!filterValues) return chartObj;

            var filter = [];

            //I have a problem with the type ahead adding a dash between words (!!)
            for (var k in filterValues) {
                filter.push(filterValues[k].text.replace(/-/g, ' '));
            }

            var matches = [];
            for (var i in chartObj) {
                var name = angular.copy(chartObj[i].salesPersonDescription.replace(/-/g, ' '));
                if (filter.indexOf(name) != -1) {

                    matches.push(chartObj[i]);

                }
            }
            return matches;
        };

    })
    .filter('probabilityChartObjectFilter', function () {

        return function (chartObj, filterValues) {
            if (!filterValues) return chartObj;

            var filter = [];

            //I have a problem with the type ahead adding a dash between words (!!)
            for (var k in filterValues) {
                filter.push(filterValues[k].text.replace(/-/g, ' '));
            }

            var matches = [];
            for (var i in chartObj) {
                var name = angular.copy(chartObj[i].companyName.replace(/-/g, ' '));
                if (filter.indexOf(name) != -1) {

                    matches.push(chartObj[i]);

                }
            }
            return matches;
        };
    })
        .filter('dateChartObjectFilter', function () {

            return function (chartObj, filterDate) {
                if (!filterDate) return chartObj;

                var d = new Date(filterDate).getTime();

                var matches = [];

                angular.forEach(chartObj, function (type) {
                    if (type.opportunityDate >= d) {
                        matches.push(type);
                    }
                });
                return matches;
            };

        })

;
