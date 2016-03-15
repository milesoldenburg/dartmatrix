var ipc = require('electron').ipcRenderer;
var AI = require('../app/ai/x01.js'); // jshint ignore:line

module.exports = Backbone.Model.extend({
    'defaults' : {
        'dart' : 0,
        'darts' : [
            {
                'amount' : 0,
                'display' : null,
                'id' : null
            },
            {
                'amount' : 0,
                'display' : null,
                'id' : null
            },
            {
                'amount' : 0,
                'display' : null,
                'id' : null
            }
        ],
        'turn' : 0,
        'score' : [0, 0]
    },
    'endTurn' : function(){
        var dart = this.get('dart');
        var turn = this.get('turn');
        var score = this.get('score');
        var darts = this.get('darts');
        var nextTurn = (turn + 1) % 2;

        // Get info for last dart
        var data = Window.Engine.getDartDataOfId(darts[dart - 1].id);

        // Test win condition: that the last shot was a double out
        var hasWon = (score[turn] === 0 && data.amount === 2);

        var winner = null;

        if (hasWon) {
            if (turn === 0) {
                winner = 'Player';
            } else {
                winner = 'Computer';
            }
        }

        // Update model
        this.set({
            'dart' : 0,
            'darts' : [
                {
                    'amount' : 0,
                    'display' : null,
                    'id' : null
                },
                {
                    'amount' : 0,
                    'display' : null,
                    'id' : null
                },
                {
                    'amount' : 0,
                    'display' : null,
                    'id' : null
                }
            ],
            'turn' : nextTurn
        });

        return {
            'hasWon' : hasWon,
            'render' : true,
            'winner' : winner
        };
    },
    'initialize' : function(){
        // Load initial AI settings
        var aiSettings = ipc.sendSync('getAISettingsSync');

        Window.Engine.setAccuracy(aiSettings.difficulty / 100);

        this.set({
            'aiSettings' : aiSettings,
            'score' : [this.get('type'), this.get('type')]
        });
    },
    'recordHit' : function(id){
        // Get existing throws
        var dart = this.get('dart');
        var score = this.get('score');
        var turn = this.get('turn');

        if (dart >= 0 && dart < 3) {
            var darts = this.get('darts');

            // Get info for dart
            var data = Window.Engine.getDartDataOfId(id);

            // Mark T20s as special
            var amount = data.amount;
            if (data.amount === 3 && data.category === '20') {
                amount = 'special';
            }

            // Mark new throw and increment dart count
            darts[dart] = {
                'amount' : amount,
                'display' : data.display,
                'id' : id
            };
            dart++;

            // If scoring has not been opened
            if (score[turn] === this.get('type')) {
                // Only open scoring if dart was a double
                if (data.amount === 2) {
                    // Decrement score
                    score[turn] -= (data.basePoints * data.amount);
                }
            } else if (score[turn] > 0 && (score[turn] - (data.basePoints * data.amount)) >= 0) {
                // Decrement score
                score[turn] -= (data.basePoints * data.amount);
            } else {
                // TODO: Bust - Reset score to beginning of round and prep for end of turn
            }

            // Update model and redraw
            this.set({
                'dart' : dart,
                'darts' : darts,
                'score' : score
            });

            return true;
        } else {
            return false;
        }
    },
    'recordMiss' : function(){
        // Get existing throws
        var dart = this.get('dart');

        if (dart >= 0 && dart < 3) {
            var darts = this.get('darts');

            // Mark new throw and increment dart count
            darts[dart] = {
                'amount' : 0,
                'display' : 'MISS',
                'id' : null
            };
            dart++;

            // Update model and redraw
            this.set({
                'dart' : dart,
                'darts' : darts
            });

            return true;
        } else {
            return false;
        }
    },
    'resetGame' : function(){
        this.set({
            'dart' : 0,
            'darts' : [
                {
                    'amount' : 0,
                    'display' : null,
                    'id' : null
                },
                {
                    'amount' : 0,
                    'display' : null,
                    'id' : null
                },
                {
                    'amount' : 0,
                    'display' : null,
                    'id' : null
                }
            ],
            'turn' : 0,
            'score' : [this.get('type'), this.get('type')]
        });
    },
    'undoLastDart' : function(){
        // Get existing throws
        var dart = this.get('dart');
        var darts = this.get('darts');
        var turn = this.get('turn');
        var score = this.get('score');

        if (dart > 0) {
            // If dart was not a miss
            if (!_.isNull(darts[dart - 1].id)) {
                // Get info for dart
                var data = Window.Engine.getDartDataOfId(darts[dart - 1].id);

                // Add total back to score
                if (score[turn] < this.get('type')) {
                    score[turn] += (data.basePoints * data.amount);
                }
            }

            // Mark new throw and increment dart count
            dart--;
            darts[dart] = {
                'display' : null,
                'id' : null
            };

            // Update model and redraw
            this.set({
                'dart' : dart,
                'darts' : darts,
                'score' : score
            });

            return true;
        } else {
            return false;
        }
    }
});
