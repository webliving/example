$(document).bind('mobileinit', function () {
    $.mobile.page.prototype.options.addBackBtn=true;
    $.extend($.mobile ,{
        defaultPageTransition: 'none'
        ,loadingMessageTextVisible:true
        ,loadingMessage:'载入中...'
        ,pageLoadErrorMessage:'载入失败'
        ,ajaxEnabled:false // 禁用 ajax
    });

    $(function(){
        $('#deviceready').on( 'tap', function() {
//            $.mobile.loadingMessageTextVisible = false;
            $.mobile.loadingMessageTextVisible = true;
            $.mobile.showPageLoadingMsg();
//            $.mobile.loadingMessageTheme = 'a';
            $.mobile.showPageLoadingMsg( 'a', "Please wait..." );
        });
    });

//            $.mobile.changePge('#contact', {transition: 'pop', reverse: false});
});