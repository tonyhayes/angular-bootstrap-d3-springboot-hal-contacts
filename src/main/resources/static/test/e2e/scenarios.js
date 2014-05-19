'use strict';

/*
 * https://github.com/angular/protractor/blob/master/docs/getting-started.md
 * http://www.ng-newsletter.com/posts/practical-protractor.html
 * http://blog.busymachines.com/frontend/angularjs/testing/2013/10/28/testing-with-jasmine-and-protractor.html
 * https://docs.google.com/a/drillmap.com/presentation/d/1QWFnYAur19R7RQ5KkLkLDMOMz5jrzNlBId3XBrwRNs8/edit?pli=1#slide=id.p
 * https://github.com/angular/protractor/blob/master/spec/basic/findelements_spec.js
 * http://webslainte.blogspot.com/2014/01/angular-js-protractor-e2e-cheatsheet.html
 * */
describe('customersApp', function () {

    var ptor;
    var appEntryPoint = 'http://localhost:9090/index.html';
//http://stackoverflow.com/questions/20959748/e2e-protractor-test-requiring-oauth-authentication
    browser.driver.get('http://localhost:9090/login.html');
    ptor = protractor.getInstance();
 // this nap is necessary to let spring load.
 //   browser.driver.sleep(1000);

            browser.driver.findElement(by.name('username')).sendKeys('tony');
            browser.driver.findElement(by.css('.btn-primary')).click();

    // make sure all the pages can be accessed

    it('#100-100. should automatically redirect to main page when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch(appEntryPoint + "#/customers");
    });

    it('#100-200. should contain a view class in order to render correctly', function () {
        var ele = by.css('.view');
        expect(ptor.isElementPresent(ele)).toBe(true);
    });

    it('#100-300. should contain a brand class with the app name', function () {
        expect(element.all(by.css('.brand')).first().getText()).
            toMatch(/Customer Manager/);
    });

    it('#100-400. should load the footer page', function () {
        var ele = by.css('.footer');
        expect(ptor.isElementPresent(ele)).toBe(true);
    });

    describe('customers', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + "#/customers");
            ptor = protractor.getInstance();
        });

        it('#200-100. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#200-200. should render customers when user navigates to /customers', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Company Cards/);
        });

        it('#200-300. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#200-400. should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });
        // end of customers

    });


    describe('contact details', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + "#/contactcards/2");
            ptor = protractor.getInstance();
        });


        it('#300-100. should render contact details when user navigates to contact details', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Contact Card Details/);
        });

        it('#300-200. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#300-400. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#300-500. should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });
        // end of contact details

    });


    describe('opportunity details', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/opportunitydetails/10');
            ptor = protractor.getInstance();
        });


        it('#400-100. should render opportunity details when user navigates to opportunity details', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Opportunity Details/);
        });

        it('#400-200. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#400-300. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#400-400. should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });
        // end of opportunity details

    });

    describe('opportunity maintenance', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/opportunitiesedit/10/19');
            ptor = protractor.getInstance();
        });


        it('#400-100. should render opportunity maintenance when user navigates to edit page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Opportunities Maintenance/);
        });

        it('#400-200. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#400-300. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#400-400. should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });
        // end of opportunity maintenance

    });

    describe('customer edit', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/customeredit/10');
            ptor = protractor.getInstance();
        });


        it('#500-100. should render customer maintenance when user navigates to edit page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Maintenance/);
        });

        it('#500-200. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#500-300. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#500-400. should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        // end of customer edit

    });


    describe('opportunity form administration', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/forms/create');
            ptor = protractor.getInstance();
        });


        it('#600-100. should render form administration when user navigates to the form admin page', function () {
            expect(element.all(by.css('h1')).first().getText()).
                toMatch(/Create fields for your opportunities form/);
        });

        it('#600-200. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#600-300. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#600-400. should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        // end of form administration

    });

    describe('form field administration', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/createcustomfields');
            ptor = protractor.getInstance();
        });


        it('#700-100. should render form administration when user navigates to the form admin page', function () {
            expect(element.all(by.css('h1')).first().getText()).
                toMatch(/Create custom fields for your forms/);
        });

        it('#700-200. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#700-300. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#700-400. should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        // end of form administration

    });

    describe('sales person administration', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/admin/sales');
            ptor = protractor.getInstance();
        });


        it('#800-100. should render sales page when user navigates to the sales admin page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Sales People Details/);
        });

        it('#800-200. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#800-300. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#800-400. should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        // end of sales administration

    });

    describe('probability administration', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/admin/probability');
            ptor = protractor.getInstance();
        });


        it('#900-100. should render probability page when user navigates to the probability admin page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Probabilities Details/);
        });

        it('#900-200. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#900-300. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#900-400. should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        // end of probability administration

    });
    describe('state administration', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/admin/states');
            ptor = protractor.getInstance();
        });


        it('#1000-100. should render state page when user navigates to the state admin page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/States Details/);
        });

        it('#1000-200. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#1000-300. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#1000-400. should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        // end of state administration

    });

    describe('opportunity cards', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/opportunities');
            ptor = protractor.getInstance();
        });


        it('#1100-100. should render opportunity cards page when user navigates to the opportunity cards page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Opportunity Cards/);
        });

        it('#1100-200. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#1100-300. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#1100-400. should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        // end of opportunity cards

    });

    // now go through each page in detail


    describe('customer header interactions', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/customers');
            ptor = protractor.getInstance();
        });

