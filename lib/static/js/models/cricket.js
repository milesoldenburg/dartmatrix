module.exports = Backbone.Model.extend({
    'defaults' : {
        'dart' : 0,
        'darts' : [
            null,
            null,
            null
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
    }
});
