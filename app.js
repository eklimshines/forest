
/**
 * Module dependencies.
 */

var express = require('express');
//var controller = require('./controller');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var i18n = require('i18n');
var MongoStore = require('connect-mongo')(express);

var config = require('./config');
var db = require('./db');
var express_util = require('./utils/express_util');

var app = express();

(function iniApplication(app) {
	db.init(config);

	i18n.configure({
		locales: ['en', 'ko'],
		directory: path.join(__dirname, 'locales')
	});

	app.set('port', config.SERVER_PORT);//process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	
	app.configure(function () {
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(i18n.init);
		//app.use(express.json());
		//app.use(express.urlencoded());
		
		app.use(express.bodyParser());
		app.use(express.cookieParser('any one'));
		app.use(express.methodOverride());
		
		app.use(express.static(path.join(__dirname, 'public')));
	
		app.use(express.session({
			key : 'wiki.sid',
			secret: config.SEESION_SECRET,
			cookie:{
				maxAge : 5 * 60 * 1000,
			},
			store: new MongoStore({
				host: config.DB_HOST,
				port: config.DB_PORT,
				db:config.DB_DB,
				username: config.DB_USER || undefined,
				password: config.DB_PASS || undefined,
				collection: config.SESSION_COLLECTION
			})
		}));	

		app.use(function(req,res,next) {
			res.locals.require = require;
			res.locals.req = req;
			res.locals.session = req.session;
			console.log("\n_____\n"+res.locals);
			res.locals.config = {
			};
			next();
		});	
		app.use(app.router);
		// development only
		//if ('development' == app.get('env')) {
		app.use(express_util.errorHandler());
		//}

	});

	

	require('./controllers').delegate(app);

	//app.get('/', routes.index);
	//app.get('/users', user.list);

	http.createServer(app).listen(app.get('port'), function(){
		console.log('Server listening on port ' + app.get('port'));
	});
}(app));


