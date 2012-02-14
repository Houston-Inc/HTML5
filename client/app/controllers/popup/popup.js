$.Controller.extend('App.Controllers.Popup', /* @Static */{
}, /* @Prototype */{
    'block': function(style) {
        $(this.element).append("//app/views/popup/block.ejs", {style:style});
    },
    'unblock': function() {
        $(".error", this.element).removeClass("error");
        $("div.block", this.element).remove();
    },
    'transitionEnd': function(el, ev) {
        if ($(el).hasClass("show")) $(el);
    },
    close: function(ev) {
        if (ev) ev.preventDefault();
        this.unblock();
        $(this.element).removeClass("show");
    },
    closeAll: function() {
        $(".navi_popup").removeClass("show");
    },
    open: function(ev) {
        this.closeAll();
        $(this.element).toggleClass("show");
    },
    'a.button.cancel click': function(el, ev) {
        this.close(ev);
    },
    validationErrors: function(errors) {
        this.unblock();
        for (var field in errors) {
            $('input[name="'+field+'"]', this.element).addClass("error");
        }
    },
    '{document} click': function(el, ev) {
        if (!$(ev.target).closest("nav").exists()) this.closeAll();
    }
});