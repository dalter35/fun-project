var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var users = [
		{
			name:'Brian'
		},
		{
			name:'Jonny'
		},
		{
			name:'Gideon'
		}
	];

mongoose.connect('mongodb://localhost/myBlog');

mongoose.connection.once('open', function() {
	console.log('Connection open!');
	User.remove({}, function() {
		User.create(users);
	});
});

var UserSchema = new mongoose.Schema({
	name: {type: String, unique: true}
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