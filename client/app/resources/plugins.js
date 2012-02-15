var KEY = {
    ESC: 27,
    RETURN: 13,
    SPACE: 32,
    TAB: 9,
    BS: 8,
    DEL: 46,
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

$.fn.exists = function() {
    return this.length > 0;
};

$.fn.screenPosition = function () {
    var left, top;
    left = top = 0;
    this.each(function(idx, item) {
        if (item.offsetParent) {
            do {
                left += item.offsetLeft;
                top += item.offsetTop;
            } while (item = item.offsetParent);
        }
    });
    return {
        x : left,
        y : top
    };
};

/*
 * @page move Move
 * @tag plugins
 * Moves a given jQuery object to a screen location based on a relative parent. Changes position css to absolute.
 *
 * ## Usage
 * @codestart
 * $("#elem").move(50,50);
 * @codeend
 */
$.fn.move = function(x, y) {
    return this.each(function(idx, item) {
        $(item).css({
            position: 'absolute',
            top: y + "px",
            left: x + "px"
        });
    });
};

(function() {
    var specialEvent = function(eventName, original, process) {
        $.event.special[eventName] = {
            setup: function( data, namespaces ) {
                 $(this).bind(original, $.event.special[eventName].handler );
            },
            handler: function( event ) {
                event.type = eventName;
                if (!process || process(event)) {
                    $.event.handle.apply( this, arguments );
                }
            },
            teardown: function( namespaces ) {
                $(this).unbind(original, $.event.special[eventName].handler );
            }
        };
    };
    specialEvent("transitionEnd","webkitTransitionEnd mozTransitionEnd oTransitionEnd msTransitionEnd transitionend");
    specialEvent("enter", "keypress", function(ev) {return ev.which == KEY.RETURN});
  /*  $.event.special.drop = {
        noop: function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
        },
        setup: function( data, namespaces ) {
            var noop =  function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
            };
            this.addEventListener('dragover', noop, false);
            this.addEventListener('dragenter', noop, false);
            this.addEventListener('dragexit', noop, false);
        },
        handler: function(evt) {
            evt.type = "drop";
            $.event.handle.apply( this, arguments );
        },
        teardown: function( namespaces ) {
            $(this).unbind("drop", $.event.special.objectdrop.handler );
        }
    };*/
})();



/*
 * @page jsonFormData JsonFormData
 * @tag plugins
 * Collects values from input, textarea and select elements into a JSON object.
 * Form fields can be hierarchical and be grouped by a settings.group attribute.
 * This is used when panels serialize their forms to be posted to REST endpoints.
 *
 * ## HTML
 * @codestart
 * &lt;form action="#"&gt;
    &lt;p&gt;
        &lt;input name="name" value="Andreas"&gt;
        &lt;input name="surname" value="Kalamaki"&gt;
        &lt;input name="computers" value="Laptop"&gt;
        &lt;input name="computers" value="Desktop"&gt;
        &lt;input name="computers" value="Server"&gt;
        &lt;input type="radio" name="option" value="A" checked&gt;
        &lt;input type="radio" name="option" value="B"&gt;
    &lt;/p&gt;
    &lt;div data-object-group="address"&gt;
        &lt;p&gt;
            &lt;input name="street" value="Sturenkatu"&gt;
            &lt;input name="city" value="Helsinki"&gt;
            &lt;input name="country" value="Finland"&gt;
            &lt;input type="checkbox" name="soviet" value="Finland"&gt;
        &lt;/p&gt;
    &lt;/div&gt;
    &lt;div data-object-group="cars[]"&gt;
        &lt;input name="model" value="BMW"&gt;
        &lt;input name="year" value="1997"&gt;
    &lt;/div&gt;
    &lt;div data-object-group="cars[]"&gt;
        &lt;input name="model" value="VW Polo"&gt;
        &lt;input name="year" value="1989"&gt;
        &lt;div data-object-group="passengers[]"&gt;
            &lt;input name="name" value="Kari"&gt;
            &lt;input name="gender" value="Male"&gt;
        &lt;/div&gt;
        &lt;div data-object-group="passengers[]"&gt;
            &lt;input name="name" value="Eija"&gt;
            &lt;input name="gender" value="Female"&gt;
        &lt;/div&gt;
        &lt;div data-object-group="engine"&gt;
            &lt;input name="type" value="V8"&gt;
            &lt;input name="hp" value="247"&gt;
        &lt;/div&gt;
        &lt;input name="colors" value="red"&gt;
        &lt;input name="colors" value="blue"&gt;
    &lt;/div&gt;
 &lt;/form&gt;
 * @codeend
 *
 * ## Usage
 * @codestart
 * $("form").jsonFormData();
 * @codeend
 *
 * ## Result
 * @codestart
 * {
    "name":"Andreas",
    "surname":"Kalamaki",
    "computers":["Laptop","Desktop","Server"],
    "option":"A",
    "address":{
        "street":"Sturenkatu",
        "city":"Helsinki",
        "country":"Finland",
        "soviet":false
    },
    "cars":[
        {"model":"BMW","year":"1997"},
        {"model":"VW Polo","year":"1989",
            "colors":["red","blue"],
            "passengers":[
                {"name":"Kari","gender":"Male"},
                {"name":"Eija","gender":"Female"}
            ],
        "engine":{
            "type":"V8",
            "hp":"247"}
        }
    ]
 }
 * @codeend
 */
$.fn.jsonFormData = function(settings) {
    settings = $.extend({
        elements: 'input[name],textarea[name],select[name]',
        array: /[\[\]]/g,
        group: '[data-object-group]',
        processGroups: function() {return true;}
    }, settings);
    var result = {};
    var self = this[0];
    var $elems = $(settings.elements, self).filter(function(idx) {
        return !$(this).parentsUntil(self, settings.group).exists();
    });
    $elems.each(function(idx, inp) {
        var name = inp.name;
        var value = inp.value;
        if (inp.type == "checkbox") value = $(inp).is(":checked");
        if (inp.type == "radio" && !$(inp).is(":checked")) return;
        if (result[name] && !(result[name] instanceof Array) && inp.type != "radio") result[name] = [result[name]];
        if (result[name] instanceof Array) result[name].push(value);
        else result[name] = value;
    });
    $(settings.group, self).filter(function(idx) {
        return !$(this).parentsUntil(self, settings.group).exists() && settings.processGroups(this);
    }).each(function(idx, sub) {
        var subName = $(sub).attr(settings.group.replace(settings.array, ''));
        var rawSubName = subName.replace(/\[\]/,'');
        if (/\[\]/.test(subName) && !result[rawSubName]) {
            result[rawSubName] = [];
        }
        var subResult = $(sub).jsonFormData(settings);
        if (result[rawSubName] instanceof Array) {
            result[rawSubName].push(subResult);
        } else {
            result[rawSubName] = subResult;
        }
    });

    return result;
};

$.originName = function(res) {
    var origin = res.getResponseHeader("origin").split("/");
    for(var o in origin) {
        origin[o] = origin[o].firstToUpper();
    }
    return origin.join("").firstToLower();
};
