'use strict';

var datastore = require('nedb');
var db        = {};
var ObjectID  = require('mongodb').ObjectID;
db.goals      = new datastore({ filename: 'db/goal.json', autoload: true });


module.exports = function(app) {

  //get all goals and milestones
  app.get('/api/goals', function(req, res) {

    db.goals.find({}, function (err, goals) {

      var goalsCompleted = 0, milestonesLength;

      for(let goal of goals){

        milestonesLength = goal.milestones.length;

        for(let milestone of goal.milestones){
          milestone.id = new ObjectID().toHexString();
          if(milestone.complete){
            goalsCompleted++;
          }
        }

        if(milestonesLength > 0){
          goal.completePercentage = Math.round( (goalsCompleted / milestonesLength) * 100 );
          goalsCompleted = 0;
        }

      }

      res.json(goals);
    });
  });


  //get one goal and its milestones
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
    var milestones = req.body.milestones;
    for(let milestone of milestones){
      milestone.id = new ObjectID().toHexString();
    }
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


  //update goal / milestones
  app.put('/api/goals/:goal_id', function(req, res) {

    var milestones = req.body.milestones;

    for(let milestone of milestones){
      if(!milestone.id){
        milestone.id = new ObjectID().toHexString();
      }
    }

    db.goals.update({  _id: req.params.goal_id }, { $set: req.body }, { multi: true }, function (err, numReplaced) {
        res.send('Edited ' + numReplaced + ' goal');
    });

  });


  /*
  //inactive: toggle milestone status
  app.put('/api/goals/:goal_id/:milestone_id', function(req, res) {

  
    var json = {
      'complete':true
    };

    json = { 
      milestones: {
        id: req.params.milestone_id,
        complete: false
      } 
    };

    
    db.goals.update({  _id: req.params.goal_id}, { $set: json }, {}, function (err, numReplaced) {
        res.send('Edited ' + numReplaced + ' goal');
    });
   

  });
  */


  //default load index page
  app.get('*', function(req, res) {
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