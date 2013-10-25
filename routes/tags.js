var db = require(".././database");

module.exports = function(app){
	app.get("/tags", function(req, res){
		var questionId = req.query.questionid;
		/*var search = db.client.query("SELECT * FROM tags WHERE name LIKE $1", ["%" + tag + "%"], function(err, result){
				res.json(result);
			}
		);*/

		db.client.query("SELECT * FROM question_tag WHERE id_question = $1", [questionId],
			function(err, result){
				ids = [];
				for(index in result.rows){
					ids.push(result.rows[index].id_tag);
				}

				params = [];
				idsLen = ids.length;
				if(idsLen){
					for(var i = 1; i <= idsLen; i++) {
						params.push('$'+i);
					}
					db.client.query("SELECT * FROM tags WHERE id IN ("+ params.join(',') +")", ids,
						function(err, result){
							//var idQuestions = result.rows;
							res.json(result.rows)
						}
					);
				}
				
			});

	});



	app.post("/tags", function(req, res){
		res.json(req.params)
	});

}