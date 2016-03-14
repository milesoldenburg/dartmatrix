// Global dependencies
$ = require('./bower_components/jquery/dist/jquery.min');
jQuery = $; // jshint ignore:line
var Backbone = require('./bower_components/backbone/backbone-min');
Backbone.$ = $;
_ = require('underscore');
var App = require('./js/app/app');
require('./bower_components/bootstrap/dist/js/bootstrap');

// Module dependencies
var Router = require('./js/app/router');
var Overrides = require('./js/app/overrides');
Window.Engine = require('./js/app/engine');

// Apply custom backbone overrides
Overrides.init();

Window.Engine.initializeAdjacencyList();

$(document).ready(function(){
    // Set up the router
    App.access.Router = new Router();

    // Start the history
    Backbone.history.start({
        'root' : ''
    });
});
