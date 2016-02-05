var fs = require('fs');
var templateSource = fs.readFileSync(__dirname + '/../../html/cricket.html', 'utf8');
var svgSource = fs.readFileSync(__dirname + '/../../img/dartboard.svg', 'utf8');

var CricketModalView = require('./cricket-modal.js');
var BaseModalModel = require('../models/base-modal.js');

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
            var endTurn = this.model.endTurn();

            if (endTurn.hasWon) {
                this.render().delegateEvents();

                var cricketModalView = new CricketModalView({
                    'model' : new BaseModalModel({
                        'buttonLabel' : 'New Game',
                        'content' : endTurn.winner + ' wins!',
                        'dismissible' : false,
                        'title' : 'Game Over'
                    })
                });

                cricketModalView.render().show();
            } else {
                if (endTurn.render) {
                    this.render().delegateEvents();
                }
            }
        }
    },
    'initialize' : function(){
        // Fit score table and board to window
        this.windowHeight = $(window).height();
        this.containerHeight = this.windowHeight - 167;
    },
    'render' : function(){
        var data = _.extend(this.model.toJSON(), {
            'svg' : svgSource
        });

        this.$el.html(this.template(data));
        $('#page-container').html(this.$el);

        $('.board-container svg').height(this.containerHeight).width(this.containerHeight);
        $('.score-items-container').height(this.windowHeight - 97);

        return this;
    },
    'template' : _.template(templateSource)
});
