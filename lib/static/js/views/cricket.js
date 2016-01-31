var fs = require('fs');
var templateSource = fs.readFileSync(__dirname + '/../../html/cricket.html', 'utf8');
var svgSource = fs.readFileSync(__dirname + '/../../img/dartboard.svg', 'utf8');

module.exports = Backbone.View.extend({
    'boardClick' : function(event){
        var id = $(event.currentTarget).attr('id');
        var amount = 1;

        // Convert board index to shorthand
        var hit;
        if (id.charAt(0) === 'd') {
            hit = 'D-' + id.substr(1);
            amount = 2;
        } else if (id.charAt(0) === 'o' || id.charAt(0) === 'i') {
            hit = id.substr(2);
        } else if (id.charAt(0) === 't') {
            hit = 'T-' + id.substr(1);

            if (id.substr(1) === '20') {
                amount = 'special';
            } else {
                amount = 3;
            }
        } else if (id === 'Outer') {
            hit = 'BULL';
        } else if (id === 'Bull') {
            hit = 'D-BULL';
            amount = 'special';
        } else {
            hit = 'MISS';
        }

        // Get existing throws
        var dart = this.model.get('dart');
        var darts = this.model.get('darts');

        // Mark new throw and increment dart count
        darts[dart] = {
            'amount' : amount,
            'display' : hit,
            'id' : id
        };
        dart++;

        // Update model and redraw
        this.model.set({
            'dart' : dart,
            'darts' : darts
        });

        this.render().delegateEvents();
    },
    'className' : 'cricket-page content-page',
    'events' : {
        'click #dartboard #areas g path' : 'boardClick',
        'click #dartboard #areas g circle' : 'boardClick',
        'click .miss-button' : function(){
            this.model.recordMiss();
            this.render().delegateEvents();
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
        $('.score-container table').height(windowHeight - 17);

        return this;
    },
    'template' : _.template(templateSource)
});
