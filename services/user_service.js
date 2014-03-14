var models = require('../db').models;
var User = models.User;


exports.signIn = function (username, password, callback) {
	User.findOne({username: username}, function(err,user) {
		if(err || !user) return callback('user not found',403);
		if(password !== user.password) return callback('incorrect password',403);
		if('incative' == user.state) return callback('not active user',403);
		callback(null,user);
	});
};

exports.createUser = function (userInfo, callback) {
	var user = new User(userInfo);
	
	user.save(callback);
};
