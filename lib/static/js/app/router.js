var router = Backbone.Router.extend({
    'routes' : {
        '(home)' : function(){
            console.log('landed on the home page');
        }
    }
});

module.exports = router;
