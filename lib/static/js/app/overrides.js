var ipc = require('electron').ipcRenderer;

// Perform any default Backbone overrides
var init = function(){
    // Override the default Backbone sync method to make all requests go through SQLite
    Backbone.sync = function(method, model, options){
        options = options || {};

        switch (method) {
            case 'create':
                break;
            case 'update':
                break;
            case 'delete':
                break;
            case 'read':
                // Ensure channel is set
                if (!_.has(options, 'channel')) {
                    console.log('ERROR: Backbone.sync: channel required');
                    break;
                }

                // Prepare callback
                ipc.on(options.channel + '-reply', function(event, response){
                    if (_.has(response, 'error')) {
                        if (_.has(options, 'error')) {
                            options.error(response.error);
                        }
                    } else {
                        if (_.has(options, 'success')) {
                            options.success(response);
                        }
                    }
                });

                // Send message to main
                ipc.send(options.channel, options.arguments);

                break;
        }
    };
};

module.exports = {
    'init' : init
};
