const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json')

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('views', path.join(__dirname, '/public'));



app.get('/', (req, res) => {
    res.render("index.ejs");
})
app.get('/random', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render("random.ejs", { rand: num });
})
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    console.log(data);
    if (data) {
        res.render("subreddit.ejs", { ...data });
    } else {
        res.render("index.ejs");
    }

})

app.get('/cats', (req, res) => {
    const cats = ['smiley', 'smelly', 'tiny'];
    res.render("cats.ejs", { cats });
})

app.listen('3000', () => {
    console.log("Listening on port 3000");
})