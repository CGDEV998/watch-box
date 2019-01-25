const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const movies = require('./movies.json');

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index', { movies: movies });
});

app.listen(port, () => {
  console.log(`Watch Box app listening on port ${port}!`);
});
