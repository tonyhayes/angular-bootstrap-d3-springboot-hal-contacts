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
    var appEntryPoint = 'http://localhost:9090/index.html';
//http://stackoverflow.com/questions/20959748/e2e-protractor-test-requiring-oauth-authentication
    browser.driver.get('http://localhost:9090/login.html');
    ptor = protractor.getInstance();
 // this nap is necessary to let spring load.
 //   browser.driver.sleep(1000);

            browser.driver.findElement(by.name('username')).sendKeys('tony');
            browser.driver.findElement(by.css('.btn-primary')).click();

    // make sure all the pages can be accessed

    it('#1. should automatically redirect to main page when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch(appEntryPoint + "#/customers");
    });

    it('#2. should contain a view class in order to render correctly', function () {
        var ele = by.css('.view');
        expect(ptor.isElementPresent(ele)).toBe(true);
    });

    it('#3. should contain a brand class with the app name', function () {
        expect(element.all(by.css('.brand')).first().getText()).
            toMatch(/Customer Manager/);
    });

    it('#4. should load the footer page', function () {
        var ele = by.css('.footer');
        expect(ptor.isElementPresent(ele)).toBe(true);
    });

    describe('customers', function () {

        var ptor;
        beforeEach(function () {
            browser.get(appEntryPoint + "#/customers");
            ptor = protractor.getInstance();
        });

        it('#5. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#6. should render customers when user navigates to /customers', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Company Cards/);
        });

        it('#7. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#8. should load the footer page', function () {
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


        it('#9. should render contact details when user navigates to contact details', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Contact Card Details/);
        });

        it('#10. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#11. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#12. should load the footer page', function () {
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


        it('#13. should render opportunity details when user navigates to opportunity details', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Opportunity Details/);
        });

        it('#14. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#15. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#16. should load the footer page', function () {
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


        it('#17. should render opportunity maintenance when user navigates to edit page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Opportunities Maintenance/);
        });

        it('#18. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#19. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#20. should load the footer page', function () {
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


        it('#21. should render customer maintenance when user navigates to edit page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Maintenance/);
        });

        it('#22. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#23. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#24. should load the footer page', function () {
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


        it('#25. should render form administration when user navigates to the form admin page', function () {
            expect(element.all(by.css('h1')).first().getText()).
                toMatch(/Create fields for your opportunities form/);
        });

        it('#26. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#27. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#28. should load the footer page', function () {
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


        it('#29. should render form administration when user navigates to the form admin page', function () {
            expect(element.all(by.css('h1')).first().getText()).
                toMatch(/Create custom fields for your forms/);
        });

        it('#30. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#31. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#33. should load the footer page', function () {
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


        it('#29-1. should render sales page when user navigates to the sales admin page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Sales People Details/);
        });

        it('#30-1. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#31-1. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#33-1. should load the footer page', function () {
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


        it('#29-2. should render probability page when user navigates to the probability admin page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Probabilities Details/);
        });

        it('#30-2. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#31-2. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#33-2. should load the footer page', function () {
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


        it('#29-3. should render state page when user navigates to the state admin page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/States Details/);
        });

        it('#30-3. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#31-3. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#33-3. should load the footer page', function () {
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


        it('#29-4. should render opportunity cards page when user navigates to the opportunity cards page', function () {
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Opportunity Cards/);
        });

        it('#30-4. should contain a view class in order to render correctly', function () {
            var ele = by.css('.view');
            expect(ptor.isElementPresent(ele)).toBe(true);
        });

        it('#31-4. should contain a brand class with the app name', function () {
            expect(element.all(by.css('.brand')).first().getText()).
                toMatch(/Customer Manager/);
        });

        it('#33-4. should load the footer page', function () {
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

        it('#34. should navigate to the /customers page when clicking', function () {
            element(by.css('.navbar-inner ul li:nth-child(1)')).click();
            expect(ptor.getCurrentUrl()).toMatch(/\/customers/);

            // just to make sure
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Company Cards/);

        });


        it('#35. should navigate to the /customers page when clicking the brand', function () {
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


        it('#36. should have 20 customers (for some reason you count twice?)', function () {
            var elems = element.all(by.repeater("customer in customerPages.items"));
            expect(elems.count()).not.toEqual(0);
        });

        it('#37. the last card includes a delete element', function () {
            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.last().then(function (elm) {
                elm.findElement(by.tagName('button')).then(function (button) {
                    button.getAttribute('title').then(function (title) {
                        expect(title).toMatch(/delete/);
                    });
                })
            });
        });

        it('#38. the last card includes a delete element - test delete', function () {
            var elems = element.all(by.repeater('customer in customerPages.items'));
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
        it('#39. should filter down to reflect the filter input', function () {

            element(by.input('searchText')).sendKeys('Hay');
            ptor.sleep(1000);

            var eles = element.all(by.repeater("customer in customerPages.items"));
            expect(eles.count()).not.toBe(0);


        });

        // test add customer button
        it('#40. should navigate to the /customeredit page when clicking the plus icon', function () {
            element(by.css('.icon-plus')).click();
            expect(ptor.getCurrentUrl()).toMatch(/\/customeredit/);

            // just to make sure
            expect(element.all(by.css('h3')).first().getText()).
                toMatch(/Customer Maintenance/);


        });

        // test maintain customer button
        it('#41. should navigate to the customer card page when clicking', function () {
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
        it('#42. should navigate to the contact cards page when clicking', function () {
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
        it('#43. should navigate to the opportunity cards page when clicking', function () {
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


        it('#44. should modify the customer name, navigate away with no changes to the customer', function () {

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

        it('#45. should modify the customer name on enter', function () {

            element(by.input('master.companyName')).sendKeys('chernoble gases\n');

            var elems = element.all(by.repeater('customer in customerPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {

                    var companyName = anchor[0].getText();

                    expect(companyName).toContain('chernoble gases');
                });
            });
        });

        it('#46. should modify the customer name on submit', function () {

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

        it('#47. should reset this so test can run again', function () {
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
        it('#48. should have 20 customers (for some reason you count twice?)', function () {
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

        it('#50. the last card includes a delete element - test delete', function () {
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
        it('#51. should filter down to reflect the filter input', function () {

            element(by.input('searchText')).sendKeys('Hay');
            ptor.sleep(1000);

            var eles = element.all(by.repeater("contact in contactPages.items"));
            expect(eles.count()).not.toBe(0);


        });


        it('#52. should display a modal when clicking on add contact card', function () {
            element(by.css('.icon-plus')).click();
            ptor.sleep(1000);


            expect(element.all(by.css('.btn-primary')).first().getText()).
                toMatch(/Submit/);

        });

        // test maintain contact button
        it('#53. should navigate to the contact card page when clicking', function () {
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

        it('#54. should click on a card, display a modal, update a contact name then cancel leaving the name as-is', function () {

            var elems = element.all(by.repeater('contact in contactPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[0].click();

                    ptor.sleep(1000);

                    element(by.input('modalOptions.record.firstName')).sendKeys('yyy');


                    element.all(by.css('.btn')).first().click();
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

        it('#55. should click on a card, display a modal and update a contact name', function () {
            var elems = element.all(by.repeater('contact in contactPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[0].click();
            ptor.sleep(1000);

            element(by.input('modalOptions.record.firstName')).sendKeys('yyy');

            expect(element.all(by.css('.btn-primary')).first().getText()).
               toMatch(/Submit/);

            element.all(by.css('.btn-primary')).first().click();
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

        it('#55-1. reset contact name', function () {
            var elems = element.all(by.repeater('contact in contactPages.items'));
            elems.first().then(function (elm) {
                elm.findElements(by.tagName('a')).then(function (anchor) {


                    anchor[0].click();
                    ptor.sleep(1000);
                    element(by.input('modalOptions.record.firstName')).clear();

                    element(by.input('modalOptions.record.firstName')).sendKeys('Tony');

                    expect(element.all(by.css('.btn-primary')).first().getText()).
                        toMatch(/Submit/);

                    element.all(by.css('.btn-primary')).first().click();
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
        it('#56. should display a page when clicking on add opportunity ', function () {
            element(by.css('.icon-plus')).click();
            ptor.sleep(1000);

            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);

            expect(element.all(by.css('.btn-primary')).first().getText()).
                toMatch(/Submit/);

        });
        // test filter
        it('#57. should filter down to reflect the filter input', function () {

            element(by.input('filterOptions.filterText')).sendKeys('big');
            ptor.sleep(1000);

            var eles = element.all(by.repeater("row in renderedRows"));
            expect(eles.count()).toBe(2);

            element(by.input('filterOptions.filterText')).sendKeys('zzz');
            ptor.sleep(1000);

            var eles = element.all(by.repeater("row in renderedRows"));
            expect(eles.count()).toBe(1);

        });

        it('#58. should display a page when clicking on add opportunity ', function () {
            element(by.css('.icon-plus')).click();
            ptor.sleep(1000);

            expect(ptor.getCurrentUrl()).toMatch(/\/opportunitiesedit/);

            expect(element.all(by.css('.btn-primary')).first().getText()).
                toMatch(/Submit/);

        });

        it('#59. should double click on a row and display a page', function () {

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

        it('#60. should double click on a row, display opportunity edit and update name', function () {

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
                toMatch(/Chad Gardner/);

        });

        it('#61. should double click on a row, display opportunity edit, update name then cancel leaving the name as-is', function () {

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

        it('#62. should double click on a row, ' +
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

        it('#63. should double click on a row, ' +
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

