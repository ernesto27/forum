Forum.mainWrapper = $("#main-wrapper");

Forum.Views.index = Backbone.View.extend({
	//template: _.template($("head").html()),
	initialize: function(){
		Forum.mainWrapper.html($("#index-tmpl").html());
		this.addClassNav();
	},

	addClassNav: function(){
		var hash = Backbone.history.fragment;
		var wrapNav = $("#type-questions");
		if(hash === "latest"){
			wrapNav.find("li[data-type='votes']").removeClass("active");
			wrapNav.find("li[data-type='latest']").addClass("active");
		}else if ( hash === "votes") {
			wrapNav.find("li[data-type='latest']").removeClass("active");
			wrapNav.find("li[data-type='votes']").addClass("active");
		}
	}

});


Forum.Views.question = Backbone.View.extend({
	tagName: "li",
	className: "list-group-item",
	template: _.template($("#single-tmpl").html()),

	render: function(){ 
		var li = this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

Forum.Views.questions = Backbone.View.extend({
	render: function(){

		var wrapQuestions = $("#wrap-questions");
		wrapQuestions.empty();
		var container = document.createDocumentFragment();
		console.log(this.collection)
		this.collection.each(function(question){
			var q = new Forum.Views.question({ model: question});
			container.appendChild(q.render().el);
			//wrapQuestions.append(q.el);
		});
		wrapQuestions.append(container);

	},

	initialize: function(){
		//console.log(this.el)
	}
});


// SINGLE QUESTION VIEW
Forum.Views.singleQuestion = Backbone.View.extend({
	//template: _.template($("#single-question-tmpl").html()),
	el : $("#main-wrapper"),
	template: _.template($("#singlePage-tmpl").html()),
	comments: null,
	
	initialize: function(){
		this.model.bind("change", this.updateVotes , this)	
	},	

	events:{
		"click #delete-question": "deleteQuestion",
		"click #add-comment" : "addComment",
		"click #like-question" :  "likeQuestion"
	},

	render: function(data){
		Forum.mainWrapper.html(this.template(data));
		console.log(data);
		this.comments = new Forum.Collections.comments();
		var comments = this.comments;
		this.comments.fetch({ data: {questionId: data.id }}).then(function(res){
			comments.showComments();
			//comments.add({comment: "fuck"})
			//console.log(this.comments)
			$.ajax({
				url : "/session?id=" + data.social_id,
				success: function(data){	
					$("#options-question").show();
					$(".wrap-deletecomment").show();
									
				}
			});
		});

	},

	likeQuestion: function(e){
		e.preventDefault();
		var oldVotes = this.model.get("votes")
		this.model.set({ votes: ++oldVotes});
		this.model.save({ type: "votes"});
		Forum.mainWrapper.undelegate("#like-question","click");
	},

	updateVotes: function(){
		$("#count-votes").text(this.model.get("votes"));
	},

	deleteQuestion: function(e){
		e.preventDefault();
	
		var a = this.$el.find("#delete-question");
		var question_id = a.data("id");
		var question = new Forum.Models.question({id: question_id});

		var ckeck = confirm("Are you sure");
		if(ckeck){
			question.destroy({
				success: function(){
					alert("Deleted post")
					window.location = "/";
				}
			});
		}
	},

	addComment: function(e){
		e.preventDefault();

		var questionId = e.target.getAttribute("data-id");
		var textComment = this.$el.find("#body-comment").val()
		//alert(comment);
		var comment = new Forum.Models.comment({comment: textComment, questionId: questionId});
		//this.comments.add({id:100, comment: "test"});
		var that = this;
		var userInfo = $("#user-info") 
		var username = userInfo.find("#username").text();
		var avatar = userInfo.find("img").attr("src");

		
		//$("#feed-newcomments").fadeIn("slow");


		comment.save({},{
			success: function(data, response){
				console.log(response)
				data.set({id: response, avatar: avatar, username: username});
				that.comments.add(data);
				Forum.socketIo.newComment({
					id: questionId,
					username: username,
					avatar: avatar,
					comment: textComment
				});
			}
		});
		Forum.mainWrapper.undelegate("#add-comment","click");
		//console.log(comment)
		//this.undelegateEvents();

	}
});

// ADD FORM VIEW 
Forum.Views.addQuestion = Backbone.View.extend({
	//el: $("body"),
	el: $("#main-wrapper"),
	initialize: function(){
		Forum.mainWrapper.undelegate("#add-question","click");
	},

	render: function(){
		Forum.mainWrapper.html($("#addQuestion-tmpl").html());
		//this.el = $("#wrap-add-questions");
	},

	events:{
		'click #add-question' : 'addQuestion',
		"keyup #tags-question" : "showTags",
		"click #ul-tags .tag-hint" : 'addTagInput',
		"click .remove-tag" : "removeTag"
	},


	addQuestion: function(){
		var title = $.trim(this.$el.find("#title-add").val());
		var body = $.trim(this.$el.find("#content-add").val());
		//var tags = this.$el.find("#tags-id").val();
		var tags = [];
		$(".tag").each(function(current){
			tags.push($(this).data("tagidview"));
		});	

		data = {
			title: title,
			body: body,
			tags: tags.toString(),
			created: new Date(),
			votes: 0
		}
		//Forum.socketIo.newQuestion(data);
	
		var question = new Forum.Models.question(data);

		var successFeed = this.$el.find("#feedback-add");
		var successError = this.$el.find("#feedback-error");

		if(!question.isValid()){
			successError.text(question.validationError).show();
			Forum.mainWrapper.undelegate("#add-question","click");
			return;
		}

		question.save({},{
			success: function(model ,response){
				//console.log(model);
				//console.log(response);
				if(response){
					console.log(response);
					successFeed.fadeIn();
					successError.hide();
					data.id = response.id;
					data.username = response.username;
					
					Forum.socketIo.newQuestion(data);
					setTimeout(function(){
						successFeed.fadeOut();
					},5000);
				}
			},
			error: function(){
				alert("An error happened, plese try later");
			}
		});

		Forum.mainWrapper.undelegate("#add-question","click");
	},

	showTags: function(e){
		var query = e.target.value;
		var tags = new Forum.Collections.tags();
		tags.getByName($.trim(query));
	},

	addTagInput: function(e){
		var target = e.target;
		var tagId = target.getAttribute("data-id");
		var tagName = target.innerText;

		var input = $("#tags-question");
		var inputIds = $("#tags-id");
		var viewTags = $("#view-tags");
				
		var currentVal = input.val();
		input.val("");

		arraryIds = inputIds.val().split(",");	

		if($.inArray(tagId, arraryIds) == - 1){
			if(inputIds.val().indexOf(",") == -1){
				inputIds.val(tagId + ",")
				var spanTag = '<span class="label label-success tag" data-tagidview="'+tagId+'">'+ tagName +'<span class="remove-tag">x</span></span>  '; 
	 			$("#tags-added").append(spanTag)
	 		}else{
				inputIds.val(inputIds.val() + tagId + ",")
				var spanTag = '<span class="label label-success tag" data-tagidview="'+tagId+'">'+ tagName +'<span class="remove-tag">x</span></span>  '; 
	 			$("#tags-added").append(spanTag)
		 	}
		}
	},

	removeTag: function(e){
		//console.log(e.target.parentNode.remove())
		console.log(e.target.parentNode.getAttribute("data-tagidview"))
	}

});



Forum.Views.editQuestion = Backbone.View.extend({
	template: _.template($("#editQuestion-tmpl").html()),
	id: null,
	el:  Forum.mainWrapper,
	


	events:{
		"click #edit-question-button" : "edit"
	},

	render: function(data){
		console.log(this.el)	
		this.id = data.id;
		Forum.mainWrapper.html(this.template(data));

		
	},

	edit: function(){

		var inputTitle = this.$el.find("#title-edit") 
		var id = inputTitle.data("id");
		var title = inputTitle.val();
		var body = this.$el.find("#content-edit").val();

		question = new Forum.Models.question({id:id})
		question.set({title: title, body: body})
		console.log(question)
		question.save({},{
			success: function(data){
				location = "/#question/" + id;
			}
		})
	}
});





















