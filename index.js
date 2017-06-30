//requiring NPM modeles
// var express = require('express');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var q = require('q');
var db = mongoose.connection;
// var app = express();
var webpack = require('webpack');
var config = require("./webpack.config.js");
var WebpackDevServer = require("webpack-dev-server");
var injectTapEventPlugin = require('react-tap-event-plugin');

db.on('error', console.error);
mongoose.Promise = q.Promise;


//requiring local modeles
var configs = require('./config');
var routes = require('./routes/routes');
var userModel = require('./models/users');
var helperFunctions = require('./helpers/helperFunctions');


// Uncomment the following lines to start logging requests to consoles.
// app.use(morgan('combined'));
// parse application/x-www-form-urlencoded.
// app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json.
// app.use(bodyParser.json());
 
//connedting to mongoDB
mongoose.connect('mongodb://'+configs.dbHost+":"+configs.dbPort+'/'+configs.dbName);
//populating data if DB is not already populated.
helperFunctions.populateDb();

//Initilizing routes.
// routes(app);

// serve client side code.
//app.use('/',express.static('client'));
// webpack-dev-server
// config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
injectTapEventPlugin();
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
	hot: true,
  historyApiFallback: true
});
server.listen(configs.applicationPort);


//Finally starting the listener
// app.listen(configs.applicationPort, function () {
//   console.log('Crossover Todo app listening on port '+configs.applicationPort+'!');
// });
