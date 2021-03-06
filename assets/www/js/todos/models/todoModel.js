var app = app || {};

(function() {
	'use strict';

	// 任务模型
	// ----------

	// Our basic ** Todos model has `title`, `order`, and `completed` attributes.
	app.Todo = Backbone.Model.extend({
        // Default attributes for the list
        // and ensure that each todo created has `title` and `completed` keys.
        urlRoot:'http://192.168.1.7:3001/book'
        ,idAttribute:'_id'
        ,defaults: {
            completed: false
            ,title: ''
        }
        ,validate:function(attrs) {
//            console.log(attrs.title);
            if(attrs.title=='web') {

                return "字段不合法";
                

            }

        }
		// Toggle the `completed` state of this todos item.
        ,toggle: function() {

            this.save({
                completed: !this.get('completed')
            });
    }

	});

}());
