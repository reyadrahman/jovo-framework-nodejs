'use strict';

// =================================================================================
// App Configuration: Create Webhook + Enable Logging
// =================================================================================

const webhook = require('../index').Webhook;
const app = require('../index').Jovo;

// Enable Logging for Quick Testing
app.enableRequestLogging();
app.enableResponseLogging();

// Listen for post requests
webhook.listen(3000, function() {
    console.log('Example server listening on port 3000!');
});

webhook.post('/webhook', function(req, res) {
    app.handleRequest(req, res, handlers);
    app.execute();
});


// =================================================================================
// App Logic: Story session attribute name=John Doe
// =================================================================================

let handlers = {

    'LAUNCH': function() {
        app.tell('App launched');
    },

    'HelloWorldIntent': function() {
        app.addSessionAttribute('name', 'John Doe');
        app.tell('Hello World');
    },

    'SessionIntent': function() {
        app.tell('Hello ' + app.getSessionAttribute('name'));
    },
};
