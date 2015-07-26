var fs = require('fs');
var templateSource = fs.readFileSync(__dirname + '/../../html/home.html', 'utf8');

module.exports = Backbone.View.extend({
    'className' : 'title-page',
    'initialize' : function(){
        // Options for fetch
        var fetchOptions = {
            'channel' : 'getGameTypes',
            'success' : function(){
                this.view.render();
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
        $('#page-container').html(this.$el);

        return this;
    },
    'template' : _.template(templateSource)
});