//        it('should navigate to the /create page when clicking', function () {
//            element(by.css('.navbar-inner ul li:nth-child(2)')).click();
//            expect(ptor.getCurrentUrl()).toMatch(/\/create/);
//
//            // just to make sure
//            expect(element.all(by.css('h1')).first().getText()).
//                toMatch(/Create fields for your opportunities form/);
//
//        });

        it('#1200-100. should navigate to the /customers page when clicking', function () {
            element(by.css('.navbar-inner ul li:nth-child(1)')).click();
            expect(ptor.getCurrentUrl()).toMatch(/\/customers/);

            // just to make sure
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Company Cards/);

        });


        it('#1200-200. should navigate to the /customers page when clicking the brand', function () {
            element(by.css('.brand')).click();
            expect(ptor.getCurrentUrl()).toMatch(/\/customers/);

            // just to make sure
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Company Cards/);

        });
        // end of customers header interactions

    });


    describe('customers page interactions', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/customers');
            ptor = protractor.getInstance();
        });


        it('#1300-100. should have some customers', function () {
            var elems = element.all(by.repeater("customer in customerPages.items"));
            expect(elems.count()).not.toEqual(0);
        });


        // test filter
        it('#1300-200. should filter down to reflect the filter input', function () {

            element(by.input('searchText')).sendKeys('Hay');
            ptor.sleep(1000);

            var eles = element.all(by.repeater("customer in customerPages.items"));
            expect(eles.count()).not.toBe(0);


        });
        it('#1300-300. should remove filter', function () {

            element(by.input('searchText')).clear();
            ptor.sleep(1000);

            var eles = element.all(by.repeater("customer in customerPages.items"));
            expect(eles.count()).not.toBe(0);


        });

        // test add customer button
        it('#1300-400. should navigate to the /customeredit page when clicking the plus icon', function () {
            element(by.css('.icon-plus')).click();
            expect(ptor.getCurrentUrl()).toMatch(/\/customeredit/);

            // just to make sure
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Maintenance/);


        });

        // test maintain customer button
        it('#1300-500. should navigate to the customer card page when clicking', function () {
            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[0].click();

                    expect(ptor.getCurrentUrl()).toMatch(/\/customeredit/);

//            // just to make sure
                    expect(element.all(by.css('h3')).first().getText()).
                        toMatch(/Customer Maintenance/);


                });
            });

        });


        // test view contacts button
        it('#1300-600. should navigate to the contact cards page when clicking', function () {
            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[1].click();

                    expect(ptor.getCurrentUrl()).toMatch(/\/contactcards/);

            // just to make sure
                    expect(element.all(by.css('h3')).first().getText()).
                        toMatch(/Contact Card Details/);


                });
            });

        });

        // test view opportunities button
        it('#1300-700. should navigate to the opportunity cards page when clicking', function () {
            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[2].click();

                    expect(ptor.getCurrentUrl()).toMatch(/\/opportunitydetails/);

            // just to make sure
                    expect(element.all(by.css('h3')).first().getText()).
                        toMatch(/Customer Opportunity Details/);

                });
            });

        });
        // end of customers page interactions





            // test add customer button
        it('#1300-800. create a new customer', function () {
            element(by.css('.icon-plus')).click();
            expect(ptor.getCurrentUrl()).toMatch(/\/customeredit/);

            // just to make sure
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Maintenance/);

            element(by.input('master.companyName')).sendKeys('AAA-AAA The Testing Company');
            element(by.input('master.contactName')).sendKeys('Contact Name');
            element(by.input('master.addressLine1')).sendKeys('Address Line 1');
            element(by.input('master.addressLine2')).sendKeys('Address Line 2');
            element(by.input('master.city')).sendKeys('city');

            ptor.findElement(protractor.By.css('select option:nth-child(2)')).click();

            element(by.input('master.zip')).sendKeys('zip');
            element(by.input('master.email')).sendKeys('email@email.com');
            element(by.input('master.phone')).sendKeys('phone');
            element(by.input('master.cell')).sendKeys('cell');
            element(by.input('master.webPage')).sendKeys('webPage');
            element(by.model('master.notes')).sendKeys('notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes');

            element(by.css('.btn-primary')).click();
            ptor.sleep(1000);

            expect(ptor.getCurrentUrl()).toMatch(/\/customers/);

            // just to make sure
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Company Cards/);


            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {

                    var companyName = anchor[0].getText();

                    expect(companyName).toBe('AAA-AAA The Testing Company');


                });
            });

