// Global dependencies
$ = require('./bower_components/jquery/dist/jquery.min');
jQuery = $;
Backbone = require('./bower_components/backbone/backbone-min');
Backbone.$ = $;
_ = require('underscore');

var Overrides = require('./js/app/overrides');
Overrides.init();

// Module dependencies
var Router = require('./js/app/router');

$(document).ready(function(){
    // Set up the router
    new Router();

    // Start the history
    Backbone.history.start({
        'root' : ''
    });
});
