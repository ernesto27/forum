function insertTmpl(name, callback){
	function createScriptTmpl(name, content){
		var script = document.createElement("script");
		script.type = "text/tmpl";
		script.id = name + "-tmpl";
		script.innerHTML = content;
		document.head.appendChild(script);
	}

	$.ajax({
		url: "/js/templates/" + name + ".html",
		async: false,
		success: function(data){
			createScriptTmpl(name, data);
		} 
	})
}

insertTmpl("addQuestion");
insertTmpl("home");
insertTmpl("index");
insertTmpl("single");
insertTmpl("singlePage");
insertTmpl("editQuestion");
insertTmpl("singleComment");

var Forum = {
	Models : {},
	Collections: {},
	Views:{},
	Routers: {},
}




var categories = [
    {
      "id": 1,
      "name": "html"
    },
    {
      "id": 2,
      "name": "javascript"
    },
    {
      "id": 3,
      "name": "php"
    },
    {
      "id": 4,
      "name": "css"
    },
    {
      "id": 5,
      "name": "python"
    },
    {
      "id": 6,
      "name": "ruby"
    },
    {
      "id": 7,
      "name": "c++"
    },
    {
      "id": 8,
      "name": "html5"
    },
    {
      "id": 9,
      "name": "mysql"
    },
    {
      "id": 10,
      "name": "nodejs"
    },
    {
      "id": 11,
      "name": "postgreesql"
    },
    {
      "id": 12,
      "name": "mongodb"
    },
    {
      "id": 13,
      "name": "webgl"
    },
    {
      "id": 14,
      "name": "c"
    },
    {
      "id": 15,
      "name": "asp"
    },
    {
      "id": 16,
      "name": ".net"
    },
    {
      "id": 17,
      "name": "cloud hosting"
    },
    {
      "id": 18,
      "name": "servers"
    },
    {
      "id": 19,
      "name": "apache"
    },
    {
      "id": 20,
      "name": "google app engine"
    },
    {
      "id": 21,
      "name": "mobile"
    },
    {
      "id": 22,
      "name": "ios"
    },
    {
      "id": 23,
      "name": "google app engine"
    },
    {
      "id": 24,
      "name": "android"
    },
    {
      "id": 25,
      "name": "django"
    },
    {
      "id": 26,
      "name": "ruby on rails"
    },
    {
      "id": 27,
      "name": "socket io"
    },
    {
      "id": 28,
      "name": "express"
    },
    {
      "id": 29,
      "name": "laravel"
    },
    {
      "id": 30,
      "name": "syphony"
    }
  ]