// now add contacts
            //click on view contacts,
            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[1].click();

                    expect(ptor.getCurrentUrl()).toMatch(/\/contactcards/);

                    // just to make sure
                    expect(element.all(by.css('h3')).first().getText()).
                        toMatch(/Contact Card Details/);

                });
            });

        });


// now click on add a contact
            it('#1300-900. should display a modal when clicking on add contact card', function () {
                //click on view contacts,
                var elems = element.all(by.repeater('customer in customerPages.items'));
                elems.first().then(function (elm) {
                    elm.findElements(by.tagName('a')).then(function (anchor) {


                        anchor[1].click();

                        expect(ptor.getCurrentUrl()).toMatch(/\/contactcards/);

                        // just to make sure
                        expect(element.all(by.css('h3')).first().getText()).
                            toMatch(/Contact Card Details/);

                    });
                });
                ptor.sleep(1000);


                element(by.css('.icon-plus')).click();
                ptor.sleep(1000);


                expect(element.all(by.css('.btn-primary')).first().getText()).
                    toMatch(/Submit/);

                //now add a contact

                element(by.input('modalOptions.record.firstName')).sendKeys('AAA-AAA The Testing Contact');
                element(by.input('modalOptions.record.lastName')).sendKeys('Card');
                element(by.input('modalOptions.record.title')).sendKeys('title');
                element(by.input('modalOptions.record.addressLine1')).sendKeys('Address Line 1');
                element(by.input('modalOptions.record.addressLine2')).sendKeys('Address Line 2');
                element(by.input('modalOptions.record.city')).sendKeys('city');

                ptor.findElement(protractor.By.css('select option:nth-child(2)')).click();

                element(by.input('modalOptions.record.zip')).sendKeys('zip');
                element(by.input('modalOptions.record.email')).sendKeys('email@email.com');
                element(by.input('modalOptions.record.phone')).sendKeys('phone');
                element(by.input('modalOptions.record.cell')).sendKeys('cell');
                element(by.input('modalOptions.record.webPage')).sendKeys('webPage');
                element(by.model('modalOptions.record.notes')).sendKeys('notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes');

                element(by.css('.btn-primary')).click();
                ptor.sleep(1000);

                expect(ptor.getCurrentUrl()).toMatch(/\/contactcards/);

                // just to make sure
                expect(element.all(by.css('h3')).first().getText()).
                    toMatch(/Contact Card Details/);


                var elems = element.all(by.repeater('contact in contactPages.items'));
                elems.first().then(function (elm) {
                    elm.findElements(by.tagName('a')).then(function (anchor) {

                        var cardName = anchor[0].getText();

                        expect(cardName).toContain('AAA-AAA The Testing Contact');


                    });
                });


            });
