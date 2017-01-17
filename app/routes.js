var datastore = require('nedb');
var db        = {};
db.goals      = new datastore({ filename: 'db/goal.json', autoload: true });

var milestone = {
  id: 1,
  title:"Read ch.1 of book",
  percentage:50,
  completeDate:new Date()
};

module.exports = function(app) {

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

  //default load index page
  app.get('*', function(req, res) {
    res.sendFile('index.html' , { root : __dirname});
  });

};