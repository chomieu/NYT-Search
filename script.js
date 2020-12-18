$(document).ready(function() {
    var query,
    startYear,
    endYear,
    numberOfRecords;

    // when the user clicks on a button, get the ID
    // this will determine if we're SEARCHing or CLEARing
    $(".btn").click(function(e) {
        e.preventDefault();
        var task = $(this).attr("id");
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
            beginYear = parseInt($("#start-year").val()) || null;
            endYear = parseInt($("#end-year").val()) || null;

            console.log(query, numberOfRecords, startYear, endYear);
            $("#articles").innerHTML(`Query: ${query}, number of records: ${numberOfRecords}, start year: ${startYear}, end year: ${endYear}`);

            // call Rita's function here
            // functionName(query, numberOfRecords, beginYear, endYear);
        } else {
            // empty the #articles element
            $("#articles").empty();
        }
    }
});