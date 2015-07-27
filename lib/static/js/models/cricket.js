module.exports = Backbone.Model.extend({
    'defaults' : {
        'computer' : {
            '20' : {
                'points' : 0,
                'score' : 0
            },
            '19' : {
                'points' : 0,
                'score' : 0
            },
            '18' : {
                'points' : 0,
                'score' : 0
            },
            '17' : {
                'points' : 0,
                'score' : 0
            },
            '16' : {
                'points' : 0,
                'score' : 0
            },
            '15' : {
                'points' : 0,
                'score' : 0
            },
            'Bull' : {
                'points' : 0,
                'score' : 0
            }
        },
        'player' : {
            '20' : {
                'points' : 0,
                'score' : 0
            },
            '19' : {
                'points' : 0,
                'score' : 0
            },
            '18' : {
                'points' : 0,
                'score' : 0
            },
            '17' : {
                'points' : 0,
                'score' : 0
            },
            '16' : {
                'points' : 0,
                'score' : 0
            },
            '15' : {
                'points' : 0,
                'score' : 0
            },
            'Bull' : {
                'points' : 0,
                'score' : 0
            }
        }
    },
    'score' : function(turn, points){
        // Get the current player and score
        var player = this.get(turn);

        // Special case for Bull = 25
        var pointValue;
        if (points === 'Bull') {
            pointValue = 25;
        } else {
            pointValue = Number.parseInt(points, 10);
        }

        // Add the hit to the score or point totals
        if (player[points].score < 3) {
            player[points].score++;
        } else {
            player[points].points += pointValue;
        }

        // Save back current player to the model
        this.set(turn, player);
    }
});
