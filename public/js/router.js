Forum.Routers.questions = Backbone.Router.extend({

	routes:{
		'' : "index",
		'question/:id' : "singleQuestion",
		'addquestion' : 'addQuestion',
		'home' : "showHome",
		"edit/:id" : "editQuestion",
		"latest" : "latestQuestions",
		"votes" : "questionsByVotes"
	},

	index: function(){
		Backbone.history.navigate("#latest", {trigger: true});
	},

	singleQuestion: function(id){
		var question = new Forum.Models.question({id: id});
		
		question.fetch().then(function(data){
			new Forum.Views.singleQuestion({ model: question}).render(data);
			var tag = new Forum.Views.questionTags();
			tag.insertTagsQuestions(id);
		});

	},

	addQuestion: function(){
		new Forum.Views.addQuestion().render();	

	},

	editQuestion: function(id){
		var question = new Forum.Models.question({id: id});
		question.fetch().then(function(data){
			new Forum.Views.editQuestion().render(data);
		
		})
		
	},

	showHome: function(){
		
		new Forum.Views.home().render();
		var questions = new Forum.Collections.questions;
		questions.byUser().then(function(){
			questions.showQuestions();
			//console.log(questions)
		});

		console.log(new Forum.Views.home().render())
	},

	latestQuestions: function(){
		new Forum.Views.index();
		var questions = new Forum.Collections.questions;
		questions.fetch().then(function(data){
			questions.showQuestions();
			
		});

	},

	questionsByVotes: function(e){
		new Forum.Views.index();
		var questions = new Forum.Collections.questions;
		questions.byVotes().then(function(data){
			questions.showQuestions();
		});
	}
});


Forum.socketIo.init();



