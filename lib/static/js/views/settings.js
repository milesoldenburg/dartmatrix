var fs = require('fs');
var templateSource = fs.readFileSync(__dirname + '/../../html/settings.html', 'utf8');
var Slider = require('../../bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider');
require('../../bower_components/bootstrap-switch/dist/js/bootstrap-switch');

module.exports = Backbone.View.extend({
    'initialize' : function(){
        // Options for fetch
        var fetchOptions = {
            'channel' : 'getAISettings',
            'success' : function(){
                this.view.render();
                this.view.delegateEvents();

                new Slider('#ai-level');
                $('#ai-enabled').bootstrapSwitch();
            },
            'view' : this
        };

        // Bind success callback to context
        _.bindAll(fetchOptions, 'success');

        // Fetch data
        this.model.fetch(fetchOptions);
    },
    'render' : function(){
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    },
    'template' : _.template(templateSource)
});
