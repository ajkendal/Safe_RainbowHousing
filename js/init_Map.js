var map;

function initMap() {
    
    //console.log(jsonObject);
    
    var markers = jsonObject.shelters;
    
    //console.log(markers);
    var uluru = {lat: -25.363, lng: 131.044};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
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