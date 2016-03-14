var points = ['20', '19', '18', '17', '16', '15', 'Bull'];

var logScore = function(state, id){
    var data = Window.Engine.getDartDataOfId(id);

    // Score if 15-20 or Bull is hit
    if (data.category === 'Bull' || (parseInt(data.category) >= 15 && parseInt(data.category) <= 20)) {
        var currentAmount = state.score[1][data.category];

        if (state.score[0][data.category] < 3) { // If category is open
            var newAmount = currentAmount + data.amount;
            var extra = newAmount - 3;

            if (extra > 0) { // If this dart closes the category add to points
                state.score[1][data.category] = 3;
                state.score[1]['points'] += extra * data.basePoints;
            } else {
                state.score[1][data.category] = newAmount;
            }
        } else { // If category has already been closed
            state.score[1][data.category] = Math.min(3, currentAmount + data.amount);
        }
    }
};

var aimAt = function(state, index, dart, prefix){
    var hit;

    if (points[index] === 'Bull') {
        console.log('Computer aims for Bull for Dart #', dart + 1);

        hit = Window.Engine.getHit('Bull');

        console.log('Computer hits', hit, 'for Dart #', dart + 1);

        logScore(state, hit);
    } else {
        console.log('Computer aims for', prefix, points[index]);

        hit = Window.Engine.getHit(prefix + points[index]);

        console.log('Computer hits', hit, 'for Dart #', dart + 1);

        logScore(state, hit);
    }
};

module.exports.computeHits = function(state){
    // Shoot 3 darts
    for (var dart = 0; dart <= 2; dart++) {
        var i;
        var hasFoundShot = false;

        // Priority 1: Close highest shots opponent has opened
        for (i = 0; i < points.length; i++) {
            // If player has opened and we have not closed
            if (state.score[0][points[i]] === 3 && state.score[1][points[i]] < 3) {
                var prefix;
                var remaining = 3 - state.score[1][points[i]];

                switch (remaining) {
                    case 3:
                        prefix = 't';
                        break;
                    case 2:
                        prefix = 't';
                        break;
                    case 1:
                        prefix = 'os';
                        break;
                }

                console.log('p1');
                aimAt(state, i, dart, prefix);

                hasFoundShot = true;
                break;
            }
        }

        // Priority 2: Make up points difference
        if (!hasFoundShot) {
            if (state.score[1].points < state.score[0].points) {
                for (i = 0; i < points.length; i++) {
                    // Prioritize by fewest shots to start earning points
                    for (var j = 3; j >= 0; j--) {
                        if (state.score[0][points[i]] < 3 && state.score[1][points[i]] === j) {
                            console.log('p2');
                            aimAt(state, i, dart, 't');

                            hasFoundShot = true;
                            break;
                        }
                    }

                    if (hasFoundShot) {
                        break;
                    }
                }
            }
        }

        // Priority 3: Close highest shots that opponents has not opened
        if (!hasFoundShot) {
            for (i = 0; i < points.length; i++) {
                if (state.score[1][points[i]] < 3) {
                    console.log('p3');
                    aimAt(state, i, dart, 't');

                    hasFoundShot = true;
                    break;
                }
            }
        }
    }

    return state;
};
