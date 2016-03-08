// Global dependencies
$ = require('./bower_components/jquery/dist/jquery.min');
jQuery = $; // jshint ignore:line
var Slider = require('./bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider');
require('./bower_components/bootstrap-switch/dist/js/bootstrap-switch');

$(document).ready(function(){
    new Slider('#ai-level');
    $('#ai-enabled').bootstrapSwitch();
});
