Forum.Views.comment = Backbone.View.extend({
	className: "media",
	wrapComments: $("#user-comments"),
	template: _.template($("#singleComment-tmpl").html()),

	events: {
		"click .wrap-deletecomment" : "deleteComment"
	},

	initialize: function(){
		this.$el.append(this.template(this.model.toJSON()));
		//console.log(this.el)
		return this;
	},

	deleteComment: function(e){
		e.preventDefault();
		var that = this;
		this.model.destroy({
			success: function(){
				that.$el.fadeOut();
			},
			error: function(){
				alert("Please try later")
			}
		});	
	}
});


Forum.Views.comments = Backbone.View.extend({
	initialize: function(){
		this.collection.bind('add', this.updateComments, this)
		//this.listenTo(this.collection,'add', this.updateComments);
	},

	render: function(){
		//console.log(this.collection)
		this.wrapperComments = $("#user-comments");
		var that = this;
		
		this.collection.each(function(model){
			var comment = new Forum.Views.comment({model: model})
			that.wrapperComments.append(comment.el)
		});
		return this;		
	},

	updateComments: function(){
		var lastComment = this.collection.at(this.collection.length - 1);
		var comment = new Forum.Views.comment({ model: lastComment} )
		this.wrapperComments.prepend(comment.el);
		return this;
	},

});