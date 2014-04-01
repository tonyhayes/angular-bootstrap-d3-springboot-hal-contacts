//http://www.ng-newsletter.com/posts/practical-protractor.html

exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        '../test/e2e/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },
//    chromeOnly: true,
//    chromeDriver: './node_modules/protractor/selenium/chromedriver',
//    seleniumAddress: 'http://0.0.0.0:4444/wd/hub',

    baseUrl: 'http://localhost:8888/app/',
  //   baseUrl: 'http://localhost:8000/app/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};