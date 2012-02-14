App.Controllers.DIController.extend('App.Controllers.SendButton', /* @Static */{
}, /* @Prototype */{
    chatInput: inject,
    'click': function() {
        this.chatInput.enter();
    }
});