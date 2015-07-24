module.exports = Backbone.Model.extend({
    'defaults' : {
        'gameTypes' : []
    },
    'parse' : function(response){
        return {
            'gameTypes' : response
        };
    }
});
