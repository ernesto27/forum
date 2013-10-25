
app.get("/insertquestions", function(req, res){
	var body  = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo";
	for( var i = 0; i < 20; i++ ){

		var data = ["title " + i , body, 10, 1];
		db.client.query("INSERT INTO questions(title, body, user_id, category_id) VALUES($1, $2, $3, $4 )", data);
	};
	res.send(" inserting")
});


app.get("/viewsession", function(req, res){
	res.json(req.user);
	//res.json(req.session);
});



app.get("/inserttags", function(req, res){
	var categories = [
		"html",
		"javascript",
		"php",
		"css",
		"python",
		"ruby",
		"c++",
		"html5",
		"mysql",
		"nodejs",
		"postgreesql",
		"mongodb",
		"webgl",
		"c",
		"asp",
		".net",
		"cloud hosting",
		"servers",
		"apache",
		"google app engine",
		"mobile",
		"ios",
		"google app engine",
		"android",
		"django",
		"ruby on rails",
		"socket io",
		"express",
		"laravel",
		"syphony"

	]

	for ( var i = 0; i < categories.length; i++ ){
		db.client.query("INSERT INTO tags (name) VALUES($1)", [categories[i]], function(){

		})
	}

	res.json("n")


});