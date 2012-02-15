App.Controllers.DIController.extend('App.Controllers.GeoLocation', /* @Static */{
}, /* @Prototype */{
    init: function(el, opt) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.callback('success'), function (msg) {
               console.log(msg);
            });
        } else {
            error('not supported');
        }
    },
    success: function(position) {
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeControl: false,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($("#mapcanvas")[0], myOptions);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title:"You are here! (at least within a " + position.coords.accuracy + " meter radius)"
        });
    }
});
