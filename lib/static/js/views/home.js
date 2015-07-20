var fs = require('fs');
var template = fs.readFileSync(__dirname + '/../../html/home.html', 'utf8');

module.exports = Backbone.View.extend({
    'className' : 'title-page',
    'render' : function(){
        this.$el.html(template);
        $('#page-container').html(this.$el);

        return this;
    }
});
