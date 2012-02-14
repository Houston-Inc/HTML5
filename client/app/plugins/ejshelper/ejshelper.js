$.extend($.EJS.Helpers.prototype, {
    include: function(url, data) {
        return $.View("//app/views/"+url, data);
    }
});
