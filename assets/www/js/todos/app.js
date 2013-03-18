
//指示jQuery是否支持W3C的"Cross-Origin Resource Sharing" （跨域资源共享）
$.support.cors=true;

var app = app || {};
var ENTER_KEY = 13;
_.templateSettings = {
    evaluate : /\{%([\s\S]+?)\%\}/g,
    interpolate : /\{%=([\s\S]+?)\%\}/g,
    escape : /\{%-([\s\S]+?)%\}/g
};

/*Backbone.sync = function (method, model) {
//    console.log(this);
};*/

$(function() {

	// Kick things off by creating the **App**.
	new app.AppView();

});



// 定义模型类
/*var Book = Backbone.Model.extend({
    defaults : {
        name : '',
        price : 0
    }
});

// 创建集合对象
var books = new Backbone.Collection(null, {
    model : Book
});
books.on('add',function(model,col){
    console.log(col.models[col.models.length-1].get('name'));
});
books.add({
    name : '构建高性能Web站点',
    price : 56.30
});

books.push({
    name : '深入分析Java Web技术内幕',
    price : 51.80
});

books.unshift({ // 将模型插入到集合头部
    name : '编写高质量代码:Web前端开发修炼之道',
    price : 51.80
},{
   silent : true
});

books.push({ // 将模型追加到集合尾部
    name : '基于MVC的JavaScript Web富应用开发',
    price : 42.50
}, {
    at : 1 // 它们会忽略自身的规则，将模型插入到at所指向的位置
    ,silent : true
});

books.unshift({ // 将模型追加到集合尾部
    name : 'RESTful Web Services Cookbook中文版',
    price : 44.30

}, {
    at : 2
    ,silent : true
});

//books.pop();
// 在控制台输出集合中的模型列表
console.dir(books.models);*/




// 定义Book模型类
var Book = Backbone.Model.extend({
    defaults : {
        name : 'unknown',
        author : 'unknown',
        price : 0
    }
});

var computerBook=Book.extend({
    defaults:{
        type:'web',
        lang:'js'
    }
});
// 实例化模型对象
var javabook = new computerBook({
    name : 'Thinking in Java',
    author : 'Bruce Eckel',
    price : 395.70
});

console.log(javabook);
