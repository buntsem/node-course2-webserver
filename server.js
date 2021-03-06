const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine ', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
});
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.get('/', (req, res) => {
  // res.send('<h1>Hello, Express!</h1>');
  // res.send({
    // name: 'Andrew',
    // likes: [
    //   'biking',
    //   'cities'
    // ]
    res.render('home.hbs', {
      name: "Bunty",
      welcomeMessage: "Welcome to the home page",

    });
  // });
});
app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',

  });
});
app.get('/error', (req, res) => {
  res.send({
    error: "Error occured"
  });
});
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
