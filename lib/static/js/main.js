// Global dependencies
var $ = require('./bower_components/jquery/dist/jquery.min');
var Backbone = require('./bower_components/backbone/backbone-min');
Backbone.$ = $;
var _ = require('underscore'); // jshint ignore:line
var App = require('./js/app/app');

// Module dependencies
var Router = require('./js/app/router');
var Overrides = require('./js/app/overrides');
var Engine = require('./js/app/engine');

// Apply custom backbone overrides
Overrides.init();

Engine.initializeAdjacencyList();
Engine.testAccuracy(0.8, 't20');

$(document).ready(function(){
    // Set up the router
    App.access.Router = new Router();

    // Start the history
    Backbone.history.start({
        'root' : ''
    });
});
