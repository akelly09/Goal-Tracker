'use strict';

// set up ========================
var express   = require('express');
var Datastore = require('nedb');
var ObjectID  = require('mongodb').ObjectID;
var app       = express();
var db        = {};



/*
db.goals = new Datastore({ filename: __dirname + '/db/goal.json', autoload: true });

var id = new ObjectID().toHexString();

var milestone = {
  id: id,
  title:"Read ch.1 of book",
  percentage:50,
  completeDate:new Date()
};

var goal = {
  title: 'Learn Japanese',
  completeDate: new Date(),
  milestones: [milestone]
};


//get goals and milestones 
app.get('/api/goals', function(req, res) {
  db.goals.find({}, function (err, docs) {
    res.json(docs);
  });
});

//create goals and milestones 
app.post('/api/goals', function(req, res) {

});

//create milestone 
app.post('/api/goals/:goal_id', function(req, res) {

});

//delete goal 
app.delete('/api/goals/:goal_id', function(req, res) {

});

//delete milestone 
app.delete('/api/goals/:goal_id/:milestone_id', function(req, res) {

});



app.get('/', function(req, res) {
  res.sendFile('app/index.html' , { root : __dirname});
  //res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


//inserts a goal
//db.goals.insert(goal);

//inserts a milestone
//db.goals.update({_id:"BwMFKOMq6hGRAU15"}, {$push:{milestones:milestone}});  


/*
REST API's to create:
X GET    /api/goals                        - get goals and milestones 
- POST   /api/goals                        - create goal
- POST   /api/goals/:goal_id               - create milestone
- DELETE /api/goals/:goal_id               - delete goal
- DELETE /api/goals/:goal_id/:milestone_id - delete milestones



// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

*/



/*
// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
//var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
//app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
*/