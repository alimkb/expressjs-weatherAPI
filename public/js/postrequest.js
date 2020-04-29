$(document).ready(function () {

    // SUBMIT FORM
    $("#weatherForm").submit( (event) => {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        ajaxPost();
    });


    function ajaxPost() {

        // PREPARE FORM DATA
        var formData = {
            cityname: $("#cityname").val()
           
        }

        // DO POST
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: window.location + "api/customers/save",
            data: JSON.stringify(formData),
            dataType: 'json',
            success:  (output)=> {
                
                    $("#address").html("<span class='text-muted'>Address :</span>&nbsp;"+output.addname)
                    $("#main").html("<span class='text-muted'>Condition :</span>&nbsp;"+output.main)
                    $("#temp").html("<span class='text-muted'>Temperature :</span>&nbsp;"+output.temp)
                    $("#description").html("<span class='text-muted'>Description :</span>&nbsp;"+output.description)
                    $("#feelsLike").html("<span class='text-muted'>Feels :</span>&nbsp;"+output.feels)
                    $("#humidity").html("<span class='text-muted'>Humidity :</span>&nbsp;"+output.humidity)
            },
            error:  (e) => {
                alert("Error!");
                console.log("ERROR: ", e);
            }
        });
        // Reset FormData after Posting
        resetData();

    }

    function resetData() {
        $("#citytname").val("");
        $("#humidity").html("");
        $("#feelsLike").html("");
        $("#description").html("");
        $("#temp").html("");
        $("#main").html("");
        $("#address").html("");

       
    }
})