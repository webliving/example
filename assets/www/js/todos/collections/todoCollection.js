var app = app || {};
app.jqTodoList=$('#todo-list');
(function() {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var TodoList = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: app.Todo,
        url:'http://192.168.1.7:3001/book',
		// Save all of the todos items under the `"todos"` namespace.
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
            /*return _(this.completed()).map(function(model) {
                return model.id;
            }).join(',');*/

            var a=[];
            return (_(this.completed()).map(function(model) {
                return model.id;
            }));
//            return a;
        },


        // Filter down the list of all todos items that are finished.
       completed: function() {
        return this.filter(function( todo ) {
            return todo.get('completed');
        });
    },

    // Filter down the list to only todos items that are still not finished.
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
    },
    // 修改集合中所有任务状态
    updateCompleted : function(options) {

        var aChanged=[], // 修改的属性
            aPrevious=[]; // 修改前模型
        this.each(function(model){
            aChanged.push(_.extend({_id:model.get('_id')},model.changedAttributes()));
        });
        this.each(function(model){
            aPrevious.push(_.extend({_id:model.get('_id')},model.previousAttributes()));
        });

//            console.log(aChanged);
//            console.log(aPrevious);


        return Backbone.sync.call(this, 'update', this,_.extend({
            type:'put',
            url:this.url,
            cache:false // 不缓存
            ,data:'todo='+JSON.stringify(aChanged),
            success:function(col,res){
                console.log(res.state);
            }
        }),options);


    },


        // 删除集合中已经完成的任务
        deleteCompleted : function(options) {

           var that=this,
               aModel=this.completed();

            return Backbone.sync.call(this, 'delete', this, _.extend({
//                type:'post',
                cache:false,
                url : this.url + '/?del=' + JSON.stringify(this.getCompletedIds()),
//                data:'del='+this.getCompletedIds(),
                success:function(col,res){
                    if(res.state){
                        console.log('删除成功');
                        _.each(aModel,function(model,index){
                            that.remove(model);
                            $('#'+model.cid,app.jqTodoList).remove(); // 删除成功, 移除视图
                        })
                    }
                }
            }, options));

        },
        // 单条更新
        updateOne:function(model,options){

            var sNew=JSON.stringify(model.changedAttributes());
            var oOld=model.previousAttributes();

            return Backbone.sync.call(this, 'update', this, _.extend({
                type:'post', // put 有 Bug ??
                cache:false,
                url : this.url + '/' +model.get('_id'),
//                data:'todo='+JSON.stringify(sChangeField),
                data:'todo='+sNew,
                success:function(col,res){
                    if(res.state){

                        console.log('更新成功');

                    }
                },
                error:function(col,res){
                    model.set(oOld); // 恢复数据
                    console.log('更新失败');
                }

            }, options));
        }

	});

	// Create our global collection of **Todos**.
	app.Todos = new TodoList();

}());
