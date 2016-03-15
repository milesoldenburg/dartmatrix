var BaseModal = require('./base-modal.js');

module.exports = BaseModal.extend({
    'action' : function(event){
        event.preventDefault();

        Window.X01View.model.resetGame();
        Window.X01View.render().delegateEvents();
        this.close();
    }
});
