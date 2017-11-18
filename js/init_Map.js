var map;
var geocoder;

function initMap(userInfo) {
    geocoder = new google.maps.Geocoder();
    
    var markers = jsonObject.shelters;
    var z0 = 20.0, z1 = 3.0, m0 = 1.0, m1 = 50.0;
    var miles = parseInt(userInfo.distance);
    var userZoom = (z0 * (m1 - miles) + z1 * (miles - m0))/(m1-m0);
    var userPosition;
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom:  parseInt(userZoom)
    });
    
    if (!userInfo.location){
        map.setCenter(globePosition);
    }else{
        geocoder.geocode( { 'address': userInfo.location}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                userPosition = {lat: parseFloat(latitude), lng: parseFloat(longitude) };
                map.setCenter(userPosition);
            } 
        }); 
    }
    
    if (userInfo.age === "Youth") {
        markers = markers.filter(function(shelters) {
            return (shelters.ageFocus === "Youth" && shelters.ageFocus === "All");
        });
    }
    else if (userInfo.age === "Middle") {
        markers = markers.filter(function(shelters) {
            return (shelters.ageFocus === "Adults" && shelters.ageFocus === "All");
        });
    }
    else if (userInfo.age === "Elder") {
        markers = markers.filter(function(shelters) {
            return (shelters.ageFocus === "Elders" && shelters.ageFocus === "All");
        });
    }
    
    
    for (var x = 0; x < markers.length; x++){
        var infoWindow = new google.maps.InfoWindow();
        
        var marker = new google.maps.Marker({
            position: {lat: markers[x].lat, lng: markers[x].lng},
            map: map,
            title: markers[x].shelter,
        });
        
        google.maps.event.addListener(marker, 'click', (function(marker, x) {
            return function() {
                var completeAddress = ("https://www.google.com/maps/place/" + markers[x].address.replace(/\s/g, "+") + ",+" + markers[x].city + ",+" + markers[x].state + "+" + markers[x].zip);
                
                var phoneText = ("<b>Phone: </b>" + "<a href='tel:" + markers[x].phone1 + "'>" + markers[x].phone1 + "<\a>"); 
                if (markers[x].phone2 != " "){
                    phoneText += (" <b>Phone 2: </b>" + "<a href='tel:" + markers[x].phone2 + "'>" + markers[x].phone2 + "<\a>");
                }
                var emailText = "";
                if (markers[x].email != " "){
                    emailText += ("<b>Email: </b>: " + "<a href='mailto:" + markers[x].email + "'>" + markers[x].email + "<\a>");
                }
                
                var extraInfo = "<br />";
                if (markers[x].ageFocus != " "){
                    extraInfo += ("<br /><b>Age Group: </b>" + markers[x].ageFocus);
                }
                if (markers[x].checkIn != " "){
                    extraInfo += ("<br /><b>Arrive by: </b>" + markers[x].checkIn);
                }
                if (markers[x].duration != " "){
                    extraInfo += ("<br /><b>Length of stay: </b>" + markers[x].duration);
                }
                    
                var string = ("<div class='infoBoxes'><h5>" + markers[x].shelter + "</h5><br />" +
                              "<a target='_blank' href='" + completeAddress + "'>" +  markers[x].address + ", " + markers[x].city +  ", " + markers[x].state + " " + markers[x].zip + "</a><br />" +
                              "<b>Website: </b><a target='_blank' href='" + markers[x].url + "'>" + markers[x].url + "</a><br />" +
                              phoneText + "<br />" + emailText + extraInfo + "</div>");
                
                infoWindow.setOptions({maxWidth: 350}); 
                infoWindow.setContent(string);
                infoWindow.open(map, marker);
            }
        })(marker, x));
    }
}