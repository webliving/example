var app = app || {};

(function() {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var TodoList = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: app.Todo,
        url:'http://192.168.1.101:3001/book',
		// Save all of the todo items under the `"todos"` namespace.
//		localStorage: new Store('todos-backbone'),

        /**
         * 将集合中所有的模型id连接为一个字符串并返回
         * @returns {*|string}
         */
        getIds : function() {
            return _(this.models).map(function(model) {
                return model.id;
            }).join(',');
        },

        getCompletedIds : function() {
            return _(this.completed()).map(function(model) {
                return model.id;
            }).join(',');
        },

        // 修改集合中的所有模型数据
        updateAll : function(options) {
            return Backbone.sync.call(this, 'update', this, options);
        },


        // 删除集合中所有的模型
        deleteAll : function(options) {
           /* _.each(this.completed(),function(o){
                console.log(o);
            })
            console.log(this.getCompletedIds());*/
            var result = Backbone.sync.call(this, 'delete', this, _.extend({
                url : this.url + '/?del=' + this.getCompletedIds()
            }, options));
//            this.remove(this.models);
            return result;
        }

        // Filter down the list of all todo items that are finished.
		,completed: function() {
			return this.filter(function( todo ) {
				return todo.get('completed');
			});
		},

		// Filter down the list to only todo items that are still not finished.
		remaining: function() {
			return this.without.apply( this, this.completed() );
		},

		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function() {
			if ( !this.length ) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

		// Todos are sorted by their original insertion order.
		comparator: function( todo ) {
			return todo.get('order');
		}
	});

	// Create our global collection of **Todos**.
	app.Todos = new TodoList();

}());
