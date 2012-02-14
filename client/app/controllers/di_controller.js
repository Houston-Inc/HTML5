var inject = "inject";
$.Controller.extend('App.Controllers.DIController', /* @Static */{
    instances: {},
    register: function(ctrl) { // this is untested yet, hopefully doesn't cause memory leaks
        if (this.pluginName != undefined) {
            this.instances[this.pluginName] = ctrl;
        }
        for (var di in this.instances) {
            for (var s in ctrl) {
                if (s === di && ctrl[s] === inject) {
                    ctrl[s] = this.instances[di];
                }
            }
        }
    },
    deregister: function() {
        if (this.pluginName != undefined) {
            delete this.instances[this.pluginName];
        }
    }
},/* @Prototype */{
    setup: function() {
        this._super.apply(this, arguments);
        this.Class.register(this);
    },
    destroy: function() {
        this.Class.deregister();
    }
});