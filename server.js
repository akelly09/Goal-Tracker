// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express

var Datastore = require('nedb');
var db        = {};


db.goals = new Datastore({ filename: __dirname + '/db/goal.json', autoload: true });

var goal = {
  title: 'Learn Japanese',
  completeDate: new Date(),
  milestones: []
};

var milestone = {
    title:"Read Ch. 1 of book",
    percentage:50,
    completeDate:new Date()
};


//inserts a goal
//db.goals.insert(goal);

//inserts a milestone
//db.goals.update({_id:"SBVu5qSexbAXZPrV"}, {$push:{milestones:milestone}});  


/*
REST API's to create:
- get goals and milestones
- create goal
- create milestone
- delete goal
- delete milestones
*/


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");





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