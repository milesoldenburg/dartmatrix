var router = Backbone.Router.extend({
    'routes' : {
        '(home)' : function(){
            var HomeView = require('../views/home');
            this.homeView = new HomeView();

            this.homeView.render();
        }
    }
});

module.exports = router;
