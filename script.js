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

            $("#articles").text(`Query: ${query}, number of records: ${numberOfRecords}, start year: ${startYear}, end year: ${endYear}`);

            // call Rita's function here
            // functionName(query, numberOfRecords, beginYear, endYear);
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
});