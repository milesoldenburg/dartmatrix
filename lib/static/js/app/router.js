module.exports = Backbone.Router.extend({
    'routes' : {
        '(home)' : function(){
            var HomeView = require('../views/home');
            var HomeModel = require('../models/home');

            this.homeView = new HomeView({
                'model' : new HomeModel()
            });

            this.homeView.render();
        },
        'game/cricket' : function(){
            var CricketView = require('../views/cricket');
            var CricketModel = require('../models/cricket');

            this.cricketView = new CricketView({
                'model' : new CricketModel()
            });

            this.cricketView.render();
        }
    }
});
