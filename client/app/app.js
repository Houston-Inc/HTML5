/** == defaults == **/
steal(
    '//steal/less/less.js',
    '//jquery/controller/controller.js',
    '//jquery/controller/subscribe/subscribe.js',
    '//jquery/view/ejs/ejs.js',
    '//jquery/controller/view/view.js',
    '//jquery/model/model.js',
    '//jquery/model/validations/validations.js',
    '//jquery/lang/json/json.js',
    '//jquery/lang/openajax/openajax.js',
    './plugins/modernizr/modernizr.js',
    './plugins/string/string.js',
    './plugins/socketio/socketio.js'
)
/** == styles == **/
.then(function() {
    steal('./styles/app.less');
})
/** == templates == **/
.then(
    './views/page/skeleton.ejs',
    './views/page/viewport.ejs',
    './views/navi/navi.ejs',
    './views/navi/login.ejs',
    './views/navi/register.ejs',
    './views/navi/forgot_password.ejs',
    './views/popup/block.ejs'
)
/** == resources == **/
.then(
    './resources/plugins.js',
    './resources/config.js',
    './plugins/ejshelper/ejshelper.js'
)
/** == models == **/
.then(
    './models/credentials.js',
    './models/registration.js',
    './models/forgot_password.js'
)
/** == super controllers == **/
.then(
    './controllers/popup/popup.js',
    './controllers/DIController.js'
)
/** == controllers == **/
.then(
    './controllers/authentication.js',
    './controllers/socket.js',
    './controllers/init.js',
    './controllers/navigation.js',
    './controllers/popup/block.js',
    './controllers/popup/login.js',
    './controllers/popup/register.js',
    './controllers/popup/forgot_password.js',
    './controllers/viewport.js',
    './controllers/page.js'
)
/** == boot strap == **/
.then(function() {
    $.param = function(a) { // override default processData handler to post raw JSON only instead of encodeURI params
        return (a.constructor == String) ? a : $.toJSON(a);
    };
    $(function() {
        $.ajaxSetup({
            contentType: "application/json; charset=utf-8",
            statusCode: {
                401: function(res) {
                    OpenAjax.hub.publish("Auth.loggedOut", $.parseJSON(res.responseText));
                },
                400: function(res) {
                    OpenAjax.hub.publish("Validation."+$.originName(res), $.parseJSON(res.responseText));
                }
            }
        });
        $(document).socket().authentication();
        $("body").app_init();
    });
});
