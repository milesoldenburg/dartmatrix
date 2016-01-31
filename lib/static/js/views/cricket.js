var fs = require('fs');
var templateSource = fs.readFileSync(__dirname + '/../../html/cricket.html', 'utf8');
var svgSource = fs.readFileSync(__dirname + '/../../img/dartboard.svg', 'utf8');

module.exports = Backbone.View.extend({
    'boardClick' : function(event){
        if (this.model.recordHit($(event.currentTarget).attr('id'))) {
            this.render().delegateEvents();
        }
    },
    'className' : 'cricket-page content-page',
    'events' : {
        'click #dartboard #areas g path' : 'boardClick',
        'click #dartboard #areas g circle' : 'boardClick',
        'click .miss-button' : function(){
            if (this.model.recordMiss()) {
                this.render().delegateEvents();
            }
        },
        'click .undo-button' : function(){
            if (this.model.undoLastDart()) {
                this.render().delegateEvents();
            }
        },
        'click .end-button' : function(){
            if (this.model.endTurn()) {
                this.render().delegateEvents();
            }
        }
    },
    'render' : function(){
        var data = _.extend(this.model.toJSON(), {
            'svg' : svgSource
        });

        this.$el.html(this.template(data));
        $('#page-container').html(this.$el);

        // Fit score table and board to window
        var windowHeight = $(window).height();
        var containerHeight = windowHeight - 167;
        $('.board-container svg').height(containerHeight).width(containerHeight);
        $('.score-items-container').height(windowHeight - 97);

        return this;
    },
    'template' : _.template(templateSource)
});
