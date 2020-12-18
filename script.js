var apikey = "vRA0rl8tZ8x0E8jF44IwEKSTZgXZYG2T";
var keyword = "election";
var limit = "2";
var begin =  "2019" + "0101";
var end = "2020" + "0101";
var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${apikey}`;

if (begin !== "" && end !== "") {
    queryURL = queryURL + `&begin_date=${begin}&end_date=${end}`;
} else if (begin !== "") {
    queryURL = queryURL + `&begin_date=${begin}`;
} else {
    queryURL = queryURL + `&end_date=${end}`;
}

queryURL = queryURL + "&sort=newest";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });