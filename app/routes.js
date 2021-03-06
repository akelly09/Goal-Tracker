'use strict';

var datastore = require('nedb');
var db        = {};
var ObjectID  = require('mongodb').ObjectID;
db.goals      = new datastore({ filename: 'db/goal.json', autoload: true });


module.exports = function(app) {

  /*-----GOALS----*/

  //get all goals and milestones
  app.get('/api/goals', function(req, res) {

    db.goals.find({}).sort({completeDate: 1}).exec(function (err, goals) {

      var goalsCompleted = 0, milestonesLength;

      for(let goal of goals){

        milestonesLength = goal.milestones.length;

        goal.completePercentage = 0;

        for(let milestone of goal.milestones){
          milestone.id = new ObjectID().toHexString();
          if(milestone.complete){
            goalsCompleted++;
          }
        }

        if(milestonesLength > 0){
          goal.completePercentage = Math.round( (goalsCompleted / milestonesLength) * 100 );
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


  /*-----MILESTONES----*/


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


  /*
  Cannot get this working
  //update milestone
  app.put('/api/goals/:goal_id/:milestone_id', function(req, res) {
    db.goals.update({ _id: req.params.goal_id }, { $pull: { milestones: {id: req.params.milestone_id} } }, {}, function () {
      res.send('Removed a milestone.');
    });
  });
  */



  //get valid dates
  //TODO: test and see if this could be better
  app.get('/api/reminders', function(req, res) {

    db.goals.find({}, function (err, goals) {

      var reminders = [];
      var d         = new Date();
      var today     = new Date(d.getFullYear(), d.getMonth(), d.getDate());

      var d, goalDate;

      for(let goal of goals){

        goalDate = new Date(goal.completeDate);

        if(goalDate >= today){
          reminders.push(goalDate);
        }
      }

      res.json(reminders);

    });
    
  });


    /*-----CHARTS----*/

  var createMapping = function(goal){

    var date, month;
    
    var mapping = {};

    for(let progress of goal.progress){

      date  = new Date(progress.currentDate);
      month = date.getMonth();

      //console.log(date + " - " + month);

      if(!mapping[month]){
        mapping[month] = [];
      }

      mapping[month].push(progress.percentage);

    }

    return mapping;

  }


  var getEarliestMonth = function(goals){

    var startMonth = new Date(goals[0].progress[0].currentDate);
    var month;

    for(let goal of goals){

      month = new Date(goal.progress[0].currentDate);

      if(month < startMonth){
        startMonth = month;
      }

    }

    return startMonth;

  }

  //get data for charts
  app.get('/api/charts', function(req, res) {

    db.goals.find({}).sort({completeDate: 1}).exec(function (err, goals) {

      //TODO fix this
      if(goals.length == 0){
        return {
          labels: [],
          data: [[]],
          series: []
        };
      }

      var series = [], allCharts = [], labels = [], chartData = [];

      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      var curDate = new Date();

      //get earliest goal date
      var startMonth = getEarliestMonth(goals); //is this necesary?
      //new Date(goals[0].progress[0].currentDate);

      console.log(startMonth);

      //create and set end date
      var endMonth = new Date(curDate);
      endMonth.setMonth(curDate.getMonth()+1);

      var month = startMonth.getMonth();

      var mapping;

      //set month label
      for(var i = 0; i < months.length; i++){
        labels.push(months[month]);
        month = (month+1) % months.length;
      }

      //iterate over goals
      for(let goal of goals){

        mapping   = createMapping(goal);

        chartData = [];

        //iterate over the months
        while(month != endMonth.getMonth()){

          //if no data for this month add 0, otherwise add data at first of the month
          if(!mapping[month]){
            chartData.push(0);
          }else{
            chartData.push(mapping[month][0]);
          }

          //console.log(endMonth.getMonth());

          month = (month+1) % months.length;
        }

        allCharts.push(chartData);
        series.push(goal.title);

      }

      //console.log(mapping);

      var myData = [[null,null,0,5,50]];
   
      res.json({
        labels: labels,
        data: allCharts,
        //data: myData,
        series: series
      });

    });
    
  });


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