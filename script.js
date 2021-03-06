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
            query = $("#search-term").val() !== "" ? $("#search-term").val() : "cute cats";
            numberOfRecords = $("#number").val();
            startYear = parseInt($("#start-year").val()) || null;
            endYear = parseInt($("#end-year").val()) || null;
            sort = $("[name='sort']").val();

            console.log(sort);

            // call Rita's function here
            fetchAPI(query, numberOfRecords, startYear, endYear, sort);

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

    function fetchAPI(query, limit, beginYear, endYear, sort) {
        var apikey = "vRA0rl8tZ8x0E8jF44IwEKSTZgXZYG2T";
        var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apikey}`;
        var begin = (beginYear !== null) ? beginYear + "0101" : "";
        var end = (endYear !== null) ? endYear + "0101" : "";

        // simplified this to 2 if statements, so we don't have to check all variations.
        // the queryURL can have begin, end, or begin+end and order doesn't matter so these should be enough
        // using += to *append* the parameters (rather than rewriting the queryURL) is what allows this to work
        if (begin !== "") {
            queryURL += `&begin_date=${begin}`;
        } 
        
        if (end !== "") {
            queryURL += `&end_date=${end}`;
        }
        
        if(sort !== "default") {
            queryURL += `&sort=${sort}`;
        }
        
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response); 

            // the returned articled
            var articles = response.response.docs;

            // looping through the articles to generate the "blocks"
            for(var i = 0; i < limit; i++) {
                // this is the container that will 'hold' all the data
                // uses the news_desk, section_name, and type_of_material values as classes for custom styling (if desired)
                // each of these uses a regex to remove non-alphabetic characters including numbers
                var news_desk = (articles[i].news_desk).replace(/[^a-z]/gi, '');
                var section_name = articles[i].news_desk !== articles[i].section_name ? (articles[i].section_name).replace(/[^a-z]/gi, '') : "";
                var type_of_material = (articles[i].type_of_material).replace(/[^a-z]/gi, '');
                var articleContainer = $("<div>", {class: `article-container ${news_desk} ${section_name} ${type_of_material}`});

                var articleTextContainer = $("<div>", {class: 'article-text'});

                var image = $("<img>", {class: "article-image"});
                    // multimedia[18] = blogSmallThumb; 20 = smallSquare168; 21 = smallSquare252
                    image.attr("src", `https://nytimes.com/${articles[i].multimedia[20].url}`);

                // full title of article (headline.main)
                var title = $("<a>", {class: "article-title"});
                    title.attr("href", articles[i].web_url);
                    title.attr("target", "_blank");
                    title.text(articles[i].headline.main);
                
                // who the article was written by (byline)
                var byline = $("<p>", {class: "article-byline"});
                    byline.text(articles[i].byline.original);
                
                // when the article was published (pub_date); uses day.js to format it
                var published = $("<p>", {class: "article-pubdate"});
                    published.text( dayjs(articles[i].pub_date).format("MMM D, YYYY") );
                
                // summary of the article (abstract or snippet)
                var abstract = $("<p>", {class: "article-summary"});
                    abstract.text(articles[i].abstract);

                // keywords
                var keywords = $("<p>", {class: "article-keywords"});
                var kList = [];
                for(var j = 0; j < articles[i]["keywords"].length; j++) {
                    // this creates a button so the user can actually perform a NEW search
                    // with the given keyword as the new search term
                    var term = (articles[i].keywords[j].value).trim();
                    kList.push(`<a class="btn new-search" data-query="${term}">${term}</a>`);
                }
                keywords.append( kList.join(",") );

                articleTextContainer.append(title, byline, published, abstract, keywords);
                
                articleContainer.append(image, articleTextContainer);

                $("#articles").append(articleContainer);
            }
            
          });
    }
});
