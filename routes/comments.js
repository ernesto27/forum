var db = require(".././database");

module.exports = function(app){
	app.get("/comments", function(req, res){
		var questionId = req.query.questionId;
		
		db.client.query("SELECT * FROM comments, users WHERE comments.question_id = ($1) AND comments.user_id = users.social_id ORDER BY id DESC", [questionId],  function(err, result){
			res.json(result.rows);
		});
	});

	app.post("/comments", function(req, res){
		var comment = req.body.comment;
		var questionId = req.body.questionId;
		data = [comment, questionId , req.session.passport.user.id];
		console.log(data);
		
		db.client.query("INSERT INTO comments(comment, question_id, user_id) VALUES ($1, $2, $3) RETURNING id"
			, data, function(err, result){
				res.json(result)
			})
	});

	app.delete("/comments/:id", function(req, res){
		var commentId = req.params.id;
		// check if the user login is the owner of the question
		
		db.client.query("DELETE FROM comments WHERE id = ($1)" , [commentId], function(err, result){
			if(!err){
				res.json(result);
			}else{
				res.send(500);
			}
		})
		
	});
}