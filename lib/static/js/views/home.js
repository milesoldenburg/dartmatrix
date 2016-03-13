var fs = require('fs');
var templateSource = fs.readFileSync(__dirname + '/../../html/home.html', 'utf8');

module.exports = Backbone.View.extend({
    'className' : 'title-page',
    'events' : {
        'click button.game-start' : function(){
            var gametype = $('#gametype option:selected').text();

            // Teardown home view
            App.access.Router.homeView.remove();

            // Route to game view
            App.access.Router.navigate('game/' + gametype.toLowerCase(), {
                'replace' : true,
                'trigger' : true
            });
        }
    },
    'initialize' : function(){
        // Options for fetch
        var fetchOptions = {
            'success' : function(){
                this.view.render();
                this.view.delegateEvents();
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
