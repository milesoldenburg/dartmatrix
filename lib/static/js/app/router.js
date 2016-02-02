var BaseModalView = require('../views/base-modal');
var BaseModalModel = require('../models/base-modal');

module.exports = Backbone.Router.extend({
    'initialize' : function(){
        // Create base alert
        Window.baseModalView = new BaseModalView({
            'model' : new BaseModalModel()
        });
    },
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
