define(["express", "./routes", "http", "module", "path", "../config"], function(express, routes, http, module, path, config) {

  var __filename = module.uri;
  var __dirname = path.dirname(__filename);

  var app = express();

  app.configure(function() {
    app.set('port', config.ports.gui);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });

  app.configure('development', function() {
    app.use(express.errorHandler());
  });

  app.get('/', routes.index);

  return {
    listen: function() {
      http.createServer(app).listen(config.ports.gui, function() {
        console.log("Express server listening on port " + app.get('port'));
      });
    }
  }
});
