var express = require('express');
var app = express();

var github = require('octonode');
var client = github.client();
var ghme           = client.me();
var ghuser         = client.user('pksunkara');
var ghrepo         = client.repo('pksunkara/octonode');
var ghsearch = client.search();

this.params = {};
var self = this;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(function(request, response, next){
  console.log(  "\033[34m \033[1m" + request.method , 
                "\033[36m \033[1m REQUEST URL: " + "\033[32m "+request.url , 
                "\033[36m \033[1m REQUEST TIME: " + "\033[32m "+ new Date() + "\033[31m ");
  next();
});

app.use(express.static("./app"));

app.get("/", function(req, res) {
    res.sendFile("./app/index.html");
});

app.get('/issues', function(request, response) {
  var ghrepo = client.repo(request.query.urlSlug);
	ghrepo.issues(1, 100, function (err, status, body, headers) {
		//return response.status(200).json({ count : status.length})
		var last24hoursData = [];
		var last7daysData = [];
		var above7daysData = [];
		for(i in status){
			if(self.last24hours(status[i].created_at)){
				last24hoursData = last24hoursData.concat(status[i])
			}
			else if(self.last7days(status[i].created_at)){
				last7daysData = last7daysData.concat(status[i])
			}
			else if(self.above7days(status[i].created_at)){
				above7daysData = above7daysData.concat(status[i])
			}
		}

		return response.status(200).json({last24hoursData : last24hoursData, last24hoursDataCount : last24hoursData.length, last7daysData : last7daysData, last7daysDataCount : last7daysData.length, above7daysData : above7daysData, above7daysDataCount : above7daysData.length, count : status.length})  		
	});
});

this.last24hours = function(datetime){
		var before = new Date(datetime),
    now = new Date();
    return ( ( now - before ) < ( 1000 * 60 * 60 * 24 )  ) ? true : false;
	}

	this.last7days = function(datetime){
		var before = new Date(datetime),
    now = new Date();
    return ( ( now - before ) < ( 1000 * 60 * 60 * 24 * 7) && ( now - before ) > ( 1000 * 60 * 60 * 24)) ? true : false;
	}

	this.above7days = function(datetime){
		var before = new Date(datetime),
    now = new Date();
    return ( ( now - before ) > ( 1000 * 60 * 60 * 24 * 7)  ) ? true : false;
	}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


