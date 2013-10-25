var pg = require("pg");
var conString = process.env.DATABASE_URL || "pg://postgres:1234@localhost:5432/forum";
var client = new pg.Client(conString);
client.connect();


//client.query("CREATE DATABASE forum")


client.query(
	"CREATE TABLE IF NOT EXISTS questions (" +
	"id serial, " +
	"title varchar(255)," +
	"body text, " +
	"created TIMESTAMP  not null default NOW(), " + 
	"user_id bigint, " + 
	"votes int DEFAULT 0, " +
	"views int DEFAULT 0, " + 
	"category_id int, " +
	"PRIMARY KEY(id) )"
);

client.query(
	"CREATE TABLE IF NOT EXISTS users(" +
	"username varchar(100), " +
	"avatar varchar(255), " + 
	"social_id bigint, " +
	"PRIMARY KEY(social_id) )"
);


client.query(
	"CREATE TABLE IF NOT EXISTS comments(" +
	"id serial, " +
	"comment text, " + 
	"question_id int, " +
	"user_id bigint, " +
	"created TIMESTAMP  not null default NOW(), " +
	"PRIMARY KEY(id) )"
);

client.query(
	"CREATE TABLE IF NOT EXISTS tags(" +
	"id serial, " +
	"name varchar(100), " + 
	"PRIMARY KEY(id) )"
);

client.query(
	"CREATE TABLE IF NOT EXISTS question_tag(" +
	"id serial, " +
	"id_question int, " + 
	"id_tag int, " + 
	"PRIMARY KEY(id))"
);



exports.client = client;