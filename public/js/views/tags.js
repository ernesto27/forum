Forum.Views.tags = Backbone.View.extend({
	tagName: "li",
	template: _.template('<span class="label label-info tag-hint" data-id="<%= id %>"><%= tagName %></span>'),

	render: function(data){
		this.$el.append(this.template({ id: data.id, tagName: data.name}))
	}
});



Forum.Views.questionTags = Backbone.View.extend({
	template: _.template("<span class='label label-default'><%= name %></span> "),
	render: function(data){
		for (index in data){
			var name = data[index].name;	
			this.$el.append(this.template({name: name}));
		}

		//this.$el.append(this.template({name: data[0]}));
		$("#wrap-tags-question").html(this.el);
		//console.log(this.el)
		return;
		
	},

	insertTagsQuestions: function(id){
		var that = this;
		$.ajax({
			url: "/tags?questionid=" + id,
			dataType: "json",
			success: function(data){

				that.render(data)
			
			}
		})
	}
});