// now click on add a contact again
            it('#1300-1000. should display a modal when clicking on add contact card', function () {
                //click on view contacts,
                var elems = element.all(by.repeater('customer in customerPages.items'));
                elems.first().then(function (elm) {
                    elm.findElements(by.tagName('a')).then(function (anchor) {


                        anchor[1].click();

                        expect(ptor.getCurrentUrl()).toMatch(/\/contactcards/);

                        // just to make sure
                        expect(element.all(by.css('h3')).first().getText()).
                            toMatch(/Contact Card Details/);

                    });
                });

                ptor.sleep(1000);


                element(by.css('.icon-plus')).click();
                ptor.sleep(1000);


                expect(element.all(by.css('.btn-primary')).first().getText()).
                    toMatch(/Submit/);

                //now add a contact

                element(by.input('modalOptions.record.firstName')).sendKeys('AA-AAA-AAA2 The Testing Contact2');
                element(by.input('modalOptions.record.lastName')).sendKeys('Card');
                element(by.input('modalOptions.record.title')).sendKeys('title');
                element(by.input('modalOptions.record.addressLine1')).sendKeys('Address Line 1');
                element(by.input('modalOptions.record.addressLine2')).sendKeys('Address Line 2');
                element(by.input('modalOptions.record.city')).sendKeys('city');

                ptor.findElement(protractor.By.css('select option:nth-child(2)')).click();

                element(by.input('modalOptions.record.zip')).sendKeys('zip');
                element(by.input('modalOptions.record.email')).sendKeys('email@email.com');
                element(by.input('modalOptions.record.phone')).sendKeys('phone');
                element(by.input('modalOptions.record.cell')).sendKeys('cell');
                element(by.input('modalOptions.record.webPage')).sendKeys('webPage');
                element(by.model('modalOptions.record.notes')).sendKeys('notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes');

                element(by.css('.btn-primary')).click();
                ptor.sleep(1000);

                expect(ptor.getCurrentUrl()).toMatch(/\/contactcards/);

                // just to make sure
                expect(element.all(by.css('h3')).first().getText()).
                    toMatch(/Contact Card Details/);


                var elems = element.all(by.repeater('contact in contactPages.items'));
                elems.first().then(function (elm) {
                    elm.findElements(by.tagName('a')).then(function (anchor) {

                        var firstName = anchor[0].getText();

                        expect(firstName).toContain('The Testing Contact');


                    });
                });




        });

//now add opportunities
        it('#1300-1100. should create new opportunities', function () {

            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {

                elm.findElements(by.tagName('a')).then(function (anchor) {

                    var companyName = anchor[0].getText();

                    expect(companyName).toContain('AAA-AAA The Testing Company');


                });


                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[2].click();

                    expect(ptor.getCurrentUrl()).toMatch(/\/opportunitydetails/);

                    // just to make sure
                    expect(element.all(by.css('h3')).first().getText()).
                        toMatch(/Customer Opportunity Details/);

                });
            });

            // click to add an opportunity
            element(by.css('.icon-plus')).click();
            ptor.sleep(1000);

            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);

            expect(element.all(by.css('.btn-primary')).first().getText()).
                toMatch(/Submit/);

            // now add one
            var el = element(by.model('master.salesPersonId'));
            el.findElement(protractor.By.css('select option:nth-child(2)')).click();

            el = element(by.model('master.contactId'));
            el.findElement(protractor.By.css('select option:nth-child(2)')).click();

            el = element(by.model('master.probabilityId'));
            el.findElement(protractor.By.css('select option:nth-child(2)')).click();

            element(by.input('master.potentialRevenue')).sendKeys('$100,000.00');
            element(by.model('master.discussion')).sendKeys('notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes');

            element(by.css('.btn-primary')).click();
            ptor.sleep(1000);


        });

