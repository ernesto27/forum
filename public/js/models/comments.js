Forum.Models.comment = Backbone.Model.extend({
	urlRoot: "/comments",
	defaults: {
		comment: null,
		questionId: null,
		userId: null,
		avatar: null,
		username: null
	},

	validate: function(attrs){
		if(!attrs.comment){
			return "Insert a comment";
		}
	},

	initialize: function(){
		this.bind("invalid", function(model, error){
			//alert(error)
		}, this);
	}




});
