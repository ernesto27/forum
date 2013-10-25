var passport = require('passport'),
	TwitterStrategy = require('passport-twitter').Strategy
;

var db = require("../.././database");
var config = require("./config");


passport.use(new TwitterStrategy({
	    consumerKey: config.twitterKeys.consumerKey,
	    consumerSecret: config.twitterKeys.consumerSecret,
	    callbackURL: "/callback"
	    //callbackURL: "http://127.0.0.1:5000/callback"
	},
	function(token, tokenSecret, profile, done) {
	  	var username = profile.username;
	  	var avatar = profile.photos[0].value;
	  	var socialId = profile.id;
	  	var data = [username, avatar, parseInt(socialId)];
	  	console.log(data);

	  	db.client.query("INSERT INTO users (username, avatar, social_id) values ($1, $2, $3)", data
	  		,function(){
	  			done(null, profile);
	  		});
		
	  }
));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});


module.exports.passport = passport;