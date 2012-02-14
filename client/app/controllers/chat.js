App.Controllers.DIController.extend('App.Controllers.Chat', /* @Static */{
}, /* @Prototype */{
    'serverMessage subscribe': function(event, data) {
        this.element.append('views/chat/message.ejs', data);
        this.element[0].scrollTop = this.element[0].scrollHeight;
    }
});