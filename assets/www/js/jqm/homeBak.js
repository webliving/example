var app ={
//    activePage:$('#conFind')
    toolBarIndex:$('#toolBarIndex')
    ,conGroup:$('.con')
    ,init:function(){
        this.topAdv();
    }
    ,topAdv:function(){

        if(!myScrollTop){
            var myScrollTop;

            function loaded2() {
                myScrollTop = new iScroll('wrapperTop', {
                    snap: true,
                    momentum: false,
                    hScrollbar: false,
                    onScrollEnd: function () {
                        document.querySelector('#indicator2 > li.active').className = '';
                        document.querySelector('#indicator2 > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
                    }
                });
            }

            setTimeout(loaded2, 0);


        }
    }
    ,changePage:function(curTool,conPage,toolGroup){
        this.activePage=$('#'+conPage);
        this.conGroup.removeClass('conActive');
        $('#'+conPage).addClass('conActive');

        $('a',toolGroup).removeClass('btnActive');
        $('#'+curTool,toolGroup).addClass('btnActive');

    }
};

app.init();

$.fn.animationComplete = function( callback ){

    return $(this).one('webkitAnimationEnd', callback);

    /*if($.support.cssTransitions){
        console.log(200);

    }
    else{
        // defer execution for consistency between webkit/non webkit
        setTimeout(callback, 0);
    }*/
};

function css3TransitionHandler2( name, reverse, $to, $from ) {

    var deferred = new $.Deferred(),
        reverseClass = reverse ? " reverse" : "",
        viewportClass = "ui-mobile-viewport-transitioning viewport-" + name,
        doneFunc = function() {

            $to.add( $from ).removeClass( "out in reverse " + name );

            if ( $from && $from[ 0 ] !== $to[ 0 ] ) {

                if($from[0].id!=$to[0].id){
//                    console.log($from[0]);
                    $from.removeClass('ui-page-active' );
                }
            }

            $to.parent().removeClass( viewportClass );
//                $.mobile.initializePage();
            deferred.resolve( name, reverse, $to, $from );
        };

    $to.animationComplete( doneFunc );

    $to.parent().addClass( viewportClass );

    if ( $from ) {
        $from.addClass(name + " out" + reverseClass+' ui-page-hidden');
    }


    $to.addClass("ui-page-active " + name + " in" + reverseClass);



    return deferred.promise();
}

var Workspace = Backbone.Router.extend({

    routes:{
        "findPage":"findPage",    // http://localhost:3001/backbone/#help
        "tuangouPage":"tuangouPage",
        "qiandaoPage":"qiandaoPage",
        "search":"search",
        "/:id": "getCertificate",
        "search/:query":"search"  // http://localhost:3001/backbone/#search/p7
//        ,'*filter': 'setFilter'
        ,"": "findPage"
    }
    ,findPage:function(a,b){

        if(!myScroll){

            var myScroll;
            function loaded() {

                myScroll = new iScroll('wrapperIndex',{
                    hideScrollbar:true
                    ,bounce:false
//                    fadeScrollbar:true
                });
            }

            setTimeout(loaded, 0);
        }else{
            myScroll.refresh();
        }






        if(location.hash==''){

            css3TransitionHandler2('slide',true,$('#home'),$('#'+$('.ui-page-active')[0].id));

             app.changePage('find','conFind',app.toolBarIndex);
//        $(this).addClass('ui-btn-active');
//        $(this).removeClass('foword').addClass('back');
        }
        /*$('#content').animate({
//            opacity: 1,
        'right':'0%',
            color: '#abcdef'
        }, 400);
        */
        /*$.mobile.silentScroll(0);
        $('#conBuy').hide();
        $('#conFind').show();*/



    },

    tuangouPage:function(a,b){

        if(!myScroll){

            var myScroll;
            function loaded() {

                myScroll = new iScroll('wrapper',{
                    hideScrollbar:true
//                    fadeScrollbar:true
                });
            }

            setTimeout(loaded, 0);
        }else{
            myScroll.refresh();
        }





//        $.mobile.silentScroll(0);
        css3TransitionHandler2('slide',false,$('#searchs'),$('#home'));

        app.changePage('tuangou','conBuy',app.toolBarIndex);


        /*$('#content').animate({
//            opacity: 0,
              'right':'-100%',
            color: '#eee'
        }, 400);*/
        /*$.mobile.silentScroll(0);
        $('#conFind').hide();
        $('#conBuy').show();*/
    },

    qiandaoPage:function(){

        if(!myScroll){

            var myScroll;
            function loaded() {

                myScroll = new iScroll('wrapper2',{
                    hideScrollbar:true
//                    fadeScrollbar:true
                });
            }

            setTimeout(loaded, 0);
        }else{
            myScroll.refresh();
        }





        css3TransitionHandler2('slide',false,$('#searchs2'),$('#searchs'));
//        $.mobile.changePage("jquery.html", "slideup");
    }

    /*,search:function(a,b){

        $.mobile.silentScroll(0);
        $('#content').hide();
        $('#conSearch').show();
         // p7 undefined
    },
    getCertificate:function(id){

        console.log(id);

    }*/
});

app.TodoRouter = new Workspace();
Backbone.history.start();



/*$('#tuangou').on('click',function(){

});

$('#find').on('click',function(){

});*/

/*

$('#content').on('swipeleft',function(){
//        $(this).removeClass('back').addClass('foword');
    $(this).animate({
        opacity: 1,
//        'right':'0%',
        color: '#eee'
//            rotateZ: '45deg',
//            translate3d: '0,10px,0',
//            translate:'0px'
    }, 600);
})*/
