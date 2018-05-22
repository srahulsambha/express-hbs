const express = require('express'),
hbs = require('hbs'),
fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname+ '/views/partials');

app.set('view engine', 'hbs');
//Middleware
app.use(function(req, res, next){
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url} \n`;
  console.log(log);
  fs.appendFile('server.log', log , function(err){
    if (err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use(function(req, res, next){
//   res.render('maintenance.hbs', {
//     webSiteTitle: 'Some Website',
//     pageTitle: 'Maintenance Page'
//   });
//
// });

//Static Middleware
app.use(express.static(__dirname + '/public'));


//Template engine
hbs.registerHelper('getCurrentYear', function(){
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text){
  return text.toUpperCase();
});


// Get handler
app.get('/', function(req, res){
  res.render('home.hbs',{
    webSiteTitle: 'Some Website',
    welcomeMessage: 'Welcome to Wonderful SomeWebsite',
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear()

  });
});

app.get('/about', function(req, res){
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/projects', function(req, res){
  res.render('projects.hbs', {
    welcomeMessage: 'Protfolio information',
    pageTitle: 'Projects Page',
    currentYear: new Date().getFullYear()
  });
});


// app.get('/bad', function(req, res){
//   res.send({
//     errorMessage: 'Unable to process request'
//   });
// });

app.listen(port, function() {
  console.log(`Server is up on port ${port}`);
});