// //now add opportunities, again
//        it('#1300-1200. should create new opportunities', function () {
//
//            var elems = element.all(by.repeater('customer in customerPages.items'));
//            elems.first().then(function (elm) {
//
//                elm.findElements(by.tagName('a')).then(function (anchor) {
//
//                    var companyName = anchor[0].getText();
//
//                    expect(companyName).toContain('The Testing Company');
//
//
//                });
//
//
//                elm.findElements(by.tagName('a')).then(function (anchor) {
//
//
//                    anchor[2].click();
//
//                    expect(ptor.getCurrentUrl()).toMatch(/\/opportunitydetails/);
//
//                    // just to make sure
//                    expect(element.all(by.css('h3')).first().getText()).
//                        toMatch(/Customer Opportunity Details/);
//
//                });
//            });
//
//            // click to add an opportunity
//            element(by.css('.icon-plus')).click();
//            ptor.sleep(1000);
//
//            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);
//
//            expect(element.all(by.css('.btn-primary')).first().getText()).
//                toMatch(/Submit/);
//
//            // now add one
//            var el = element(by.model('master.salesPersonId'));
//            el.findElement(protractor.By.css('select option:nth-child(1)')).click();
//
//            el = element(by.model('master.contactId'));
//            el.findElement(protractor.By.css('select option:nth-child(1)')).click();
//
//            el = element(by.model('master.probabilityId'));
//            el.findElement(protractor.By.css('select option:nth-child(1)')).click();
//
//            element(by.input('master.potentialRevenue')).sendKeys('$190,000.00');
//            element(by.model('master.discussion')).sendKeys('notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes\n');
//
//            element(by.css('.btn-primary')).click();
//        });

    it('#1300-1250. should create new action', function () {

        var elems = element.all(by.repeater('customer in customerPages.items'));
        elems.first().then(function (elm) {

            elm.findElements(by.tagName('a')).then(function (anchor) {

                var companyName = anchor[0].getText();

                expect(companyName).toContain('The Testing Company');


            });


            elm.findElements(by.tagName('a')).then(function (anchor) {


                anchor[2].click();

                expect(ptor.getCurrentUrl()).toMatch(/\/opportunitydetails/);

                // just to make sure
                expect(element.all(by.css('h3')).first().getText()).
                    toMatch(/Customer Opportunity Details/);

            });
        });
            //go back into the opportunities and add some actions
            var target = element.all(by.css('.ngCell')).first();

            browser.actions().doubleClick(target).perform();
            ptor.sleep(1000);

            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);

            // just to make sure
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Opportunities Maintenance/);

            // now add an action
            element(by.css('.icon-plus')).click();
            ptor.sleep(1000);

            var newDate = element( by.model('modalOptions.record.followUpdate') );
            newDate.click();
            element(by.model('inputDate')).sendKeys('01-30-2015\n');

            var elm = element(by.model('modalOptions.record.salesPersonId'));
            elm.findElement(protractor.By.css('select option:nth-child(2)')).click();
            element(by.model('modalOptions.record.action')).sendKeys('notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes');
            ptor.sleep(1000);

            element(by.css('.modal-footer .btn-primary')).click();


        });



    });

    describe('customer maintenance interactions', function () {

        var ptor;
        var name;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/customers');
            ptor = protractor.getInstance();

            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    name = anchor[0].getText();
                    anchor[0].click();

                    expect(ptor.getCurrentUrl()).toMatch(/\/customeredit/);

                    // just to make sure
                    expect(element.all(by.css('h3')).first().getText()).
                        toMatch(/Customer Maintenance/);

                });
            });

        });



        it('#1400-100. should modify the customer name, navigate away with no changes to the customer', function () {

            element(by.input('master.companyName')).sendKeys('chernoble gases');
            // return to customers page
            element(by.css('.navbar-inner ul li:nth-child(1)')).click();
            expect(ptor.getCurrentUrl()).toMatch(/\/customers/);

            // just to make sure
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Company Cards/);

            ptor.sleep(1000);

            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {

                    var companyName = anchor[0].getText();

                    expect(companyName).not.toContain('chernoble gases');
                });
            });
        });

        it('#1400-200. should modify the customer name on enter', function () {

            element(by.input('master.companyName')).sendKeys('chernoble gases\n');

            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {

                    var companyName = anchor[0].getText();

                    expect(companyName).toContain('chernoble gases');
                });
            });
        });

        it('#1400-300. should modify the customer name on submit', function () {

            element(by.input('master.companyName')).sendKeys('chernoble gases');
            element(by.css('.btn-primary')).click();

            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {

                    var companyName = anchor[0].getText();

                    expect(companyName).toContain('chernoble gases');
                });
            });
        });

        it('#1400-400. should reset this so test can run again', function () {
            element(by.input('master.companyName')).clear();
            element(by.input('master.companyName')).sendKeys('tonys last ditch effort');
            element(by.css('.btn-primary')).click();

            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {

                    var companyName = anchor[0].getText();

                    expect(companyName).not.toContain('chernoble gases');
                });
            });
        });

    // end of customer maintenance interactions
    });

    describe('contact interactions', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/customers');
            ptor = protractor.getInstance();

            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[1].click();

                    expect(ptor.getCurrentUrl()).toMatch(/\/contactcards/);

                    // just to make sure
                    expect(element.all(by.css('h3')).first().getText()).
                        toMatch(/Contact Card Details/);

                });
            });

        });
        it('#1400-500. should have cards ', function () {
            var elems = element.all(by.repeater("contact in contactPages.items"));
            expect(elems.count()).not.toEqual(0);
        });

        it('#49. the last card includes a delete element', function () {
            var elems = element.all(by.repeater('contact in contactPages.items'));
            elems.last().then(function (elm) {
                elm.findElement(by.tagName('button')).then(function (button) {
                    button.getAttribute('title').then(function (title) {
                        expect(title).toMatch(/delete/);
                    });
                })
            });
        });

        it('#1400-600. the last card includes a delete element - test delete', function () {
            var elems = element.all(by.repeater('contact in contactPages.items'));
            elems.last().then(function (elm) {
                elm.findElement(by.tagName('button')).click().then(function (modal) {
                    ptor.sleep(1000);
                    element(by.css('.btn-primary')).click().then(function (ok) {
//                        ptor.sleep(1000);
//                        var eles = element.all(by.repeater("customer in customerPages.items"));
//                        var b4 = parseInt(elems.count());
//                        var now = parseInt(eles.count());
//                        var total = b4 - now;
//                        expect(total).toBe(2);
                    });
                });
            });
        });

        // test filter
        it('#1400-700. should filter down to reflect the filter input', function () {

            element(by.input('searchText')).sendKeys('Hay');
            ptor.sleep(1000);

            var eles = element.all(by.repeater("contact in contactPages.items"));
            expect(eles.count()).not.toBe(0);


        });


        it('#1400-800. should display a modal when clicking on add contact card', function () {
            element(by.css('.icon-plus')).click();
            ptor.sleep(1000);


            expect(element.all(by.css('.btn-primary')).first().getText()).
                toMatch(/Submit/);

        });

        // test maintain contact button
        it('#1400-900. should navigate to the contact card page when clicking', function () {
            var elems = element.all(by.repeater('contact in contactPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[0].click();

                    ptor.sleep(1000);


                    expect(element.all(by.css('.btn-primary')).first().getText()).
                        toMatch(/Submit/);

                    element.all(by.css('.btn-primary')).first().click();
                    ptor.sleep(1000);


                });
            });

        });

        it('#1400-1000. should click on a card, display a modal, update a contact name then cancel leaving the name as-is', function () {

            var elems = element.all(by.repeater('contact in contactPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[0].click();

                    ptor.sleep(1000);

                    element(by.input('modalOptions.record.firstName')).sendKeys('yyy');


                    element.all(by.css('.modal-footer .btn')).first().click();
                    ptor.sleep(1000);

                    var elems = element.all(by.repeater('contact in contactPages.items'));
                    elems.first().then(function (elm) {
                        elm.findElements(by.tagName('a')).then(function (anchor) {

                            var firstName = anchor[0].getText();

                            expect(firstName).not.toContain('yyy');
                        });
                    });

                });
            });

        });

        it('#1400-1100. should click on a card, display a modal and update a contact name', function () {
            var elems = element.all(by.repeater('contact in contactPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[0].click();
            ptor.sleep(1000);

            element(by.input('modalOptions.record.firstName')).sendKeys('yyy');

            expect(element.all(by.css('.modal-footer .btn-primary')).first().getText()).
               toMatch(/Submit/);

            element.all(by.css('.modal-footer .btn-primary')).first().click();
            ptor.sleep(1000);

            var elems = element.all(by.repeater('contact in contactPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {

                    var companyName = anchor[0].getText();

                    expect(companyName).toContain('yyy');
                });
            });

        });
            });
        });

        it('#1400-1200. reset contact name', function () {
            var elems = element.all(by.repeater('contact in contactPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[0].click();
                    ptor.sleep(1000);
                    element(by.input('modalOptions.record.firstName')).clear();

                    element(by.input('modalOptions.record.firstName')).sendKeys('Tony');

                    expect(element.all(by.css('.btn-primary')).first().getText()).
                        toMatch(/Submit/);

                    element.all(by.css('.modal-footer .btn-primary')).first().click();
                    ptor.sleep(1000);

                    var elems = element.all(by.repeater('contact in contactPages.items'));
                    elems.first().then(function (elm) {
                        elm.findElements(by.tagName('a')).then(function (anchor) {

                            var companyName = anchor[0].getText();

                            expect(companyName).not.toContain('yyy');
                        });
                    });

                });
            });
        });


        // end of customer contact interactions
    });


    describe('opportunity interactions', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/customers');
            ptor = protractor.getInstance();

            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.last().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[2].click();

                    expect(ptor.getCurrentUrl()).toMatch(/\/opportunitydetails/);

                    // just to make sure
                    expect(element.all(by.css('h3')).first().getText()).
                        toMatch(/Customer Opportunity Details/);

                });
            });

        });
        it('#1500-100. should display a page when clicking on add opportunity ', function () {
            element(by.css('.icon-plus')).click();
            ptor.sleep(1000);

            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);

            expect(element.all(by.css('.btn-primary')).first().getText()).
                toMatch(/Submit/);

        });
        // test filter
        it('#1500-200. should filter down to reflect the filter input', function () {

            element(by.input('filterOptions.filterText')).sendKeys('AAA');
            ptor.sleep(1000);

            var eles = element.all(by.repeater("row in renderedRows"));
            expect(eles.count()).toBe(2);

            element(by.input('filterOptions.filterText')).sendKeys('zzz');
            ptor.sleep(1000);

            var eles = element.all(by.repeater("row in renderedRows"));
            expect(eles.count()).toBe(1);

        });

        it('#1500-300. should display a page when clicking on add opportunity ', function () {
            element(by.css('.icon-plus')).click();
            ptor.sleep(1000);

            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);

            expect(element.all(by.css('.btn-primary')).first().getText()).
                toMatch(/Submit/);

        });

        it('#1500-400. should double click on a row and display a page', function () {

            var target = element.all(by.css('.ngCell')).first();

            browser.actions().doubleClick(target).perform();
            ptor.sleep(1000);

            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);

            // just to make sure
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Opportunities Maintenance/);

            expect(element.all(by.css('.btn-primary')).first().getText()).
                toMatch(/Submit/);

            element.all(by.css('.btn-primary')).first().click();
            ptor.sleep(1000);



        });

        it('#1500-500. should double click on a row, display opportunity edit and update name', function () {

            var target = element.all(by.css('.ngCell')).first();

            browser.actions().doubleClick(target).perform();
            ptor.sleep(1000);

            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);



            ptor.findElement(protractor.By.css('select option:nth-child(1)')).click();

            expect(element.all(by.css('.btn-primary')).first().getText()).
                toMatch(/Submit/);

            element.all(by.css('.btn-primary')).first().click();
            ptor.sleep(1000);

//            expect(element.all(by.css('.ngCellText')).first().getText()).
//                toMatch(/Chad Gardner/);

        });

        it('#1500-600. should double click on a row, display opportunity edit, update name then cancel leaving the name as-is', function () {

            var target = element.all(by.css('.ngCell')).first();

            browser.actions().doubleClick(target).perform();
            ptor.sleep(1000);
            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);

            ptor.findElement(protractor.By.css('select option:nth-child(1)')).click();


            element(by.css('.navbar-inner ul li:nth-child(1)')).click();
            expect(ptor.getCurrentUrl()).toMatch(/\/customers/);


            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[2].click();

                    expect(ptor.getCurrentUrl()).toMatch(/\/opportunitydetails/);

                    // just to make sure
                    expect(element.all(by.css('h3')).first().getText()).
                        toMatch(/Customer Opportunity Details/);

//                    expect(element.all(by.css('.ngCellText')).first().getText()).
//                        toMatch(/Bob Richards/);


                });
            });




        });

        it('#1500-700. should double click on a row, ' +
            'display opportunity edit and double click on an action row to display a modal and change the sales name',
            function () {

            var target = element.all(by.css('.ngCell')).first();

            browser.actions().doubleClick(target).perform();
            ptor.sleep(1000);

            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);

            var target = element.all(by.css('.ngCell')).first();

            browser.actions().doubleClick(target).perform();
            ptor.sleep(1000);


            ptor.findElement(protractor.By.css('.modal-body select option:nth-child(2)')).click();

            expect(element.all(by.css('.modal-footer .btn-primary')).first().getText()).
                toMatch(/Submit/);

            element.all(by.css('.modal-footer .btn-primary')).first().click();
//            ptor.sleep(1000);
//
//            expect(element.all(by.css('.ngCellText')).first().getText()).
//                toMatch(/Bob Richards/);

        });

        it('#1500-800. should double click on a row, ' +
            'display opportunity edit and double click on an action row to display a modal, ' +
            'then back out', function () {

            var target = element.all(by.css('.ngCell')).first();

            browser.actions().doubleClick(target).perform();
            ptor.sleep(1000);

            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);

            var target = element.all(by.css('.ngCell')).first();

            browser.actions().doubleClick(target).perform();
            ptor.sleep(1000);


            ptor.findElement(protractor.By.css('.modal-body select option:nth-child(2)')).click();

            expect(element.all(by.css('.modal-footer .btn-primary')).first().getText()).
                toMatch(/Submit/);

            element.all(by.css('.modal-footer .btn')).first().click();
//            ptor.sleep(1000);
//
//            expect(element.all(by.css('.ngCellText')).first().getText()).
//                toMatch(/Bob Richards/);

        });



        // end of customer opportunity interactions
    });


 //   clean up

    describe('clean up interactions', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + '#/customers');
            ptor = protractor.getInstance();

            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.last().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[2].click();

                    expect(ptor.getCurrentUrl()).toMatch(/\/opportunitydetails/);

                    // just to make sure
                    expect(element.all(by.css('h3')).first().getText()).
                        toMatch(/Customer Opportunity Details/);

                });
            });

        });

        it('#1600-100. the first card includes a delete element', function () {
            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElement(by.tagName('button')).then(function (button) {
                    button.getAttribute('title').then(function (title) {
                        expect(title).toMatch(/delete/);
                    });
                })
            });
        });

        it('#1600-200. the first card includes a delete element - test delete', function () {
            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElement(by.tagName('button')).click().then(function (modal) {
                    ptor.sleep(1000);
                    element(by.css('.btn-primary')).click().then(function (ok) {
//                        ptor.sleep(1000);
//                        var eles = element.all(by.repeater("customer in customerPages.items"));
//                        var b4 = parseInt(elems.count());
//                        var now = parseInt(eles.count());
//                        var total = b4 - now;
//                        expect(total).toBe(2);
                    });
                });
            });
        });


    // end of clean up
});

// end of scenario's (I'm not sure if I'm supposed to nest like this .. need to research)
});

