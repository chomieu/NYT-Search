var apikey = "vRA0rl8tZ8x0E8jF44IwEKSTZgXZYG2T";
var keyword = obama;
var limit = 2;
var beginYear = 2015;
var endYear = 2018;
var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&fl=${limit}&begin_year=${beginYear}&end_date=${endYear}&api-key=${apikey}`

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
