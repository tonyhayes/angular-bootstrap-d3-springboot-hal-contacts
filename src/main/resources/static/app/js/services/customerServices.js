
/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('customersApp.customerServices', []).
    value('version', '0.1')
    .service('statesService', function () {
        this.getStates = function () {
            return states;
        };
        var states = [
            {
                id: 'Arizona',
                state: "Arizona"
            },
            {
                id: 'Texas',
                state: "Texas"
            }
        ];

    })

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
    .service('customersService', function () {
        this.getCustomers = function () {
            return customers;
        };


        this.deleteCustomer = function (id) {
            for (var i = customers.length - 1; i >= 0; i--) {
                if (customers[i].customerId === id) {
                    customers.splice(i, 1);
                    break;
                }
            }
        };
        this.insertCustomer = function (customer) {
            customers.push(customer);
        };
        this.insertContact = function (record, contact) {
            for (var i = 0; i < customers.length; i++) {
                if (customers[i].customerId === record.customerId) {
                    customers[i].contacts.push(contact);
                }
            }
        };

        this.updateCustomer = function (record) {
            for (var i = 0; i < customers.length; i++) {
                if (customers[i].customerId === record.customerId) {
                    customers[i] = record;
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

        this.getCustomer = function (id) {
            for (var i = 0; i < customers.length; i++) {
                if (customers[i].customerId === id) {
                    return customers[i];
                }
            }
            return null;
        };
        var customers = [
            {
                customerId: "ec5329ed-ba10-4ad6-894a-bbd348d12222",
                summaryDocumentId: "00000000-0000-0000-0000-000000000000",
                contacts: [
                    {
                        firstname: "Charlie",
                        lastname: "Parker",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: "Ste 250",
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "281-240-3994",
                        cell: "713-430-7760"
                    },
                    {
                        firstname: "John",
                        lastname: "Roberts",
                        title: 'Project Manager',
                        addressLine1: "500 Century Lane",
                        addressLine2: "5th floor",
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-230-9983",
                        cell: "832-544-0998"
                    },
                    {
                        firstname: "Robert",
                        lastname: "Bird",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    },
                    {
                        id: 2,
                        customer: "ba1d6149-1545-411f-9e45-20dc82f1a438",
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: {"1": true}
                        },
                        discussion: 'currently in discussion with several other companies',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "1200 Arthers Seat Lane",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "Teak Elementary Oil and Gas Company",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Baker Henry"
            },
            {
                customerId: "ba1d6149-1545-411f-9e45-20dc82f1a438",
                summaryDocumentId: "38113d0e-a31d-4e56-90e5-789f8a41146d",
                contacts: [
                    {
                        firstname: "Bob",
                        lastname: "Butcher",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "777478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Bay",
                        lastname: "Micheals",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Branch",
                        lastname: "Davidian",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "51004 Sigmund Freud Avenue",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "Hacken Oil",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Wesley Snipes"
            },
            {
                customerId: "ff5c62bd-692c-4c74-84b9-1eace9c79704",
                summaryDocumentId: "00000000-0000-0000-0000-000000000000",
                contacts: [
                    {
                        firstname: "Simon",
                        lastname: "Le Bon",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Bach",
                        lastname: "Zach",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "12800 Alaskan Way",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "Shetland Gas",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Mick Ronson"
            },
            {
                customerId: "7fa3d0bb-0afc-4a71-8c58-72d431b6585f",
                summaryDocumentId: "00000000-0000-0000-0000-000000000000",
                contacts: [
                    {
                        firstname: "Robert",
                        lastname: "Baker",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Barbara",
                        lastname: "MacDonald",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Shirley",
                        lastname: "Rice",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "1500 Balck Gold Expressway",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "United Oil",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Vinalla Fudge"
            },
            {
                customerId: "b2dcc015-6108-4088-8904-020fd5be1222",
                summaryDocumentId: "00000000-0000-0000-0000-000000000000",
                contacts: [
                    {
                        firstname: "Thomas",
                        lastname: "Tank",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Matthew",
                        lastname: "Grapejuice",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "David",
                        lastname: "Longshadow",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "5 Smith St",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "Kinder James",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Rachel Jacobs"
            },
            {
                customerId: "7f48b488-653e-439e-9a1f-17093b0c9bbc",
                summaryDocumentId: "3739b2eb-e2fd-4868-9b4d-ab411ec0d6c2",
                contacts: [
                    {
                        firstname: "Brian",
                        lastname: "Ladder",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Sandy",
                        lastname: "Jackson",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Peter",
                        lastname: "Pusher",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "50 Washington Road",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "Jacobs Ladder Gas Company",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Kendal Smith"
            },
            {
                customerId: "11339e38-28ff-47fe-82f3-51e996edb804",
                summaryDocumentId: "3739b2eb-e2fd-4868-9b4d-ab411ec0d6c2",
                contacts: [
                    {
                        firstname: "Richard",
                        lastname: "Friendly",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Boz",
                        lastname: "Scaggs",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Emma",
                        lastname: "Thompson",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        email: "jsf@reboot.com",
                        zip: "77478",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "12385 Dairy Ashford Drive",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "DPI",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Eric Thompson"
            },
            {
                customerId: "8b52fc88-bba1-4a87-a427-4ccc5c2aa665",
                summaryDocumentId: "c7a9bd99-1ce2-44dc-82e4-01193ed067b2",
                contacts: [
                    {
                        firstname: "Carol",
                        lastname: "Oates",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Joyce",
                        lastname: "Brithers",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Tim",
                        lastname: "Dereks",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "23 Able Tasman St",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "James Cook Exploration Company",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Tahu Piddick"
            },
            {
                customerId: "16a6942a-8dd0-42c3-b0a5-8b33a27b427a",
                summaryDocumentId: "fde05592-0cb2-4f8d-81ce-7346885f4b6a",
                contacts: [
                    {
                        firstname: "Phillip",
                        lastname: "Hawkins",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Charlie",
                        lastname: "Riddick",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "David",
                        lastname: "Bowie",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "54 Buick Center Lane",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "Epcot Gas Company",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Martha Stewart"
            },
            {
                customerId: "a4df61ec-569a-405d-a0af-dc269643eb89",
                summaryDocumentId: "650b82ab-1fd2-454f-8dbe-29fab4375fa0",
                contacts: [
                    {
                        firstname: "Randall",
                        lastname: "Phillps",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "John",
                        lastname: "Hawkesby",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Stuart",
                        lastname: "Little",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "23 Fiddlers Lane",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "China Oil and Gas Company",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Brent Scowcroft"
            },
            {
                customerId: "c18ff017-72ce-472b-943f-992c02c33537",
                summaryDocumentId: "3d97e959-1ffd-44ac-9839-40ce83b9c039",
                contacts: [
                    {
                        firstname: "Kit",
                        lastname: "Bypass",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Lactose",
                        lastname: "Intollerant",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Bill",
                        lastname: "Bixby",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "57 Cook St",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "Muldoon Oil and Gas Company",
                state: "Texas",
                email: "jsf@reboot.com",
                zip: '77478',
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Robert Muldoon"
            },
            {
                customerId: "1fb84e6e-a262-4a83-b1e4-4aebc750578b",
                summaryDocumentId: "fbcab40d-5476-4262-940b-c6e8948b65f7",
                contacts: [
                    {
                        firstname: "Robert",
                        lastname: "Muldoon",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Wendy",
                        lastname: "Muldoon",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Baxter",
                        lastname: "Muldoon",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "8500 St Johns Lane",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "Bay Creek Oil and Gas Company",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Henry James"
            },
            {
                customerId: "639f6f14-9fca-462f-b754-263ba27f7802",
                summaryDocumentId: "00000000-0000-0000-0000-000000000000",
                contacts: [
                    {
                        firstname: "Jim",
                        lastname: "Bushman",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        email: "jsf@reboot.com",
                        zip: "77478",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Jack",
                        lastname: "Delaney",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Sender",
                        lastname: "Friendly",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "5004 Fannin Street",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "JPMC Oil and Gas Company",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Steve Watson"
            },
            {
                customerId: "59762259-7376-4b4d-a4fa-3a36fc96c140",
                summaryDocumentId: "00000000-0000-0000-0000-000000000000",
                contacts: [
                    {
                        firstname: "Brian",
                        lastname: "Singer",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Sally",
                        lastname: "Norcross",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Cindy",
                        lastname: "Rella",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77478",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "578 Travis Ave",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "Jim Bowie Oil and Gas Company",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Jacob Dylan"
            },
            {
                customerId: "7c46e70f-fe2e-4add-9112-07d37fe679d2",
                summaryDocumentId: "00000000-0000-0000-0000-000000000000",
                contacts: [
                    {
                        firstname: "Earl",
                        lastname: "Jones",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77486",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Tom",
                        lastname: "Petty",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77685",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    },
                    {
                        firstname: "Robin",
                        lastname: "Winter",
                        title: 'Project Manager',
                        addressLine1: "123 Settlers Way Blvd",
                        addressLine2: '',
                        city: "Houston",
                        state: "Texas",
                        zip: "77498",
                        email: "jsf@reboot.com",
                        phone: "713-830-8390",
                        cell: "832-489-9807"
                    }
                ],
                opportunities: [
                    {
                        id: 1,
                        customer: 'ec5329ed-ba10-4ad6-894a-bbd348d12222',
                        salesPerson: 15,
                        contact: 1,
                        opportunityForm: {
                            location: 15,
                            revenueSchedule: 1,
                            status: 1,
                            typeConversation: 1,
                            dealDate: "2014-03-13",
                            region: 15
                        },
                        discussion: 'current re-org is effecting all pending deals',
                        probability: 15,
                        potentialRevenue: 16000000,
                        opportunityDetails: [
                            {
                                salesPerson: 1,
                                followUpDate: 1394843600000,
                                Action: "call back after easter"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1384843600000,
                                Action: "call back after new year"
                            },
                            {
                                salesPerson: 1,
                                followUpDate: 1374843600000,
                                Action: "call back after thanksgiving"
                            }
                        ]
                    }
                ],
                addressLine1: "57 Runy Lane",
                addressLine2: "suite 450",
                city: "Houston",
                customerName: "Ad Council Oil and Gas Company",
                state: "Texas",
                zip: '77478',
                email: "jsf@reboot.com",
                phone: "713-244-4330",
                cell: "832-867-5440",
                contactName: "Kimberly Dyson"
            }
        ];


    })
    .service('modalService', ['$modal',
        function ($modal) {

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'partials/modal.html'
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
                templateUrl: 'partials/dialog.html'
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