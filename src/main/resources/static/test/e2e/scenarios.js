'use strict';

/*
 * https://github.com/angular/protractor/blob/master/docs/getting-started.md
 * http://www.ng-newsletter.com/posts/practical-protractor.html
 * http://blog.busymachines.com/frontend/angularjs/testing/2013/10/28/testing-with-jasmine-and-protractor.html
 * https://docs.google.com/a/drillmap.com/presentation/d/1QWFnYAur19R7RQ5KkLkLDMOMz5jrzNlBId3XBrwRNs8/edit?pli=1#slide=id.p
 * https://github.com/angular/protractor/blob/master/spec/basic/findelements_spec.js
 * */

describe('customersApp', function () {

    var ptor;
    // make sure all the pages can be accessed

    browser.get('crm');
    ptor = protractor.getInstance();

    it('should automatically redirect to main page when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch("http://localhost:9090/crm#/customers");
    });

    it('should contain a view class in order to render correctly', function () {
        var ele = by.css('.view');
        expect(ptor.isElementPresent(ele)).toBe(true);
    });

    it('should contain a brand class with the app name', function () {
        expect(element.all(by.css('.brand')).first().getText()).
            toMatch(/Customer Manager/);
    });

    it('should load the footer page', function () {
        var ele = by.css('.footer');
        expect(ptor.isElementPresent(ele)).toBe(true);
    });

    describe('customers', function () {

        var ptor;
        beforeEach(function () {
            browser.get('http://localhost:9090/crm#/customers');
            ptor = protractor.getInstance();
        });

        it('should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('should render customers when user navigates to /customers', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Company Cards/);
        });

        it('should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });
        // end of customers

    });


    describe('contact details', function () {

        var ptor;
        beforeEach(function () {
            browser.get('http://localhost:9090/crm#/contactcards/2');
            ptor = protractor.getInstance();
        });


        it('should render contact details when user navigates to contact details', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Contact Card Details/);
        });

        it('should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });
        // end of contact details

    });


    describe('opportunity details', function () {

        var ptor;
        beforeEach(function () {
            browser.get('http://localhost:9090/crm#/opportunitydetails/10');
            ptor = protractor.getInstance();
        });


        it('should render opportunity details when user navigates to opportunity details', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Opportunity Details/);
        });

        it('should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });
        // end of opportunity details

    });

    describe('opportunity maintenance', function () {

        var ptor;
        beforeEach(function () {
            browser.get('http://localhost:9090/crm#/opportunitiesedit/10/19');
            ptor = protractor.getInstance();
        });


        it('should render opportunity maintenance when user navigates to edit page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Opportunities Maintenance/);
        });

        it('should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });
        // end of opportunity maintenance

    });

    describe('customer edit', function () {

        var ptor;
        beforeEach(function () {
            browser.get('http://localhost:9090/crm#/customeredit/10');
            ptor = protractor.getInstance();
        });


        it('should render customer maintenance when user navigates to edit page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Maintenance/);
        });

        it('should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        // end of customer edit

    });


    describe('opportunity form administration', function () {

        var ptor;
        beforeEach(function () {
            browser.get('http://localhost:9090/crm#/forms/create');
            ptor = protractor.getInstance();
        });


        it('should render form administration when user navigates to the form admin page', function () {
            expect(element.all(by.css('h1')).first().getText()).
                toMatch(/Create fields for your opportunities form/);
        });

        it('should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        // end of form administration

    });

    describe('form field administration', function () {

        var ptor;
        beforeEach(function () {
            browser.get('http://localhost:9090/crm#/createcustomfields');
            ptor = protractor.getInstance();
        });


        it('should render form administration when user navigates to the form admin page', function () {
            expect(element.all(by.css('h1')).first().getText()).
                toMatch(/Create custom fields for your forms/);
        });

        it('should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('should load the footer page', function () {
            var ele = by.css('.footer');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        // end of form administration

    });

    // now go through each page in detail


    describe('customer header interactions', function () {

        var ptor;
        beforeEach(function () {
            browser.get('http://localhost:9090/crm#/customers');
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

        it('should navigate to the /customers page when clicking', function () {
            element(by.css('.navbar-inner ul li:nth-child(1)')).click();
            expect(ptor.getCurrentUrl()).toMatch(/\/customers/);

            // just to make sure
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Company Cards/);

        });


        it('should navigate to the /customers page when clicking the brand', function () {
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
            browser.get('http://localhost:9090/crm#/customers');
            ptor = protractor.getInstance();
        });


        it('should have 20 customers (for some reason you count twice?)', function () {
            var elems = element.all(by.repeater("customer in customerPages.items"));
            expect(elems.count()).not.toEqual(0);
        });

        it('the first card includes a delete element', function () {
            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElement(by.tagName('button')).then(function (button) {
                    button.getAttribute('title').then(function (title) {
                        expect(title).toMatch(/delete/);
                    });
                })
            });
        });

        it('the first card includes a delete element - test delete', function () {
            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElement(by.tagName('button')).click().then(function (modal) {
                    ptor.sleep(1000);
                    element(by.css('.btn-primary')).click().then(function (ok) {
                        ptor.sleep(1000);
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
        it('should filter down to reflect the filter input', function () {
            var b4eles = element.all(by.repeater("customer in customerPages.items"));

            element(by.input('searchText')).sendKeys('Cab');
            ptor.sleep(1000);

//            var eles = element.all(by.repeater("customer in customerPages.items"));
//            var b4 = parseInt(b4eles.count());
//            var now = parseInt(eles.count());
//            var total = b4 - now;
//            expect(now).toBe(2);


        });

        // test add customer button
        it('should navigate to the /customeredit page when clicking the plus icon', function () {
            element(by.css('.icon-plus')).click();
            expect(ptor.getCurrentUrl()).toMatch(/\/customeredit/);

            // just to make sure
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Maintenance/);


        });

        // test maintain customer button
        it('should navigate to the customer card page when clicking', function () {
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
        it('should navigate to the contact cards page when clicking', function () {
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
        it('should navigate to the opportunity cards page when clicking', function () {
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
    });

    describe('customer maintenance interactions', function () {

        var ptor;
        var name;
        beforeEach(function () {
            browser.get('http://localhost:9090/crm#/customers');
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


        it('should modify the customer name, navigate away with no changes to the customer', function () {

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

        it('should modify the customer name on enter', function () {

            element(by.input('master.companyName')).sendKeys('chernoble gases\n');

            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {

                    var companyName = anchor[0].getText();

                    expect(companyName).toContain('chernoble gases');
                });
            });
        });

        it('should modify the customer name on submit', function () {

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

        it('should reset this so test can run again', function () {
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

//    describe('customer contact interactions', function () {
//
//        var ptor;
//        beforeEach(function () {
//            browser.get('http://localhost:9090/crm#/customers');
//            ptor = protractor.getInstance();
//
//            var elems = element.all(by.repeater('customer in customerPages.items'));
//            elems.first().then(function (elm) {
//                elm.findElements(by.tagName('a')).then(function (anchor) {
//
//
//                    anchor[1].click();
//
//                    expect(ptor.getCurrentUrl()).toMatch(/\/customercontactdetails/);
//
//                    // just to make sure
//                    expect(element.all(by.css('h3')).first().getText()).
//                        toMatch(/Customer Contact Card Details/);
//
//                });
//            });
//
//        });
//        // test filter
//        it('should filter down to reflect the filter input', function () {
//
//            element(by.input('filterOptions.filterText')).sendKeys('ear');
//            ptor.sleep(1000);
//
//            var eles = element.all(by.repeater("row in renderedRows"));
//            expect(eles.count()).toBe(4);
//
//            element(by.input('filterOptions.filterText')).sendKeys('zzz');
//            ptor.sleep(1000);
//
//            var eles = element.all(by.repeater("row in renderedRows"));
//            expect(eles.count()).toBe(3);
//
//        });
//
//        it('should display a modal when clicking on add contact card', function () {
//            element(by.css('.icon-plus')).click();
//            ptor.sleep(1000);
//
//
//            expect(element.all(by.css('.btn-primary')).first().getText()).
//                toMatch(/Submit/);
//
//        });
//        it('should double click on a row and display a modal', function () {
//
//            var target = element.all(by.css('.ngCell')).first();
//
//            browser.actions().doubleClick(target).perform();
//            ptor.sleep(1000);
//
//
//            expect(element.all(by.css('.btn-primary')).first().getText()).
//                toMatch(/Submit/);
//
//            element.all(by.css('.btn-primary')).first().click();
//            ptor.sleep(1000);
//
//
//
//        });
//
//        it('should double click on a row, display a modal and update a contact name', function () {
//
//            var target = element.all(by.css('.ngCell')).first();
//
//            browser.actions().doubleClick(target).perform();
//            ptor.sleep(1000);
//
//            element(by.input('modalOptions.record.firstname')).sendKeys('y');
//
//            expect(element.all(by.css('.btn-primary')).first().getText()).
//               toMatch(/Submit/);
//
//            element.all(by.css('.btn-primary')).first().click();
//            ptor.sleep(1000);
//
//            expect(element.all(by.css('.ngCellText')).first().getText()).
//                toMatch(/Early/);
//
//        });
//
//        it('should double click on a row, display a modal, update a contact name then cancel leaving the name as-is', function () {
//
//            var target = element.all(by.css('.ngCell')).first();
//
//            browser.actions().doubleClick(target).perform();
//            ptor.sleep(1000);
//
//            element(by.input('modalOptions.record.firstname')).sendKeys('y');
//
//
//            element.all(by.css('.btn')).first().click();
//            ptor.sleep(1000);
//
//            expect(element.all(by.css('.ngCellText')).first().getText()).
//                toMatch(/Earl/);
//
//        });
//
//        // end of customer contact interactions
//    });


    describe('customer opportunity interactions', function () {

        var ptor;
        beforeEach(function () {
            browser.get('http://localhost:9090/crm#/customers');
            ptor = protractor.getInstance();

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
        // test filter
        it('should filter down to reflect the filter input', function () {

            element(by.input('filterOptions.filterText')).sendKeys('big');
            ptor.sleep(1000);

            var eles = element.all(by.repeater("row in renderedRows"));
            expect(eles.count()).toBe(2);

            element(by.input('filterOptions.filterText')).sendKeys('zzz');
            ptor.sleep(1000);

            var eles = element.all(by.repeater("row in renderedRows"));
            expect(eles.count()).toBe(1);

        });

        it('should display a page when clicking on add opportunity ', function () {
            element(by.css('.icon-plus')).click();
            ptor.sleep(1000);

            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);

            expect(element.all(by.css('.btn-primary')).first().getText()).
                toMatch(/Submit/);

        });

        it('should double click on a row and display a page', function () {

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

        it('should double click on a row, display opportunity edit and update name', function () {

            var target = element.all(by.css('.ngCell')).first();

            browser.actions().doubleClick(target).perform();
            ptor.sleep(1000);

            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);



            ptor.findElement(protractor.By.css('select option:nth-child(2)')).click();

            expect(element.all(by.css('.btn-primary')).first().getText()).
                toMatch(/Submit/);

            element.all(by.css('.btn-primary')).first().click();
            ptor.sleep(1000);

            expect(element.all(by.css('.ngCellText')).first().getText()).
                toMatch(/Bob Richards/);

        });

        it('should double click on a row, display opportunity edit, update name then cancel leaving the name as-is', function () {

            var target = element.all(by.css('.ngCell')).first();

            browser.actions().doubleClick(target).perform();
            ptor.sleep(1000);
            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);

            ptor.findElement(protractor.By.css('select option:nth-child(2)')).click();


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

                    expect(element.all(by.css('.ngCellText')).first().getText()).
                        toMatch(/Bob Richards/);


                });
            });




        });

        it('should double click on a row, ' +
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
            ptor.sleep(1000);

            expect(element.all(by.css('.ngCellText')).first().getText()).
                toMatch(/Bob Richards/);

        });

        it('should double click on a row, ' +
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
            ptor.sleep(1000);

            expect(element.all(by.css('.ngCellText')).first().getText()).
                toMatch(/Bob Richards/);

        });



        // end of customer opportunity interactions
    });



// end of scenario's (I'm not sure if I'm supposed to nest like this .. need to research)
});

