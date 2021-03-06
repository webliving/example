var app = app || {};

$(function( $ ) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#todoapp',

		// Our template for the line of statistics at the bottom of the app.
//		statsTemplate:$('#stats-template').html(),
		statsTemplate:_.template($('#stats-template').html()),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'keypress #new-todo': 'createOnEnter',
			'click #clear-completed': 'clearCompleted',
			'click #toggle-all': 'toggleAllComplete'
		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function() {
			this.input = this.$('#new-todo');
			this.allCheckbox = this.$('#toggle-all')[0];
			this.$footer = this.$('#footer');
			this.$main = this.$('#main');

			window.app.Todos.on( 'add', this.addOne, this );
            // 数据在成功同步到集合中之后，会触发reset事件
			window.app.Todos.on( 'reset', this.addAll, this );
			window.app.Todos.on('change:completed', this.filterOne, this);
			window.app.Todos.on("filter", this.filterAll, this);

			window.app.Todos.on( 'all', this.render, this );

			app.Todos.fetch({
                cache:false,
//                add: true // 传递add参数来通知集合进行添加，而不是覆盖
                success:function(collection, resp){
                    console.log(resp);
//                    var test=app.Todos.getIds();
//                    app.Todos.updateAll();
//                    console.log(resp);
//                    console.log(test);

                }
            });

            /*app.Todos.fetch({
//                add: true, // 传递add参数来通知集合进行添加，而不是覆盖
                url:'/book?page=100',
                success:function(collection, resp){

                }
            });*/
		},


		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function() {
			var completed = app.Todos.completed().length;
			var remaining = app.Todos.remaining().length;

			if ( app.Todos.length ) {
				this.$main.show();
				this.$footer.show();

				/*this.$footer.html(Mustache.to_html(this.statsTemplate, {
                    completed: completed,
                    remaining: remaining
                }));*/

                this.$footer.html(this.statsTemplate({
                    completed: completed,
                    remaining: remaining
                }));

				this.$('#filters li a')
					.removeClass('selected')
					.filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function( todo ) {
			var view = new app.TodoView({ model: todo });
			$('#todo-list').append( view.render().el );
		},

		// Add all items in the **Todos** collection at once.
		addAll: function() {
			this.$('#todo-list').html('');
			app.Todos.each(this.addOne, this);
		},

		filterOne : function (todo) {
			todo.trigger("visible");
		},

		filterAll : function () {
            // 循环方法绑定视图上 this
			app.Todos.each(this.filterOne, this);
		},

		// Generate the attributes for a new Todo item.
		newAttributes: function() {
			return {
				title: this.input.val().trim(),
//				order: app.Todos.nextOrder(),
				completed: false
			};
		},

		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnEnter: function( e ) {
			if ( e.which !== ENTER_KEY || !this.input.val().trim() ) {
				return;
			}

			app.Todos.create( this.newAttributes(),{
                wait: true,
                success : function(model, resp) {
                    // 添加成功后, 在控制台输出集合中的模型列表
                    if(resp&&resp.state){
                        alert('添加成功');
                    }

                }
            } );
			this.input.val('');
		},

		// Clear all completed todos items, destroying their models.
		clearCompleted: function() {

            app.Todos.deleteCompleted({

            });

			/*_.each( window.app.Todos.completed(), function( todo ) {
				todo.destroy();
			});

			return false;*/
		},

		toggleAllComplete: function() {

			var completed = this.allCheckbox.checked;

			app.Todos.each(function(mTodo) {
                mTodo.set({
					'completed': completed
				});
			});


            app.Todos.updateCompleted();
//            app.Todos.update(app.Todos.models);
		}
	});
});
