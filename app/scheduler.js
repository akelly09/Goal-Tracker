'use strict';

var http    = require('http');
var cronJob = require('cron').CronJob;

var request = require('request');


var updateGoalProgress = function(){

  //make a request to get goals
  request('http://localhost:8080/api/goals', function (error, response, body) {

    if (!error && response.statusCode == 200) {
      
      var goals = JSON.parse(body);

      var progress;

      for(let goal of goals){

        progress = {
          currentDate: new Date(),
          percentage : goal.completePercentage
        }

        goal.progress.push(progress);

        //update a goal
        request.put({url:'http://localhost:8080/api/goals/' + goal['_id'], json: goal}, function(err,httpResponse,body){
          console.log(body);
        })

      }
    }

  });

}


//runs one a month
var job = new cronJob('0 0 1 * *', function() {

  updateGoalProgress();

  }, function () {
    // This function is executed when the job stops
  },
  true, // Start the job right now
  null  // Time zone of this job.
);
