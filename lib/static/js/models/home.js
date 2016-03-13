module.exports = Backbone.Model.extend({
    'defaults' : {
        'channel' : 'getGameTypes',
        'gameTypes' : []
    },
    'parse' : function(response){
        return {
            'gameTypes' : response
        };
    }
});
