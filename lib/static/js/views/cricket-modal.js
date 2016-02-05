var BaseModal = require('./base-modal.js');

module.exports = BaseModal.extend({
    'action' : function(event){
        event.preventDefault();

        Window.CricketView.model.resetGame();
        Window.CricketView.render().delegateEvents();
        this.close();
    }
});
