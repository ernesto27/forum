Forum.Collections.comments = Backbone.Collection.extend({
	url : '/comments',
	model: Forum.Models.comment,

	showComments: function(){
		//new Forum.Views.comments().render();
		var commentView = new Forum.Views.comments({collection: this});
		commentView.render();	
	},



});


