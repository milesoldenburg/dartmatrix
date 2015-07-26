var fs = require('fs');
var templateSource = fs.readFileSync(__dirname + '/../../html/cricket.html', 'utf8');

module.exports = Backbone.View.extend({
    'className' : 'cricket-page content-page',
    'events' : {
        'click td:nth-child(2),td:nth-child(4)' : function(event){
            var cell = $(event.currentTarget);
            var score = cell.data('score');

            switch (score) {
                case 0:
                    cell.html('/');
                    cell.data('score', 1);

                    break;
                case 1:
                    cell.html('X');
                    cell.data('score', 2);

                    break;
                case 2:
                    cell.html('O');
                    cell.data('score', 3);

                    break;
                default:
                    // Get the value of the cell hit
                    var pointValue;
                    if (cell.index() === 1) {
                        pointValue = cell.next().text();
                    } else {
                        pointValue = cell.prev().text();
                    }

                    // Special case for Bull = 25
                    if (pointValue === 'Bull') {
                        pointValue = 25;
                    } else {
                        pointValue = Number.parseInt(pointValue, 10);
                    }

                    // Get the existing number of points
                    var points;
                    if (cell.index() === 1) {
                        points = cell.prev().text();
                    } else {
                        points = cell.next().text();
                    }

                    // Special case for an empty cell = 0 points
                    if (points === '') {
                        points = 0;
                    } else {
                        points = Number.parseInt(points, 10);
                    }

                    // Add the points hit to the existing total
                    if (cell.index() === 1) {
                        cell.prev().text(points + pointValue);
                    } else {
                        cell.next().text(points + pointValue);
                    }

                    break;
            }
        }
    },
    'render' : function(){
        this.$el.html(this.template());
        $('#page-container').html(this.$el);

        return this;
    },
    'template' : _.template(templateSource)
});
