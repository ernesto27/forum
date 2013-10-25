Forum.Collections.tags = Backbone.Collection.extend({

	getByName: function(query){
		var container = document.createDocumentFragment();
		var wrapTags = $("#wrap-tags") 
		wrapTags.show();
		var ulTags = $("#ul-tags") 
		// WITH ARRAY OF OBJECTS
		results = []
		if(query){
			ulTags.empty();
			for( var i = 0; i < categories.length; i++){
				var tagName = categories[i].name;
				var tagId = categories[i].id;
				if(tagName.indexOf(query) != -1){
					results.push(categories[i])
				}
			}

			_.each(results, function(current){
	
				var t = new Forum.Views.tags();
				t.render(current);
					//console.log(t.el)
				container.appendChild(t.el);
			})

			ulTags.append(container)
		
		}else{
			wrapTags.hide();
		}
	}
});