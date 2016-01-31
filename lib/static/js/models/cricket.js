module.exports = Backbone.Model.extend({
    'defaults' : {
        'dart' : 0,
        'darts' : [
            {
                'display' : null,
                'id' : null
            },
            {
                'display' : null,
                'id' : null
            },
            {
                'display' : null,
                'id' : null
            }
        ],
        'turn' : 0,
        'score' : [
            {
                'points' : 0,
                '20' : 0,
                '19' : 0,
                '18' : 0,
                '17' : 0,
                '16' : 0,
                '15' : 0,
                'Bull' : 0
            },
            {
                'points' : 0,
                '20' : 0,
                '19' : 0,
                '18' : 0,
                '17' : 0,
                '16' : 0,
                '15' : 0,
                'Bull' : 0
            }
        ]
    },
    'endTurn' : function(){
        var dart = this.get('dart');

        if (dart === 3) {
            var turn = this.get('turn');
            var score = this.get('score');
            var darts = this.get('darts');
            var nextTurn = (turn + 1) % 2;

            _.each(darts, function(element){
                var data = Window.Engine.getDartDataOfId(element.id);

                // Score if 15-20 or Bull is hit
                if (data.category === 'Bull' || (parseInt(data.category) >= 15 && parseInt(data.category) <= 20)) {
                    var currentAmount = score[turn][data.category];

                    if (score[nextTurn][data.category] < 3) { // If category is open
                        var newAmount = currentAmount + data.amount;
                        var extra = newAmount - 3;

                        if (extra > 0) { // If this dart closes the category add to points
                            score[turn][data.category] = 3;
                            score[turn]['points'] += extra * data.basePoints;
                        } else {
                            score[turn][data.category] = newAmount;
                        }
                    } else { // If category has already been closed
                        score[turn][data.category] = Math.min(3, currentAmount + data.amount);
                    }
                }
            });

            // Update model
            this.set({
                'dart' : 0,
                'darts' : [
                    {
                        'display' : null,
                        'id' : null
                    },
                    {
                        'display' : null,
                        'id' : null
                    },
                    {
                        'display' : null,
                        'id' : null
                    }
                ],
                'score' : score,
                'turn' : nextTurn
            });

            return true;
        } else {
            return false;
        }
    },
    'recordMiss' : function(){
        // Get existing throws
        var dart = this.get('dart');
        var darts = this.get('darts');

        // Mark new throw and increment dart count
        darts[dart] = {
            'display' : 'MISS',
            'id' : null
        };
        dart++;

        // Update model and redraw
        this.set({
            'dart' : dart,
            'darts' : darts
        });
    },
    'undoLastDart' : function(){
        // Get existing throws
        var dart = this.get('dart');
        var darts = this.get('darts');

        if (dart > 0) {
            // Mark new throw and increment dart count
            dart--;
            darts[dart] = {
                'display' : null,
                'id' : null
            };

            // Update model and redraw
            this.set({
                'dart' : dart,
                'darts' : darts
            });

            return true;
        } else {
            return false;
        }
    }
});
