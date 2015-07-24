// Global dependencies
var $ = require('./bower_components/jquery/dist/jquery.min');
var Backbone = require('./bower_components/backbone/backbone-min');
Backbone.$ = $;
var _ = require('underscore'); // jshint ignore:line

// Module dependencies
var Router = require('./js/app/router');
var Overrides = require('./js/app/overrides');

// Apply custom backbone overrides
Overrides.init();

$(document).ready(function(){
    // Set up the router
    new Router();

    // Start the history
    Backbone.history.start({
        'root' : ''
    });
});
