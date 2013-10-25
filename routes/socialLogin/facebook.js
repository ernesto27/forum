var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require("../.././database");
var config = require("./config");


passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});



passport.use(new FacebookStrategy({
    clientID: config.facebookKeys.clientID,
    clientSecret: config.facebookKeys.clientSecret,
    callbackURL: "/auth/facebook/callback"

  },
  function(accessToken, refreshToken, profile, done) {
   
    var social_id = parseInt(profile.id);
    var username = profile.displayName;
    var avatar = "https://graph.facebook.com/"+profile.id+"/picture";
    data = [username, avatar, social_id];
    console.log(data);
    db.client.query("INSERT INTO users (username, avatar, social_id) values ($1, $2, $3)", data
	  		,function(err, result){
	  			console.log(err)
	  			console.log(result)
	  			done(null, profile);
	  		});

    
  }
));


module.exports.passport = passport;



