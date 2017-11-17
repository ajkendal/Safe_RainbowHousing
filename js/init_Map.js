var map;

function initMap() {
    
    console.log(jsonObject);
    
    var markers = jsonObject.shelters;
    
    //console.log(markers);

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {"lat": 40.757412, "lng": -73.994202}
    });
    
    for (var x = 0; x < markers.length; x++){
        console.log(markers[x].lng);
        var marker = new google.maps.Marker({
            position: {lat: markers[x].lat, lng: markers[x].lng},
            map: map
        });
    }
}
initMap();