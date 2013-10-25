Forum.Views.home = Backbone.View.extend({
	el: Forum.mainWrapper,
	template: _.template($("#home-tmpl").html()),
	initialize: function(){
		
		//console.log(this.template(data))
	},

	render: function(){
		/*data = {
			avatar: "https://si0.twimg.com/profile_images/2482201087/coqnl6dutm7w9b9chf4c.jpeg",
			username: "ernesto"
		}*/
		var that = this;
		$.ajax({
			url: "/user/session",
			success: function(data){
				that.$el.html(that.template(data));
			}
		})

	},

	getQuestionsByUser: function(){
		$.ajax({
			url: "/user/questions",
			success: function(data){
				console.log(data);
			}
		})
	}
});