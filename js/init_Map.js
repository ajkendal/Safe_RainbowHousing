var map;

function initMap() {
    
    var markers = jsonObject.shelters;

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {"lat": 40.757412, "lng": -73.994202}
    });

    
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
                    
                var string = ("<h4>" + markers[x].shelter + "</h3><br />" +
                              "<a target='_blank' href='" + completeAddress + "'>" +  markers[x].address + ", " + markers[x].city +  ", " + markers[x].state + " " + markers[x].zip + "</a><br />" +
                              "<b>Website: </b><a target='_blank' href='" + markers[x].url + "'>" + markers[x].url + "</a><br />" +
                              phoneText + "<br />" + emailText);
                
                infoWindow.setOptions({maxWidth: 350}); 
                infoWindow.setContent(string);
                infoWindow.open(map, marker);
            }
        })(marker, x));
    }
}
initMap();