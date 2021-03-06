'use strict';

// =================================================================================
// App Configuration: Create Webhook + Enable Logging + Language Resources Object
// =================================================================================

const webhook = require('../index').Webhook;
const app = require('../index').Jovo;

// Enable Logging for Quick Testing
app.enableRequestLogging();
app.enableResponseLogging();

let languageResources = {
    'en-US': {
        translation: {
            WELCOME: 'Welcome',
            WELCOME_WITH_PARAMETER: 'Welcome %s',
        },
    },
    'de-DE': {
        translation: {
            WELCOME: 'Willkommen',
            WELCOME_WITH_PARAMETER: 'Willkommen %s',
        },
    },
};

// Listen for post requests
webhook.listen(3000, function() {
    console.log('Example server listening on port 3000!');
});

webhook.post('/webhook', function(req, res) {
    app.handleRequest(req, res, handlers);
    app.execute();
});


// =================================================================================
// App Logic: 
// =================================================================================

let handlers = {

    'LAUNCH': function() {
        app.tell(app.t('WELCOME'));
    },

    'HelloWorldIntent': function() {
        app.tell(app.t('WELCOME_WITH_PARAMETER', 'John Doe'));
    },
};


// quick testing
// node indexi18n.js --launch --locale de-DE
// node indexi18n.js --launch --locale en-US
// node indexi18n.js --intent HelloWorldIntent --locale en-US
