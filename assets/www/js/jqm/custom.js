$(document).bind('mobileinit', function () {

    $.mobile.page.prototype.options.addBackBtn=false;
//    $("#header").fixedtoolbar({ tapToggle: false });
//    $("#footer").fixedtoolbar({ tapToggle: false });
//    $.mobile.page.prototype.options.keepNative = "select";



    $.extend($.mobile ,{
//        autoInitializePage: false,
        defaultPageTransition: 'none' // 设置使用 Ajax 方式跳转的页面的默认过场动画
        ,loadingMessageTextVisible:true
        ,loadingMessage:'载入中...'
        ,pageLoadErrorMessage:'载入失败'
        ,ajaxEnabled:false // 禁用 ajax
        ,allowCrossDomainPages:true // 是否允许跨域
        ,hashListeningEnabled:false // 设置是否监听和处理 location.hash 的改变
//        ,linkBindingEnabled:false // 绑定锚标记到文档中
        ,pushStateEnabled:false // 在支持的浏览器中开启 history.replaceState 这个增强特性

    });

// $.mobile.changePge('#contact', {transition: 'pop', reverse: false});
});


$(function(){

    $('input').on('touchstart',function(e){
        e.stopPropagation();
    });

    $('input').on('focus',function(e){
        e.stopPropagation();
    });

    $('#text').on('touchstart',function(e){
        e.stopPropagation();
    });

    $('#popupDialog').trigger('create').trigger('refresh').dialog();

    $('#pop').on('click',function(){
        navigator.notification.confirm('请确认网络连接已经开启', function(){

        } , '提示', '确定,取消');
//        var jPop=$('#popupDialog').dialog('open',{});
//        setTimeout(function(){jPop.dialog('close')},700);
    });

    /*$('body').on('tap',function(){
        return false;
    });*/

    /*$('body').on('click',function(){
        return false;
    });*/

    $('#searchInput').on('focus',function(){
        window.location.hash='#search';
//        window.location.href=window.location.href+'#search';
        $(this).blur();
    });
    $('#meishi').on( 'tap', function() {
//            $.mobile.loadingMessageTextVisible = false;
//        $.mobile.loadingMessageTextVisible = true;
        $.mobile.showPageLoadingMsg();
//            $.mobile.loadingMessageTheme = 'a';
//        $.mobile.showPageLoadingMsg( 'a', "Please wait..." );

//        $.mobile.pageLoading();
    });
    $('#xiaochi').on( 'tap', function() {

//        $.mobile.showPageLoadingMsg(true);
    });

    $('#content2').on('swipeleft',function(){
        history.go(-1);
    });


    function css3TransitionHandler( name, reverse, $to, $from ) {

        var deferred = new $.Deferred(),
            reverseClass = reverse ? " reverse" : "",
            viewportClass = "ui-mobile-viewport-transitioning viewport-" + name,
            doneFunc = function() {

                $to.add( $from ).removeClass( "out in reverse " + name );

//                if ( $from && $from[ 0 ] !== $to[ 0 ] ) {
                    $from.removeClass( $.mobile.activePageClass );
//                }

                $to.parent().removeClass( viewportClass );
//                $.mobile.initializePage();
                deferred.resolve( name, reverse, $to, $from );
            };

        $to.animationComplete( doneFunc );

        $to.parent().addClass( viewportClass );

        if ( $from ) {
            $from.addClass( name + " out" + reverseClass );
        }
        $to.addClass( $.mobile.activePageClass + " " + name + " in" + reverseClass );



        return deferred.promise();
    }




//　$.mobile.changePage("about/us.html", "slideup");

//    css3TransitionHandler2('slide',false,$('#searchs'),$('#home'));

});