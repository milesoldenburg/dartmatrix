var fs = require('fs');
var templateSource = fs.readFileSync(__dirname + '/../../html/base-modal.html', 'utf8');

module.exports = Backbone.View.extend({
    'el' : '#base-modal',
    'events' : {
        'click base-modal-action' : 'action'
    },
    'action' : function(event){
        event.preventDefault();

        // This function should be overridden in every modal that needs an action
    },
    'render' : function(){
        // Render template
        var compiled = _.template(templateSource);
        this.$el.html(compiled(this.model.toJSON()));

        this.delegateEvents();

        return this;
    },
    'show' : function(){
        this.$el.modal('show');

        return this;
    }
});
