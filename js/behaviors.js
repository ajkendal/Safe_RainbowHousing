$( document ).ready(function() {
    var showDistance = $(".showDistance")[0];
    var slider = $("#distance");
    //console.log(showDistance);
    //console.log(slider.val());
    
    //$(".showDistance")[0].text(function(){ return "" + slider.val() + " miles"});
    
    slider.change(function(){
        //console.log("slid " + slider.val());
        //showDistance.innerHTML("" + slider.val() + " miles");
    });
    
    
    $("#submit").click(function(e){
        //console.log("submitted");
        var query = {};
        query.location = $("#autocomplete").val();
        query.distance = $("#distance").val();
        query.age = $('#ageForm input[type=radio]:checked').val();
        //console.log(query);
        
        //console.log(query.location);
        
        initMap(query);
    
    });
        
    
});