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
    './resources/config.js'
)
/** == models == **/
.then(
    './models/credentials.js',
    './models/registration.js',
    './models/forgot_password.js'
)
/** == super controllers == **/
.then(
    './controllers/popup/popup_controller.js'
)
/** == controllers == **/
.then(
    './controllers/socket_controller.js',
    './controllers/init_controller.js',
    './controllers/navigation_controller.js',
    './controllers/popup/block_controller.js',
    './controllers/popup/login_controller.js',
    './controllers/popup/register_controller.js',
    './controllers/popup/forgot_password_controller.js',
    './controllers/viewport_controller.js',
    './controllers/page_controller.js'
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
        $(document).app_init();
    });
});
