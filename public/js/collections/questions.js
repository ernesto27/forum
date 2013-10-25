Forum.Collections.questions = Backbone.Collection.extend({
	type: "default",
	url: function(){
		switch(this.type){
			case 'default':
				return "/questions";
				break;
			case 'user':
				return '/user/questions';
				break;
			case 'votes':
				return '/questions?order=byvote';
				break;
		}
	},

	model: Forum.Models.question,

	showQuestions: function(){
		var questionView = new Forum.Views.questions({collection: this});
		questionView.render();	
	},

	byUser: function(){
		this.type = 'user';
	
		return this.fetch();
	},

	byVotes: function(){
		this.type = "votes";
		return this.fetch();
	}
});


