
/*
 * GET home page.
 */

exports.delegate = function(app){
	var controllers = [
		'user'	
	];

	controllers.forEach(function(controller){
		require('./' + controller).delegate(app);
	});

	app.get('/', function(req,res){
		res.render('index', {title:'Wiki'});
	});
};


/*
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
*/
