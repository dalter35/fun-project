var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/myRateApp');

mongoose.connection.once('open', function() {
	console.log('Connection open!');
	User.remove({}, function() {
		User.create([{name: 'Brian'}, {name: 'Eric'}, {name: 'Kyle'}], function(err, _users) {
			console.log(err);
		});
	});
});

var UserSchema = new mongoose.Schema({
	name: String
});

var User = mongoose.model('User', UserSchema);


var app = express();

app.set('view engine', 'jade');

app.use(express.static(__dirname + "/client"));

app.use(bodyParser.json());

var paths = ['/', '/users', '/feed'];

paths.forEach(function(path) {
	app.get(path, function(req, res) {
		res.render('index');
	});
});

app.get('/api/users', function(req, res) {
	User.find({}, function(err, _users) {
		res.send(_users);
	});
});



app.listen(8000);