var db = require(".././database");

module.exports = function(app){
	app.get("/", function(req, res){
		var session = req.session.passport.user;
		if(session){
			if(session.provider == "facebook"){
				var username = session.displayName;
    			var avatar = "https://graph.facebook.com/"+session.id+"/picture";
			}else{
				var username = session.username;
				var avatar = session.photos[0].value;
			}
			
			res.render("index",{
					logged: session.id,
					username: username,
					avatar: avatar
				});
		}else{
			res.render("index");
		}
	});


	app.get("/questions", function(req, res){
		var orderType = req.query.order;
		
		if(orderType === "byvote"){
			var questions = db.client.query("SELECT * FROM questions, users WHERE questions.user_id = users.social_id ORDER BY questions.votes DESC",
				function(err, results){
					res.json(results.rows)
				}
			);
		}else{ 
			var questions = db.client.query("SELECT * FROM questions, users WHERE questions.user_id = users.social_id ORDER BY questions.id DESC",
			//var questions = db.client.query("SELECT * FROM questions",
				function(err, results){
					if(typeof(results.rows) != undefined){
						res.json(results.rows)
					}	
				}
			);
		}
	});

	app.get("/tes", function(req, res){
		res.json({
			id: 100,
			username: "ernesto"
		})
	})

	app.post("/questions", function(req, res){
		var title = req.body.title;
		var body = req.body.body;
		var tagsArray = req.body.tags.split(",");
		var session = req.session.passport.user;
		//tagsArray.pop()
		
		data = [title, body, session.id, 1];
		//data = [title, body, 1, 1];


		db.client.query("INSERT INTO questions (title, body , user_id, category_id) VALUES ($1, $2, $3, $4) RETURNING id"
				, data, function(err, result){
					console.log(err)
					var questionId = result.rows[0].id;
					for ( var i = 0; i < tagsArray.length; i++){
						console.log(tagsArray[i])
						db.client.query("INSERT INTO question_tag (id_question, id_tag) VALUES ($1, $2)", [questionId, tagsArray[i]])
					}
					resData = {
						id: questionId,
						username: session.username
					}
					res.json(resData);
				})

	});

	app.get("/questions/:id", function(req, res){
		var questionId = req.params.id;
		db.client.query("SELECT * FROM questions, users WHERE id = ($1) AND questions.user_id = users.social_id", [questionId],
		function(err, result){
			if(!err){
				res.json(result.rows[0]);
			}
		})
		
		
	});

	app.delete("/questions/:id", function(req, res){
		var question_id = req.params.id;
		var session = req.session.passport.user;
		if(session){
			db.client.query("DELETE FROM questions WHERE id = ($1) AND user_id = ($2)", [question_id, session.id],
				function(err, result){
					res.json(result);
				});
		}else{
			res.send(401);
		}
	});

	app.put("/questions/:id", function(req, res){
		var id = parseInt(req.body.id);
		var title = req.body.title;
		var body = req.body.body;
		var votes = req.body.votes;


		var session = req.session.passport.user;
			if(session){
			var data = [title, body,votes, id, session.id];
			db.client.query("UPDATE questions SET title = ($1), body = ($2), votes = ($3) WHERE id = ($4) AND user_id = ($5)", data,
				function(err, result){
					if(!err){
						res.json(result);					
					}
				});
			}
	});
}











