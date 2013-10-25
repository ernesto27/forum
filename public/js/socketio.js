Forum.socketIo = {
	socket: io.connect(location.origin),
	init: function(){
		var that = this;
		this.socket.on("addnewquestion", function(data){
			console.log(data)
			var modelQ = new Forum.Models.question()
			modelQ.set(data)
			var question = new Forum.Views.question({model: modelQ});
			question.render();
			$("#wrap-questions").prepend(question.el);
		});

		that.socket.on("addcomment", function(data){
			//console.log(data)
			var questionId = location.hash.split("/")[1];
		
			if(parseInt(questionId) == data.id){ 
				var modelComment = new Forum.Models.comment(data)
				var comment = new Forum.Views.comment({ model: modelComment });
				$("#user-comments").prepend(comment.el)
			}
		});

	
	},

	newQuestion: function(data){
		this.socket.emit("newquestion",data)
		
	},

	notifications: function(){
		
	},

	newComment: function(data){
		this.socket.emit("newcomment",data)
	}


}