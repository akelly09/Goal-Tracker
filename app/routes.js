'use strict';

var datastore = require('nedb');
var db        = {};
var ObjectID  = require('mongodb').ObjectID;
db.goals      = new datastore({ filename: 'db/goal.json', autoload: true });

/*
var id = new ObjectID().toHexString();

var milestone = {
  id: 1,
  title:"Read ch.1 of book",
  percentage:50,
  completeDate:new Date()
};

var goal = {
  title: 'Learn Japanese',
  completeDate: new Date(),
  milestones: []
};

//inserts a goal
//db.goals.insert(goal);

//inserts a milestone
//db.goals.update({_id:"BwMFKOMq6hGRAU15"}, {$push:{milestones:milestone}});  

*/

module.exports = function(app) {

  //get goals and milestones
  app.get('/api/goals', function(req, res) {
    db.goals.find({}, function (err, docs) {
      res.json(docs);
    });
  });


  //get a goal and its milestones
  app.get('/api/goals/:goal_id', function(req, res) {
    db.goals.find({_id: req.params.goal_id}, function (err, docs) {

      var json = docs;

      if(json.length > 0){
        json = json[0];
      }

      res.json(json);

    });
  });


  //create goals and milestones 
  app.post('/api/goals', function(req, res) {
    db.goals.insert(req.body);
    res.send(req.body);
  });


  //delete goal 
  app.delete('/api/goals/:goal_id', function(req, res) {
    db.goals.remove({ _id: req.params.goal_id }, {}, function (err, numRemoved) {
      res.send('Removed ' + numRemoved + ' goal.');
    });
  });


  //insert milestone 
  app.post('/api/goals/:goal_id', function(req, res) {
    req.body.id = new ObjectID().toHexString();
    //TODO: add error handling function!!
    db.goals.update({_id:req.params.goal_id}, {$push:{milestones:req.body}});
    res.send('Inserted a milestone.');
  });


  //delete milestone 
  app.delete('/api/goals/:goal_id/:milestone_id', function(req, res) {

    db.goals.update({ _id: req.params.goal_id }, { $pull: { milestones: {id: req.params.milestone_id} } }, {}, function () {
      res.send('Removed a milestone.');
    });

  });


  //default load index page
  app.get('/', function(req, res) {
    res.sendFile('index.html' , { root : __dirname});
  });

};


/*
REST API's to create:
(Goals)
X GET    /api/goals                        - get goals and milestones 
X POST   /api/goals                        - create goal
X DELETE /api/goals/:goal_id               - delete goal
(Milestones)
X POST   /api/goals/:goal_id               - create milestone
X DELETE /api/goals/:goal_id/:milestone_id - delete milestone
*/