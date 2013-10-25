Forum.Models.question = Backbone.Model.extend({
	urlRoot: "/questions",
	defaults: {
		title: "",
		body: "",
		tags: null,
		categoryId: 1
	},

	validate: function(attrs){
		if(!attrs.title || !attrs.body || !attrs.tags){
			return "Fill the title and content , please"
		}
	},

	initialize: function(){
		this.bind("invalid", function(model, error){
			//alert(error)
		}, this);

	}


});





