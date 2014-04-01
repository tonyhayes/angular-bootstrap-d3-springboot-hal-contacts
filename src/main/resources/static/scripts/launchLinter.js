var LintRoller = require('../node_modules/lintroller/src/LintRoller');

var config = {
    verbose: false,
    stopOnFirstError: false,

    logFile: {
        name: './error.log',
        type: 'json'
    },

    //recursively include JS files in these folders
    filepaths: [
        '../app/js/'
    ],

    //but ignore anything in these folders
    exclusions: [
        './node_modules/',
        './assets/',
        './docs/'
    ],

    linters: [
//        {
//            type : 'jsLint'
//        },
        {
            type: 'jsHint'
//        },
//        {
//            type : 'esprima'
        }
    ]
};

LintRoller.init(config);