$(document).ready(function() {
    var query,
    startYear,
    endYear,
    numberOfRecords;

    // when the user clicks on a button, get the ID
    // this will determine if we're SEARCHing or CLEARing
    $(".btn, button").click(function(e) {
        e.preventDefault();
        var task = $(this).attr("id");
        // search or clear based on button ID
        handleForm( task );
    });

    // if the user hits ENTER (submitting the form)
    // assume they want to SEARCH (rather than clear)
    $("form").on('submit', function(e) {
        e.preventDefault();

        handleForm( "search" );
    });

    function handleForm(task) {
        if( task === "search" ) {
            query = $("#search-term").val();
            numberOfRecords = $("#number").val();
            startYear = parseInt($("#start-year").val()) || null;
            endYear = parseInt($("#end-year").val()) || null;

            // call Rita's function here
            fetchAPI(query, numberOfRecords, startYear, endYear);

        } else if(task === "clear") {
            // empty the #articles element
            $("#articles").empty();
            // clear the form
            $("#search-term").val("");
            $("#number").val("");
            $("#start-year").val("");
            $("#end-year").val("");
        }
    }

    function fetchAPI(query, limit, beginYear, endYear) {
        var apikey = "vRA0rl8tZ8x0E8jF44IwEKSTZgXZYG2T";
        var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apikey}`;
        var begin = (beginYear !== null) ? beginYear + "0101" : "";
        var end = (endYear !== null) ? endYear + "0101" : "";
        
        if (begin !== "" && end !== "") {
            queryURL = queryURL + `&begin_date=${begin}&end_date=${end}`;
        } else if (begin !== "") {
            queryURL = queryURL + `&begin_date=${begin}`;
        } else if (end !== "") {
            queryURL = queryURL + `&end_date=${end}`;
        }
        
        queryURL = queryURL + "&sort=newest";
        
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response); 

            var articles = response.response.docs;
            console.log(articles);
          });
    }
});
