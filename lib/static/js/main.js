var $ = require('./bower_components/jquery/dist/jquery.min');
var jQuery = $;
var Backbone = require('./bower_components/backbone/backbone-min');
var Bootstrap = require('./bower_components/bootstrap/dist/js/bootstrap.min');
var Router = require('./js/app/router');

$(document).ready(function(){
    // Set up the router
    new Router();

    // Start the history
    Backbone.history.start({
        'root' : ''
    });
});
