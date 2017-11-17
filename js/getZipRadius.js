var requestZipAPI = new XMLHttpRequest();

var userMiles = 5;
var userZip = 60608;
var units = "miles";
var apiKey = "cFuSX0PfqZ57WKlJ76lu01cF9Ce1xap5o2gEvHjPhTMe2OyndbB3TUmC7Vve89Ox";

var apiZipUrl = "https://cors.io/?u=https://www.zipcodeapi.com/rest/" + apiKey + "/radius.json/" + userZip + "/" + userMiles + "/" + units + ".json";

requestZipAPI.open('GET', apiZipUrl, true);
requestZipAPI.responseType = 'json';
requestZipAPI.send();


function returnedZipcodes(){
    
    var returnedZips = requestZipAPI.response;
    
    console.log(returnedZips);
    
}

//returnedZipcodes();