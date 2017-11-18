var jsonObject = {};

function loadJSON(callback) {   

    var jsonShelters = new XMLHttpRequest();
    jsonShelters.overrideMimeType("application/json");
    jsonShelters.open('GET', '../json/lgbtqhousing.json', true);
    //jsonShelters.open('GET', '../Safe_RainbowHousing/json/lgbtqhousing.json', true);
    
    jsonShelters.onreadystatechange = function () {
        if (jsonShelters.readyState == 4 && jsonShelters.status == "200") {
            jsonObject = JSON.parse(jsonShelters.responseText);
            //console.log(jsonObject);
          }
    };
    jsonShelters.send(null);  
 }

loadJSON();