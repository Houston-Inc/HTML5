(function() {
    String.prototype.f = function() {
        var s = this;
        for (var i = 0; i < arguments.length; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i]);
        }
        return s;
    };

    String.prototype.firstToUpper = function() {
        var s = this;
        return s.substring(0,1).toUpperCase() + s.substring(1);
    };

    String.prototype.firstToLower = function() {
        var s = this;
        return s.substring(0,1).toLowerCase() + s.substring(1);
    };

    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(str){
            return (this.indexOf(str) === 0);
        }
    }

    if (!String.prototype.trim) {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g,"");
        }
    }
})();
