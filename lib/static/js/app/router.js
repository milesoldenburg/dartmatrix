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

            Window.CricketView = this.cricketView;

            this.cricketView.render();
        },
        'game/301' : function(){
            var X01View = require('../views/x01');
            var X01Model = require('../models/x01');

            this.x01View = new X01View({
                'model' : new X01Model({
                    'type' : 301
                })
            });

            Window.x01View = this.x01View;

            this.x01View.render();
        },
        'game/501' : function(){
            var X01View = require('../views/x01');
            var X01Model = require('../models/x01');

            this.x01View = new X01View({
                'model' : new X01Model({
                    'type' : 501
                })
            });

            Window.x01View = this.x01View;

            this.x01View.render();
        }
    }
});
