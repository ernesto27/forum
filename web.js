var http = require("http"),
	express  = require("express"),
	path = require("path"),
	port = process.env.PORT || 80,
	app = module.exports = express(),
	server = http.createServer(app),
	db = require("./database"),
	passport = require('passport'),
	socketio = require("socket.io")
;


app.configure(function(){	
	app.use(express.static('./public'));
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('holywars'));
    app.use(express.session({secret: "holywars"}));
    app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.locals.pretty = true;		
});


require("./routes/questions")(app);
require("./routes/users")(app);
require("./routes/comments")(app);
require("./routes/tags")(app);



var io = socketio.listen(server, {log: false});

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

server.listen(port, function() {
  console.log("Listening on " + port);
});



io.sockets.on('connection', function (socket) {
  socket.on('newquestion', function (data) {
  	socket.emit("addnewquestion", data);
  	socket.broadcast.emit("addnewquestion", data);
  });

  socket.on("newcomment", function(data){
  	socket.broadcast.emit("addcomment", data);
  });


});

