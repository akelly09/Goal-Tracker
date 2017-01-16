// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var datastore = require('nedb');


var db        = {};
db.goals = new datastore({ filename: __dirname + '/db/goal.json', autoload: true });



// configuration ===========================================
    
// config files
//var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url); 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
//app.use(express.static('components'));
app.use(express.static(__dirname + '/app')); 

// routes ==================================================
//require('./app/routes')(app); // configure our routes

//app.set('view engine', 'ejs');


app.get('/api/goals', function(req, res) {
  db.goals.find({}, function (err, docs) {
    res.json(docs);
  });
});

app.get('*', function(req, res) {
    //res.render('app/index', { root : __dirname});
  res.sendFile('app/index.html' , { root : __dirname});
  //res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;        