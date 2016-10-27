var map;
var map_marker;
var lat;
var lng;
var lineCoordinatesArray = [];
var publish = 'pub-c-9d0d75a5-38db-404f-ac2a-884e18b041d8';
var subscribe = 'sub-c-4e25fb64-37c7-11e5-a477-0619f8945a4f';
var myLatLng; 

if (navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition(function (position)
    {
        var locationMarker = null;
        if (locationMarker)
        {

            return;
        }

        lat = position.coords["latitude"];
        lng = position.coords["longitude"];

        myLatLng = { lat: lat, lng: lng};

        // Init PubNub
        initPubNub();

        // Init Google Maps
        google.maps.event.addDomListener(window, 'load', initMap());

    },
    function (error)
    {
        console.log("Could initialize Google Maps API: ", error);
    },
    {
        enableHighAccuracy: true
    }
    );
}


function initMap()
{
    console.log("Google Maps Initialized")
 
    map = new google.maps.Map(document.getElementById('map-canvas'),
    {
        center: myLatLng,
        zoom: 15,
        styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }]
            }
        ]
    });
    google.maps.event.trigger(map, 'resize')

    map_marker = new google.maps.Marker({ position: myLatLng, map: map });
    map_marker.setMap(map);
}

function redraw()
{
    map.setCenter({ lat: lat, lng: lng, alt: 0 })
    map_marker.setPosition({ lat: lat, lng: lng, alt: 0 });
    pushCoordToArray(lat, lng);

    var lineCoordinatesPath = new google.maps.Polyline
    ({
        path: lineCoordinatesArray,
        geodesic: true,
        strokeColor: '#E91E63',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    lineCoordinatesPath.setMap(map);
}


function pushCoordToArray(latIn, lngIn)
{
    lineCoordinatesArray.push(new google.maps.LatLng(latIn, lngIn));
}


function initPubNub()
{
    pubnub = PUBNUB.init
    ({
        publish_key: publish,
        subscribe_key: subscribe,
        ssl: true
    })

    pubnub.subscribe
    ({
        channel: "my_channel",
        message: function (message, channel)
        {
            console.log(message);

            lat = message.lat;
            lng = message.lng;

            document.getElementById("Latitude").innerHTML = "Latitude: ".concat(lat); 
            document.getElementById("Longitude").innerHTML = "Latitude: ".concat(lng);

            getAddress();

            redraw();
        },
        connect: function () { console.log("PubNub Connected") }
    })
}

function getAddress()
{
     var query = "http://maps.googleapis.com/maps/api/geocode/json?latlng=".concat(lat).concat(",").concat(lng).concat("&sensor=true");

     $.getJSON(query, function (results)
     {
        document.getElementById("Address").innerHTML = "Address: ".concat(results.results[0].formatted_address);
     });
}