var fs = require('fs');
var templateSource = fs.readFileSync(__dirname + '/../../html/cricket.html', 'utf8');
var svgSource = fs.readFileSync(__dirname + '/../../img/dartboard.svg', 'utf8');

module.exports = Backbone.View.extend({
    'className' : 'cricket-page content-page',
    'events' : {
        'click td:nth-child(2),td:nth-child(4)' : function(event){
            var cell = $(event.currentTarget);

            // Get the value of the cell hit and player turn
            var pointValue;
            var turn;

            if (cell.index() === 1) {
                turn = 'player';
                pointValue = cell.next().text();
            } else {
                turn = 'computer';
                pointValue = cell.prev().text();
            }

            // Update model and redraw
            this.model.score(turn, pointValue);
            this.render().delegateEvents();
        }
    },
    'render' : function(){
        var data = _.extend(this.model.toJSON(), {
            'displayPoints' : function(points){
                if (points === 0) {
                    return '';
                } else {
                    return points;
                }
            },
            'displayScore' : function(score){
                switch (score) {
                    case 0:
                        return '';
                    case 1:
                        return '/';
                    case 2:
                        return 'X';
                    case 3:
                        return 'O';
                }
            },
            'svg' : svgSource
        });

        this.$el.html(this.template(data));
        $('#page-container').html(this.$el);

        var containerHeight = $(window).height() - 180;
        $('.board-container svg').height(containerHeight).width(containerHeight);

        return this;
    },
    'template' : _.template(templateSource)
});
