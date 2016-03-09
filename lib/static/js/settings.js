// Global dependencies
$ = require('./bower_components/jquery/dist/jquery.min');
jQuery = $; // jshint ignore:line
var Backbone = require('./bower_components/backbone/backbone-min');
Backbone.$ = $;
_ = require('underscore');
var Overrides = require('./js/app/overrides');

// Apply custom backbone overrides
Overrides.init();

var SettingsView = require('./js/views/settings');
var SettingsModel = require('./js/models/settings');

$(document).ready(function(){
    new SettingsView({
        'el' : $('.settings-page'),
        'model' : new SettingsModel()
    });
});
