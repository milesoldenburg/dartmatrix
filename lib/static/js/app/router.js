module.exports = Backbone.Router.extend({
    'routes' : {
        '(home)' : function(){
            var HomeView = require('../views/home');
            var HomeModel = require('../models/home');

            this.homeView = new HomeView({
                'model' : new HomeModel()
            });

            this.homeView.render();
        }
    }
});
