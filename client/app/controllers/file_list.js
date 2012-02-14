App.Controllers.DIController.extend('App.Controllers.FileList', /* @Static */{
}, /* @Prototype */{
    'onFile subscribe': function (call, file) {
        this.element.append('views/demo/file_info.ejs', file);
    }

});
