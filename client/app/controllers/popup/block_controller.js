$.Controller.extend('App.Controllers.Block', /* @Static */{
}, /* @Prototype */{
    timeout: undefined,
    init: function(el,op) {
        this.show();
    },
    show: function() {
        var self = this;
        this.timeout = setTimeout(function() {
            $(self.element).addClass("show");
        }, 500);
    },
    destroy: function() {
        if (this.timeout) clearTimeout(this.timeout);
    }
});