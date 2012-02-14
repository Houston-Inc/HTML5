App.Controllers.DIController.extend('App.Controllers.ChatInput', /* @Static */{
}, /* @Prototype */{
    communication: inject,
    init: function(element, options) {
        this.element.focus();
    },
    'enter': function() {
        var val = this.element.val();
        this.communication.getSocket().emit('clientMessage', {message: val});
        this.element.val("").focus();
    }
});