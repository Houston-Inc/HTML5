App.Controllers.DIController.extend('App.Controllers.FileList', /* @Static */{
    pluginName: 'fileList'
}, /* @Prototype */{
    communication: inject,
    'onFile subscribe': function (call, file) {
        var self = this;
        this.element.append('views/demo/file_info.ejs', file);
        var fr = new FileReader();
        var sendFile = function(e) {
            var data = e.target.result;
            self.communication.getSocket().emit('dataTransfer', {bin: data});
        };
        if (fr.addEventListener) {
            fr.addEventListener('loadend', sendFile, false)
        } else {
            fr.onload = sendFile;
        }
        fr.readAsDataURL(file);
    },
    'dataTransfer subscribe': function(call, data) {
        this.element.append('views/demo/image_file.ejs', data);
    }
});
