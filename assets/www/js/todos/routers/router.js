var app = app || {};

(function() {
	'use strict';

	// Todo Router
	// ----------

	var Workspace = Backbone.Router.extend({
		routes:{
            "help":"help",    // http://localhost:3001/backbone/#help
            "/:id": "getCertificate",
            "search/:query":"search",  // http://localhost:3001/backbone/#search/p7
            '*filter': 'setFilter'
        },
        help:function(a,b){
            console.log(a,b);
        },
        search:function(a,b){
          console.log(a,b); // p7 undefined
        },
        getCertificate:function(id){

          console.log(id);

        },
        /**
         *
         * @param param 锚点字符
         */
		setFilter: function( param ) {

			// Set the current filter to be used
			window.app.TodoFilter = param.trim() || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of Todo view items
			window.app.Todos.trigger('filter');
		}
	});

	app.TodoRouter = new Workspace();
	Backbone.history.start();

}());
