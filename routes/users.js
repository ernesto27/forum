
var db = require("../database");

var twitter = require("./socialLogin/twitter")
var facebook = require("./socialLogin/facebook")


module.exports = function(app){

  // TWITTER LOGIN 
	app.get('/login/twitter', twitter.passport.authenticate('twitter'));
	app.get('/callback',
		twitter.passport.authenticate('twitter', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));

  // FACEBOOK LOGIN
  app.get('/login/facebook', facebook.passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', 
    facebook.passport.authenticate('facebook', { successRedirect: '/#latest',
                                    failureRedirect: '/login' }));


	app.get("/session", function(req, res){

    if(req.query.id === req.user.id){
      res.json("login")
    }else{
      return false;
    }
	});

	app.get("/logout",function(req,res){
  	req.session.destroy();
  	res.redirect("/");
	});

	app.get("/user/questions", function(req, res){
		var id = req.session.passport.user.id;
		var data = [parseInt(id)];
		db.client.query("SELECT * FROM questions WHERE user_id = $1", data,
			function(err, result){
				res.json(result.rows)
			});
		
	});

	app.get("/user/session", function(req, res){
  	var session = req.session.passport.user;
		if(session){
      if(session.provider == "facebook"){
        var username = session.displayName;
        var avatar = "https://graph.facebook.com/"+session.id+"/picture?type=large";
        res.json({ username: username, avatar: avatar});
      }else{
        res.json({ username: session.username, avatar: session.photos[0].value})

      }
		}else{
			res.send(401);

		}
	});


    
  	
}