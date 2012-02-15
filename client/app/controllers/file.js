App.Controllers.DIController.extend('App.Controllers.File', /* @Static */{
}, /* @Prototype */{
    init: function(el, opt) {
        var self = this;
        if (!el.addEventListener) return;
        el.addEventListener('dragover', this.noop, false);
        el.addEventListener('dragenter', this.noop, false);
        el.addEventListener('dragexit', this.noop, false);
        el.addEventListener('drop', function(evt) {
            console.log("drop");
            evt.stopPropagation();
            evt.preventDefault();
            self.handleFileSelect(evt);
        }, false);
    },
    noop: function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
    },
    handleFileSelect: function (evt) {
        var files = evt.dataTransfer.files; // FileList object.
        // files is a FileList of File objects. List some properties.
        for (var i = 0, f; f = files[i]; i++) {
            this.publish("onFile", f);
        }
    }

});
