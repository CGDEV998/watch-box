const express = require('express');
const path = require('path');
const request = require('request');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

let trendingMoviesURL = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}`;

function getTrendingMovies (callback) {
  request(trendingMoviesURL, function (error, response, body) {
    if (error) { throw error; }
    callback(body);
  });
};

app.get('/', (req, res) => {
  getTrendingMovies((trendingMovies) => {
    res.render('pages/index', { trendingMovies: JSON.parse(trendingMovies).results });
  });
});

app.listen(port, () => {
  console.log(`Watch Box app listening on port ${port}!`);
});
