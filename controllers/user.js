
/*
 * GET users listing.
 */
var userService = require('../services/user_service');


exports.delegate = function(app) {
	app.get('/signin',signIn);
	app.post('/signin', postSignIn);

	app.get('/signup', signUp);
	app.post('/signup', postSignUp);
	
	app.get('/signout', signOut);
};

var postSignIn = function (req, res, handleError){
	var username = req.body.username;
	var password = req.body. password
	if (!username && username.length <= 0) {
		return handleError('username is not valid');//console.error('username is not valid');
	}
	if (!password && password.length <= 0) {
		return handleError('password is not valid');//console.error('username is not valid');
	}
/*	var userInfo = {
		username : username,
		password : password	
	};
*/
	userService.signIn(username, password, function (err,user) {
		if (err) return handleError(err);
		
		req.session.user = user;
		req.session.save(function (err) {
			
			console.log(req.session);	
			if (err) return handleError(err);
			return res.redirect('/');
		});
	});
}
var signIn = function (req, res, handleError){
	console.log(req.session);	
	if (req.session.user) {
		return handleError('Already Signed');
	}
	res.render('user/signin');
};

var signUp = function (req, res, handleError){
	res.render('user/signup');
};

var postSignUp = function (req, res, handleError){
	var username = req.body.username;
	var password = req.body. password
	if (!username && username.length <= 0) {
		return handleError('username is not valid');//console.error('username is not valid');
	}
	if (!password && password.length <= 0) {
		return handleError('password is not valid');//console.error('username is not valid');
	}

	var userInfo = {
		username : username,
		password : password	
	};

	userService.createUser(userInfo, function (err) {
		if (err) return handleError(err);

		return res.redirect('/');
	});
//	res.render('user/signup');
};

var signOut = function(req, res, handleError){
//	if(!req.session.user) {
//		return handleError('Not logined...');
//	}
	
	req.session.user = null;
	req.session.save(function(err){
		if(err) return handleError(err);
		
		return res.redirect('/');
	});
};

/*
exports.list = function(req, res){
  res.send("respond with a resource");
};
*/
