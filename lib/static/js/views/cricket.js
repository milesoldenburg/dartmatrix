var fs = require('fs');
var templateSource = fs.readFileSync(__dirname + '/../../html/cricket.html', 'utf8');
var svgSource = fs.readFileSync(__dirname + '/../../img/dartboard.svg', 'utf8');

module.exports = Backbone.View.extend({
    'className' : 'cricket-page content-page',
    'events' : {
        'click #dartboard #areas g path' : function(event){
            var id = $(event.currentTarget).attr('id');

            // Convert board index to shorthand
            var hit;
            if (id.charAt(0) === 'd') {
                hit = 'D-' + id.substr(1);
            } else if (id.charAt(0) === 'o' || id.charAt(0) === 'i') {
                hit = id.substr(2);
            } else if (id.charAt(0) === 't') {
                hit = 'T-' + id.substr(1);
            } else if (id === 'Outer') {
                hit = 'MISS';
            } else if (id === 'Bull') {
                hit = 'BULL';
            } else {
                hit = 'D-BULL';
            }

            // Get existing throws
            var dart = this.model.get('dart');
            var darts = this.model.get('darts');

            // Mark new throw and increment dart count
            darts[dart] = hit;
            dart++;

            // Update model and redraw
            this.model.set({
                'dart' : dart,
                'darts' : darts
            });

            this.render().delegateEvents();
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
